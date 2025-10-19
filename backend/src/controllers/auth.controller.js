import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as AuthService from "../services/auth.service.js";
import * as MailService from "../services/mail/mail.service.js";
import * as ActivityService from "../services/activity.service.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import Session from "../models/session.model.js";
import LastDevice from "../models/lastDevice.model.js";
// POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { user, verificationURL } = await AuthService.register({
    name,
    email,
    password,
  });

  // Centralized activity logging
  await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "REGISTRATION",
    metadata: {
      method: "email_password",
      email_sent: true,
    },
  });

  await MailService.sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationURL,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User registered & verification email sent"));
});

// GET /api/v1/auth/verify/:token
export const verifyAccount = asyncHandler(async (req, res) => {

  const { token } = req.params;
  const { email, name } = await AuthService.verifyEmail(token);

  // Log verification activity
  const user = await User.findOne({ email });
  if (user) {
    await ActivityService.recordUserActivity({
      req,
      user,
      eventType: "VERIFICATION_SUCCESS",
    });
  }

  await MailService.sendVerificationConfirmationEmail({
    email,
    name,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User verified successfully"));
});

// POST /api/v1/auth/resend-verification
export const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { name, verificationURL } = await AuthService.resendVerification(email);

  // Log resend activity
  const user = await User.findOne({ email });
  if (user) {
    await ActivityService.recordUserActivity({
      req,
      user,
      eventType: "VERIFICATION_RESEND",
    });
  }

  await MailService.sendVerificationEmail({ name, email, verificationURL });
  return res
    .status(200)
    .json(new ApiResponse(200, "Verification email resent"));
});

// POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const {
    user,
    accessToken,
    refreshToken,
    accessCookieOptions,
    refreshCookieOptions,
  } = await AuthService.login({ email, password });
  
  // Log login activity
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const device = await LastDevice.findOne({ user_id: user._id });
  const deviceId = device.device_id;
  
  await Session.create({
    user_id: user._id,
    device_id: deviceId,
    refresh_token: hashedRefreshToken,
    ip_address: req.ip,
    user_agent: req.get("user-agent"),
    issued_at: new Date(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "LOGIN",
    metadata: {
      method: "email_password",
    },
  });

  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  user.last_login_at = new Date();
  user.total_logins += 1;
  await user.save();
  return res.status(200).json(new ApiResponse(200, "User logged in"));
});

// POST /api/v1/auth/logout
export const logoutUser = asyncHandler(async (req, res) => {
  // req.user is attached by auth middleware
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");

  const { user, clearCookieOptions } = await AuthService.logout(req.user.id);
  res.clearCookie("accessToken", clearCookieOptions);
  res.clearCookie("refreshToken", clearCookieOptions);

  // Log logout activity before clearing tokens
  await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "LOGOUT",
  });

  return res.status(200).json(new ApiResponse(200, "User logged out"));
});

