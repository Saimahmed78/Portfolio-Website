import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// add indexes for quick lookups

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      match: [/^[a-zA-Z\s]+$/, "Name should only contain alphabets and spaces"],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscore",
      ],
    },
    profileImage: { type: String, trim: true, default: "" },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, "Bio cannot exceed 200 characters"],
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{7,14}$/, "Please enter a valid phone number"],
    },
    timezone: { type: String, default: "PKT" },
    dateFormat: { type: String, default: "DD/MM/YYYY" },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    hashedPassword: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },

    lockUntil: Date,

    lastLoginAt: { type: Date, default: null },
    lastFailedAt: { type: Date, default: null },
    passwordChangedAt: { type: Date, default: null },
    hashedVerificationTokenExpiry: { type: Date, default: null },
    emailVerificationsentAt: { type: Date, default: null },
    hashedForgotPassTokenExpiry: { type: Date, default: null },

    mfaEnabled: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },

    hashedVerificationToken: { type: String, default: null },
    hashedForgotpassToken: { type: String, default: null },

    suspiciousScore: { type: Number, default: 0 },
    passwordChangedCount: { type: Number, default: 0 },
    failedLoginAttempts: { type: Number, default: 0 },
    totalLogins: { type: Number, default: 0 },

    account_status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
  },
  { timestamps: true },
);
userSchema.index({ lockUntil: 1 });

//  Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("hashedPassword") && this.hashedPassword) {
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  }
  next();
});

//  Instance Methods
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.hashedPassword);
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return refreshToken;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
};

userSchema.methods.generateToken = function (type) {
  const token = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  if (type === "verification") {
    this.hashedVerificationToken = hashed;
    this.hashedVerificationTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min
  }
  // console.log(
  //   "this.hashedVerificationTokenExpiry:",
  //   this.hashedVerificationTokenExpiry,
  // );
  if (type === "forgot") {
    this.hashedForgotpassToken = hashed;
    this.hashedForgotPassTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min
  }
  return token; // send raw token to user
};

//  Remove sensitive fields when converting to JSON
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    delete ret.accessToken;
    delete ret.verificationToken;
    delete ret.forgotPasswordToken;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
export default User;
