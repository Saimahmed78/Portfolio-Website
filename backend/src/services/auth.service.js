import crypto from "crypto";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const isProd = process.env.NODE_ENV === "production";

const cookieOptionsBase = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
};

export async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Validation failed", ["User already exists"]);

  const user = await User.create({ name, email, password });
  const verificationToken = user.generateToken("verification");
  if (!user.verificationToken || !user.verificationTokenExpiry) {
    throw new ApiError(400, "User registration failed", [
      "Verification token generation failed",
      "Verification token expiry missing",
    ]);
  }
  await user.save();

  const verificationURL = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
  return { user, verificationToken, verificationURL };
}

export async function verifyEmail(token) {
  if (!token) throw new ApiError(404, "Token not found");
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verificationToken: hashed,
    verificationTokenExpiry: { $gt: Date.now() },
  });
  if (!user) throw new ApiError(404, "Token is expired or invalid");

  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  user.isVerified = true;
  await user.save();

  // Make available to controller (optional pattern)
  return { email: user.email, name: user.name };
}

export async function resendVerification(email) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found. Please register your account");
  if (user.isVerified) throw new ApiError(400, "User is already verified");

  const token = user.generateToken("verification");
  if (!user.verificationToken || !user.verificationTokenExpiry) {
    throw new ApiError(400, "Verification token generation failed");
  }
  await user.save();
  const verificationURL = `${process.env.CLIENT_URL}/verify/${token}`;
  return { name: user.name, verificationURL };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User does not exist");
  if (!user.isVerified) throw new ApiError(403, "User is not verified");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(400, "Email or password is incorrect");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.isLoggedIn = true;
  await user.save();

  const accessCookieOptions = {
    ...cookieOptionsBase,
    maxAge: 15 * 60 * 1000, // 15 minutes
  };
  const refreshCookieOptions = {
    ...cookieOptionsBase,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  return { accessToken, refreshToken, accessCookieOptions, refreshCookieOptions };
}

export async function logout(userId) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  user.refreshToken = undefined;
  user.isLoggedIn = false;
  await user.save();
  return { clearCookieOptions: cookieOptionsBase };
}