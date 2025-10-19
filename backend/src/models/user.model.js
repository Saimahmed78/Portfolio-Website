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
    profile_image: { type: String, trim: true, default: "" },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, "Bio cannot exceed 200 characters"],
      default: "",
    },
    phone_number: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{7,14}$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    hashed_password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },

    lock_until: Date,

    last_login_at: { type: Date, default: null },
    last_failed_at: { type: Date, default: null },
    last_password_change_at: { type: Date, default: null },
    hashed_verification_token_expiry: { type: Date, default: null },
    email_verification_sent_at: { type: Date, default: null },
    hashed_forgotpass_token_expiry: { type: Date, default: null },

    mfa_enabled: { type: Boolean, default: false },
    is_locked: { type: Boolean, default: false },
    email_verified: { type: Boolean, default: false },
    phone_verified: { type: Boolean, default: false },

    hashed_verification_token: { type: String, default: null },
    hashed_forgotpass_token: { type: String, default: null },

    suspicious_score: { type: Number, default: 0 },
    password_changed_count: { type: Number, default: 0 },
    failed_login_attempts: { type: Number, default: 0 },
    total_logins: { type: Number, default: 0 },

    account_status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
  },
  { timestamps: true },
);
userSchema.index({ lock_until: 1 });

//  Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("hashed_password") && this.hashed_password) {
    this.hashed_password = await bcrypt.hash(this.hashed_password, 10);
  }
  next();
});

//  Instance Methods
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.hashed_password);
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
    this.hashed_verification_token = hashed;
    this.hashed_verification_token_expiry = Date.now() + 1000 * 60 * 15; // 15 min
  }
  console.log(
    "this.hashed_verification_token_expiry:",
    this.hashed_verification_token_expiry,
  );
  if (type === "forgot") {
    this.hashed_forgotpass_token = hashed;
    this.hashed_forgotpass_token_expiry = Date.now() + 1000 * 60 * 15; // 15 min
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
