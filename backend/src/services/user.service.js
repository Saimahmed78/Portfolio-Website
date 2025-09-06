import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const isProd = process.env.NODE_ENV === "production";
const clearCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
};

export async function deleteUser({ userId, password }) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Password is incorrect");

  await User.findByIdAndDelete(userId);
  return { email: user.email, name: user.name, clearCookieOptions };
}

export async function getUserById(userId) {
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");
  return user;
}

export async function updateProfile({ userId, payload }) {
  const allowed = ["name", "avatar", "bio"]; // adjust to your schema
  const update = Object.fromEntries(
    Object.entries(payload).filter(([k]) => allowed.includes(k)),
  );
  const user = await User.findByIdAndUpdate(userId, update, {
    new: true,
  }).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");
  return user;
}