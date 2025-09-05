import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as UserService from "../services/user.service.js";
import * as MailService from "../services/mail.service.js";

// DELETE /api/v1/user
export const deleteAccount = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const { password } = req.body;
  const result = await UserService.deleteUser({
    userId: req.user.id,
    password,
  });

  res.clearCookie("AccessToken", result.clearCookieOptions);
  res.clearCookie("RefreshToken", result.clearCookieOptions);

  await MailService.sendAccountDeletionEmail({
    email: result.email,
    name: result.name,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Account deleted successfully"));
});

// (Optional) GET /api/v1/user/me
export const getProfile = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const user = await UserService.getUserById(req.user.id);
  return res.status(200).json(new ApiResponse(200, "Profile fetched", user));
});

// (Optional) PATCH /api/v1/user
export const updateProfile = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const user = await UserService.updateProfile({
    userId: req.user.id,
    payload: req.body,
  });
  return res.status(200).json(new ApiResponse(200, "Profile updated", user));
});
