import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const isLoggedIn = async (req, res, next) => {
  //    check if cookies has accessToken
  const accessToken = req.cookies?.AccessToken;

  // if yes then return next
  if (accessToken) {
    try {
      const decodedData = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      );
      req.user = decodedData;
    } catch (err) {
      throw new ApiError(404, "Token is invalid", err);
    }
    return next();
  }

  // if not call refresh access Token m
  const refreshToken = req.cookies?.RefreshToken;
  if (!refreshToken) {
    throw new ApiError(404, "User is logged Out please login again. ");
  }

  let decodedRefresh;
  try {
    decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(400, "Refresh Token is invalid");
  }

  const loggedinUser = await User.findById(decodedRefresh.id);
  if (!loggedinUser) {
    throw new ApiError(404, "User not found");
  }
  if (!(loggedinUser.refreshToken == refreshToken)) {
    throw new ApiError(400, "Refresh token is fake");
  }
  const newAccessToken = loggedinUser.generateAccessToken();
  const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1 * 60 * 1000,
  };
  res.cookie("AccessToken", newAccessToken, accessTokenCookieOptions);

  req.user = jwt.decode(newAccessToken);

  next();
};

export default isLoggedIn;
