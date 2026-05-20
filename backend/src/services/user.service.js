import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/auth/user.model.js";

const isProd = process.env.NODE_ENV === "production";
const clearCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
};

export async function deleteUser({ userId, password }) {
  console.log("Deleting user with ID:", userId);
  console.log("Password:", password);
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(400, "Password is incorrect");

  await User.findByIdAndDelete(userId);
  return { email: user.email, name: user.name, clearCookieOptions };
}

export async function getUserById(userId) {
  const user = await User.findById(userId).select("-hashedPassword -refreshToken");
  if (!user) throw new ApiError(404, "User not found");
  return user;
}

export async function updateIdentity(userId, { name, username, bio }) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (name) user.name = name;
  if (username) {
    // Check if username taken
    const existing = await User.findOne({ username, _id: { $ne: userId } });
    if (existing) throw new ApiError(409, "Username already taken");
    user.username = username;
  }
  if (bio !== undefined) user.bio = bio;

  await user.save();
  return user;
}

export async function updatePreferences(userId, { phoneNumber, timezone, dateFormat }) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (timezone) user.timezone = timezone;
  if (dateFormat) user.dateFormat = dateFormat;

  await user.save();
  return user;
}

export async function updateAvatar(userId, profileImage) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  user.profileImage = profileImage;
  await user.save();
  return user;
}