import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: false, // optional at registration
      unique: true, // still enforce uniqueness when provided
      sparse: true, // important! only enforce uniqueness if value exists
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9_]+$/,
    },

    profileImg: {
      type: String,
      trim: true,
      default: "",
    },
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
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now(),
    },
    verificationToken: {
      type: String,
      default: "",
    },
    verificationTokenExpiry: {
      type: Date,
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    forgotPasswordToken: {
      type: String,
      default: "",
    },
    forgotPasswordExpiry: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    resetPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
); // adds createdAt & updatedAt automatically

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );
  this.refreshToken = refreshToken;
  return refreshToken;
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
  return accessToken;
};

userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  const verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  this.verificationToken = verificationToken;
  return token; // return plain token for emailing
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    delete ret.accessToken;
    delete ret.verificationToken;
    delete ret.resetPasswordToken;
    delete ret.forgotPasswordToken;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
export default User;
