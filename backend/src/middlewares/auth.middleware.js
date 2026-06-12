import { ApiError } from "../utils/ApiError.js";
import User from "../models/auth/user.model.js";
import jwt from "jsonwebtoken";
import Session from "../models/auth/session.model.js";
import crypto from "crypto";
import * as ActivityService from "../services/activity.service.js";

const isLoggedIn = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (accessToken) {
    try {
      const decodedData = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = decodedData;
      return next();
    } catch (err) {
      // Access token validation failed or expired. 
      // Do not throw an error; let it fall through to check/refresh using the refresh token!
      console.log("Access token validation failed/expired, attempting refresh...", err.message);
    }
  }
  
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, "User is logged Out please login again.");
  }

  let decodedRefresh;
  try {
    decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Refresh Token is invalid or expired");
  }

  const loggedinUser = await User.findById(decodedRefresh.id);
  if (!loggedinUser) {
    throw new ApiError(404, "User not found");
  }

  // Hash the incoming refresh token to compare with the database hashedRefreshToken
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // 1. Check for Reuse Detection
  const reusedSession = await Session.findOne({
    user_id: decodedRefresh.id,
    rotated_tokens: hashedRefreshToken,
  });

  if (reusedSession) {
    await Session.updateMany(
      { user_id: decodedRefresh.id },
      { $set: { revoked_at: new Date(), revoked_reason: "TOKEN_REUSE_DETECTED" } }
    );

    await ActivityService.recordUserActivity({
      req,
      user: loggedinUser,
      eventType: "REFRESH_TOKEN_REUSE_DETECTED",
      status: "FAILURE",
      metadata: { reused_token_hash: hashedRefreshToken, original_session: reusedSession._id }
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw new ApiError(401, "Security alert: Refresh token reuse detected. All sessions revoked. Please log in again.");
  }

  // 2. Find valid session with Ownership Validation
  const loggedInUserSession = await Session.findOne({
    user_id: decodedRefresh.id,
    hashedRefreshToken,
    revoked_at: null,
    expires_at: { $gt: new Date() }
  });

  if (!loggedInUserSession) {
    throw new ApiError(401, "Session is expired or has been revoked");
  }
  
  // 3. Rotation logic
  const newAccessToken = loggedinUser.generateAccessToken();
  const newRefreshToken = loggedinUser.generateRefreshToken();
  const newHashedRefreshToken = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

  loggedInUserSession.rotated_tokens.push(hashedRefreshToken);
  loggedInUserSession.hashedRefreshToken = newHashedRefreshToken;
  await loggedInUserSession.save();

  await ActivityService.recordUserActivity({
    req,
    user: loggedinUser,
    eventType: "REFRESH_TOKEN_ROTATED",
    status: "SUCCESS",
    metadata: { session_id: loggedInUserSession._id }
  });

  const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 60 * 60 * 1000, // 60 minutes
  };
  const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

  req.user = jwt.decode(newAccessToken);
  next();
};

export default isLoggedIn;
