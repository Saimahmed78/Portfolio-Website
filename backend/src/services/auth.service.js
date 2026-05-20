import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/auth/user.model.js";
import Session from "../models/auth/session.model.js";

const isProd = process.env.NODE_ENV === "production";

const cookieOptionsBase = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};

export async function register({ name, email, password }) {
  const existing = await User.findOne({ email });

  if (existing) throw new ApiError(409, "User already exists");

  // Auto-generate username from email if not present
  const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
  const username = `${baseUsername}_${crypto.randomBytes(2).toString("hex")}`;

  const user = await User.create({
    name,
    email,
    username,
    hashedPassword: password,
    emailVerificationsentAt: new Date(),
  });
  const verificationToken = user.generateToken("verification");
  user.hashedVerificationTokenExpiry =
    Date.now() +
    parseInt(process.env.VERIFICATION_TOKEN_EXPIRY || 15) * 60 * 1000; // default 15 min
  // console.log("verificationToken", verificationToken);
  if (!user.hashedVerificationToken && !user.hashedVerificationTokenExpiry) {
    throw new ApiError(500, "Internal Server Error");
    // Add a logger here for failure of verification Token
  }
  await user.save();

  const verificationURL = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
  return { user, verificationToken, verificationURL };
}

export async function verifyEmail(token) {
  if (!token) throw new ApiError(400, "Token is required");
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    hashedVerificationToken: hashed,
    hashedVerificationTokenExpiry: { $gt: Date.now() },
  });
  if (!user)
    throw new ApiError(400, "Verification Failed", [
      "Token is expired or invalid",
    ]);

  user.hashedVerificationToken = undefined;
  user.hashedVerificationTokenExpiry = undefined;
  user.emailVerified = true;
  await user.save();

  // Make available to controller (optional pattern)
  return { email: user.email, name: user.name };
}

export async function resendVerification(email) {
  const user = await User.findOne({ email });
  if (!user)
    throw new ApiError(404, "User not found. Please register your account");
  if (user.emailVerified) throw new ApiError(400, "User is already verified");

  const token = user.generateToken("verification");
  if (!user.hashedVerificationToken || !user.hashedVerificationTokenExpiry) {
    throw new ApiError(500, "Verification token generation failed");
  }
  await user.save();
  const verificationURL = `${process.env.CLIENT_URL}/verify/${token}`;
  return { name: user.name, verificationURL };
}

export async function login({ email, password, deviceId, ipAddress, userAgent }) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User does not exist");

  // 1. Check if account is locked
  if (user.isLocked && user.lockUntil && user.lockUntil > Date.now()) {
    const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
    throw new ApiError(423, `Account is locked. Please try again in ${remainingTime} minutes.`);
  }

  if (!user.emailVerified) throw new ApiError(403, "User is not verified");

  // 2. Validate Password
  const isValid = await user.isPasswordCorrect(password);
  
  if (!isValid) {
    // Increment failed attempts and suspicious score
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    user.suspiciousScore = (user.suspiciousScore || 0) + 5; // Increment risk score
    user.lastFailedAt = new Date();

    if (user.failedLoginAttempts >= 5) {
      user.isLocked = true;
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes lock
    }
    
    await user.save();
    throw new ApiError(401, "Email or password is incorrect");
  }

  // 3. Success - Reset failure stats
  user.failedLoginAttempts = 0;
  user.isLocked = false;
  user.lockUntil = null;
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await user.save();

  const accessCookieOptions = {
    ...cookieOptionsBase,
    maxAge: 1*60 * 60 * 1000, // 1 hour
  };
  const refreshCookieOptions = {
    ...cookieOptionsBase,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  // Create Session
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await Session.create({
    user_id: user._id,
    device_id: deviceId || "unknown_device",
    hashedRefreshToken,
    ip_address: ipAddress,
    user_agent: userAgent,
    issued_at: new Date(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  return {
    user,
    accessToken,
    refreshToken,
    accessCookieOptions,
    refreshCookieOptions,
    session,
  };
}

export async function logout(userId, refreshToken) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (refreshToken) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await Session.findOneAndUpdate(
      { user_id: userId, hashedRefreshToken: hashedToken },
      {
        $set: {
          revoked_at: new Date(),
          revoked_reason: "LOGOUT",
        },
      }
    );
  }

  // Clear legacy fields
  user.refreshToken = undefined;
  user.isLoggedIn = false;
  await user.save();

  return { user, clearCookieOptions: cookieOptionsBase };
}
