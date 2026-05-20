import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as UserService from "../services/user.service.js";
import * as MailService from "../services/mail/mail.service.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// DELETE /api/v1/user
export const deleteAccount = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const { password } = req.body;
  const result = await UserService.deleteUser({
    userId: req.user.id,
    password,
  });
  console.log("Account deleted successfully");
  console.log("result", result);
  res.clearCookie("accessToken", result.clearCookieOptions);
  res.clearCookie("refreshToken", result.clearCookieOptions);

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
  return res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
});

export const updateIdentity = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const user = await UserService.updateIdentity(req.user.id, req.body);
  return res.status(200).json(new ApiResponse(200, user, "Identity updated"));
});

export const updatePreferences = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  const user = await UserService.updatePreferences(req.user.id, req.body);
  return res.status(200).json(new ApiResponse(200, user, "Preferences updated"));
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.user?.id) throw new ApiError(401, "Unauthorized");
  if (!req.file) throw new ApiError(400, "Please upload an avatar image file");

  const ext = req.file.originalname.split(".").pop().toLowerCase();
  if (!["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    throw new ApiError(400, "Only images (JPG, JPEG, PNG, GIF, WEBP) are allowed for profile pictures");
  }

  const avatarUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname, "profile_avatars");

  await UserService.updateAvatar(req.user.id, avatarUrl);

  return res.status(200).json(new ApiResponse(200, { profileImage: avatarUrl }, "Avatar updated successfully"));
});
