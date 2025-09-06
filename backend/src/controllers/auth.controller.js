import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as AuthService from "../services/auth.service.js";
import * as MailService from "../services/mail/mail.service.js";

// POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, verificationToken, verificationURL } =
    await AuthService.register({ name, email, password });
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
  await AuthService.verifyEmail(token);
  await MailService.sendVerificationConfirmationEmail({
    email: res.locals?.verifiedEmail,
    name: res.locals?.verifiedName,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User verified successfully"));
});

// POST /api/v1/auth/resend-verification
export const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { name, verificationURL } = await AuthService.resendVerification(email);
  await MailService.sendVerificationEmail({ name, email, verificationURL });
  return res
    .status(200)
    .json(new ApiResponse(200, "Verification email resent"));
});

// POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const {
    accessToken,
    refreshToken,
    accessCookieOptions,
    refreshCookieOptions,
  } = await AuthService.login({ email, password });

  res.cookie("AccessToken", accessToken, accessCookieOptions);
  res.cookie("RefreshToken", refreshToken, refreshCookieOptions);

  return res.status(200).json(new ApiResponse(200, "User logged in"));
});

// POST /api/v1/auth/logout
export const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const { clearCookieOptions } = await AuthService.logout(req.user.id);
  res.clearCookie("AccessToken", clearCookieOptions);
  res.clearCookie("RefreshToken", clearCookieOptions);
  return res.status(200).json(new ApiResponse(200, "User logged out"));
});

