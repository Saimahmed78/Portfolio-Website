import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as AuthService from "../services/auth.service.js";
import * as MailService from "../services/mail/mail.service.js";
import * as ActivityService from "../services/activity.service.js";
import User from "../models/auth/user.model.js";
import crypto from "crypto";
import Session from "../models/auth/session.model.js";
import LastDevice from "../models/auth/lastDevice.model.js";
// POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password } = req.body;

  const { user, verificationURL } = await AuthService.register({
    name,
    email,
    password,
  });

  // Centralized activity logging
  const { notification } = await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "REGISTRATION",
    metadata: {
      method: "email_password",
      email_sent: true,
    },
  });

  try {
    await MailService.sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationURL,
    });

    if (notification) {
      notification.status = "SENT";
      notification.sent_at = new Date();
      await notification.save();
    }
  } catch (error) {
    console.error("Verification email failed:", error);
    if (notification) {
      notification.status = "FAILED";
      notification.error_message = error.message;
      await notification.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200,user, "User registered & verification email sent"));
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
  
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User does not exist");

  // 1. Record activity and get device info
  const { savedDevice, auditLog } = await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "LOGIN",
    status: "SUCCESS",
    metadata: {
      method: "email_password",
    },
  });

  let userAgent = req.get("user-agent") || "";
  const customDeviceModel = req.headers["x-device-model"];
  if (customDeviceModel) {
    userAgent = `${userAgent} [Model:${customDeviceModel}]`;
  }

  let loginResult;
  try {
    loginResult = await AuthService.login({
      email,
      password,
      deviceId: savedDevice.device_id,
      ipAddress: req.ip || req.headers["x-forwarded-for"],
      userAgent,
    });
  } catch (error) {
    // Attempt to log failure if login fails (e.g. incorrect password or locked)
    await ActivityService.recordUserActivity({
      req,
      user,
      eventType: "LOGIN",
      status: "FAILURE",
      metadata: {
        error: error.message,
        reason: error.statusCode === 423 ? "ACCOUNT_LOCKED" : "INVALID_CREDENTIALS"
      }
    });
    throw error;
  }

  const {
    accessToken,
    refreshToken,
    accessCookieOptions,
    refreshCookieOptions,
    session,
  } = loginResult;

  // Link session token to audit log
  if (auditLog && session) {
    auditLog.token_id = session._id;
    await auditLog.save();
  }

  // 2. Update User stats
  user.lastLoginAt = new Date();
  user.totalLogins = (user.totalLogins || 0) + 1;
  await user.save();

  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

// POST /api/v1/auth/logout
export const logoutUser = asyncHandler(async (req, res) => {
  // req.user is attached by auth middleware
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");

  const refreshToken = req.cookies?.refreshToken;

  const { user, clearCookieOptions } = await AuthService.logout(req.user.id, refreshToken);
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

