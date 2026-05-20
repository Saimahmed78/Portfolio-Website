import { ApiError } from "../utils/ApiError.js";
import User from "../models/auth/user.model.js";
import jwt from "jsonwebtoken";
import Session from "../models/auth/session.model.js";
import crypto from "crypto";

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

  const loggedInUserSession = await Session.findOne({
    hashedRefreshToken,
    revoked_at: null,
    expires_at: { $gt: new Date() }
  });

  if (!loggedInUserSession) {
    throw new ApiError(401, "Session is expired or has been revoked");
  }
  
  const newAccessToken = loggedinUser.generateAccessToken();
  const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 60 * 60 * 1000, // 60 minutes
  };
  res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

  req.user = jwt.decode(newAccessToken);
  next();
};

export default isLoggedIn;
