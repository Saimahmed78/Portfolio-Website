import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as PasswordService from "../services/password.service.js";
import * as MailService from "../services/mail/mail.service.js";
import * as ActivityService from "../services/activity.service.js";
import User from "../models/auth/user.model.js";

// POST /api/v1/password/forgot
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { name, resetURL } = await PasswordService.forgotPassword(email);

  const user = await User.findOne({ email });
  const { notification } = await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "PASSWORD_RESET",
  });

  try {
    await MailService.sendPasswordResetEmail({ name, email, resetURL });
    if (notification) {
      notification.status = "SENT";
      notification.sent_at = new Date();
      await notification.save();
    }
  } catch (err) {
    if (notification) {
      notification.status = "FAILED";
      notification.error_message = err.message;
      await notification.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset email sent"));
});

// POST /api/v1/password/reset/:token
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const { email, name } = await PasswordService.resetPassword({
    token,
    newPassword: password,
  });

  const user = await User.findOne({ email });
  await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "PASSWORD_RESET",
    status: "SUCCESS",
    metadata: { action: "RESET_COMPLETE" }
  });

  await MailService.sendPasswordResetConfirmationEmail({ email, name });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

// POST /api/v1/password/change
export const changePassword = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const { oldPass, newPass } = req.body;
  const payload = await PasswordService.changePassword({
    userId: req.user.id,
    oldPass,
    newPass,
  });

  const user = await User.findById(req.user.id);
  const { notification } = await ActivityService.recordUserActivity({
    req,
    user,
    eventType: "PASSWORD_CHANGE",
  });

  // Clear tokens after password change (force re-login)
  res.clearCookie("accessToken", payload.clearCookieOptions);
  res.clearCookie("refreshToken", payload.clearCookieOptions);

  try {
    await MailService.sendPasswordChangeEmail(payload);
    if (notification) {
      notification.status = "SENT";
      notification.sent_at = new Date();
      await notification.save();
    }
  } catch (err) {
    if (notification) {
      notification.status = "FAILED";
      notification.error_message = err.message;
      await notification.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});
