import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
  name: {
    trim: true,
    type: String,
    lowercase: true,
  },
  username: {
    type: String,
    trim: true,

    lowercase: true,
  },
  profileImg: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
    default: "",
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  lastLoginIn: {
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
    type: String,
    default: "",
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpiry: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: Date.now() + 10 * 60 * 1000,
    },
  );
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: Date.now() + 20 * 60 * 1000,
    },
  );
};

userSchema.methods.generateTempToken = function () {
  const token = crypto.randomBytes(62).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const tokenExpiry = Date.now() + 5 * 60 * 1000;

  return { token, hashedToken, tokenExpiry };
};

const User = mongoose.model("User", userSchema);
export default User;
