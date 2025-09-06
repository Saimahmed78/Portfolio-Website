
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const isProd = process.env.NODE_ENV === "production";
const clearCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
};

export async function forgotPassword(email) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found", ["Please register your account"]);

  const token = user.generateToken("forgot");
  await user.save();

  const resetURL = `${process.env.CLIENT_URL}/resetPass/${token}`;
  return { name: user.name, email: user.email, resetURL };
}

export async function resetPassword({ token, newPassword }) {
  if (!token) throw new ApiError(404, "Token not found");

  const hashed = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    forgotPasswordToken: hashed,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  if (!user) throw new ApiError(404, "Reset link is expired or invalid");

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  user.password = newPassword;
  await user.save();

  // Make payload available for email service
  return { email: user.email, name: user.name };
}

export async function changePassword({ userId, oldPass, newPass }) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(oldPass, user.password);
  if (!isMatch) throw new ApiError(400, "Old password is incorrect");

  if (oldPass === newPass) {
    throw new ApiError(400, "New password must be different from old password");
  }

  user.password = newPass;
  user.refreshToken = undefined; // force re-login
  await user.save();

  return { email: user.email, name: user.name, clearCookieOptions };
}


