import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import {
  accountDeletionEmailContent,
  emailVerificationConfirmationContent,
  emailVerificationContent,
  forgotPasswordEmailContent,
  resetPasswordEmailContent,
  changePasswordEmailContent,
  sendMail,
} from "../utils/mail.js";

import bcrypt from "bcryptjs";

const userRegister = asyncHandler(async (req, res) => {
  // get email and password from the user
  try {
    const { name, email, password } = req.body;
    // then find the user by email
    const existingUser = await User.findOne({ email });
    // if user exist then send error
    if (existingUser)
      throw new ApiError(409, "Validation failed", ["User already exist"]);
    //Create a user
    const newUser = await User.create({
      name,
      email,
      password,
    });
    // if not exist then create verification token and verification
    const token = newUser.generateToken("verification");
    //Check if the tokens are generated ,
    if (!newUser.verificationToken || !newUser.verificationTokenExpiry) {
      throw new ApiError(400, "User registration is failed", [
        "Verification token generation failed",
        "Verifcation Token expiry failed",
      ]);
    }
    //if yes,  save user
    await newUser.save();
    //send Mail
    const verificationURL = `${process.env.CLIENT_URL}/verify/${token}`;
    try {
      await sendMail({
        email: newUser.email,
        subject: "User Verification Email",
        mailGenContent: emailVerificationContent(name, verificationURL),
      });
    } catch (err) {
      throw new ApiError(500, "Email Verification failed", err);
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User is registered and Verification Email sent successfully",
        ),
      );
  } catch (err) {
    if (err instanceof ApiError) {
      // Already a known error → forward it
      throw err;
    }
    // Unknown error → wrap as 500
    throw new ApiError(500, "Something went wrong on our end", err);
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  // get token from req.params
  const { token } = req.params;
  // validate it
  if (!token) {
    throw new ApiError(404, "Token not found");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  console.log("hashedToken =", hashedToken);
  // find user by token
  const userToVerify = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });
  // if user do not exist send error
  if (!userToVerify) {
    throw new ApiError(404, "Token is Expired");
  }
  // if user exist empty the tokens
  userToVerify.verificationToken = undefined;
  userToVerify.verificationTokenExpiry = undefined;
  const name = userToVerify.name;
  // verify the user
  userToVerify.isVerified = true;
  // save the user

  await userToVerify.save();
  // send email to User
  try {
    await sendMail({
      email: userToVerify.email,
      subject: "Email Verification Confirmation",
      mailGenContent: emailVerificationConfirmationContent(name),
    });
  } catch (error) {
    throw new ApiError(400, "Email Verification Confirmation email not sent");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User is verified Successfully"));
});

const resendverificationemail = asyncHandler(async (req, res) => {
  // get token from req.params
  const { email } = req.body;

  // find user by token
  const userToVerify = await User.findOne({ email });
  // if user do not exist send error
  if (!userToVerify) {
    throw new ApiError(404, "User not found. Please register your account ");
  }
  // Check if the User is verified
  if (userToVerify.isVerified) {
    throw new ApiError(400, "User is Already verified");
  }

  // if user exist create the tokens
  const { token, hashedToken, tokenExpiry } =
    await userToVerify.generateVerificationToken();
  // save in db
  userToVerify.verificationToken = hashedToken;
  userToVerify.verificationTokenExpiry = tokenExpiry;
  const name = userToVerify.name;
  // save the user
  await userToVerify.save();
  // send email to User
  const verificationURL = `${process.env.CLIENT_URL}/verify/${token}`;
  try {
    await sendMail({
      email: userToVerify.email,
      subject: "User Resend Verification Email",
      mailGenContent: emailVerificationContent(name, verificationURL),
    });
  } catch (err) {
    throw new ApiError(400, "Email Verification failed", err);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User verification Email Sent Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get email and password from the req.body
  const { email, password } = req.body;
  // find user by email
  const loggedinUser = await User.findOne({ email });
  // if no then send err
  if (!loggedinUser) {
    throw new ApiError(404, "User do not exist");
  }
  if (!loggedinUser.isVerified) {
    throw new ApiError(404, "User is not Verified");
  }
  // if yes then matches given password with User's password
  const isValid = await loggedinUser.isPasswordCorrect(password);
  //if no then send err
  if (!isValid) {
    throw new ApiError(404, "Email or Password is incorrect");
  }
  //if yes then generate Access and refresh token
  const accessToken = loggedinUser.generateAccessToken();
  const refreshToken = loggedinUser.generateRefreshToken();
  loggedinUser.isLoggedIn = true;
  //save access token in cookies
  const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  };

  res.cookie("AccessToken", accessToken, accessTokenCookieOptions);

  //save refresh token in cookies
  const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  res.cookie("RefreshToken", refreshToken, refreshTokenCookieOptions);

  // save the user
  await loggedinUser.save();
  res.status(200).json(new ApiResponse(200, " User is logged In"));
});

const logOut = asyncHandler(async (req, res) => {
  //  find the user by id
  console.log("Request reacher logOut");
  const loggedinUser = await User.findById(req.user.id);
  console.log(loggedinUser);
  // if user not found throw error
  if (!loggedinUser) {
    throw new ApiError(404, "User not found");
  }
  // if find then delete the cookies
  const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.clearCookie("AccessToken", accessTokenCookieOptions);
  const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.clearCookie("RefreshToken", refreshTokenCookieOptions);

  // delete the refresh token from db
  loggedinUser.refreshToken = undefined;
  // save the user
  loggedinUser.save();
  return res.status(200).json(new ApiResponse(200, "User is loggedOut"));
});

const forgotPass = asyncHandler(async (req, res) => {
  // get email from req.body
  const { email } = req.body;
  // find user by email
  const user = await User.findOne({ email });
  // if user not exist throw error
  if (!user) {
    throw new ApiError(404, "User not found", ["Please register your account"]);
  }
  const name = user.name;
  // if exist generate tokens
  const token = await user.generateToken("forgot");
  // save in db
  await user.save();
  // send email
  console.log(token);
  const resetPassUrl = `${process.env.CLIENT_URL}/resetPass/${token}`;
  console.log("resetPassUrl", resetPassUrl);
  await sendMail({
    email: user.email,
    subject: "Reset Password Email",
    mailGenContent: forgotPasswordEmailContent(name, resetPassUrl),
  });
  res.status(200).json(new ApiResponse(200, "Email send Successfully"));
});

const resetPass = asyncHandler(async (req, res) => {
  console.log("Reset Password Route");
  // get token from req.params
  const { token } = req.params;
  // get password from req.body
  const { password , confirmPass} = req.body;

  if (!token) {
    throw new ApiError(404, "Token not found");
  }
  console.log("Token in controller ", token);
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log("hashedToken in controller", hashedToken);
  const resetPassUser = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  try {
    console.log("resetPassUser", resetPassUser);
  } catch (error) {
    console.log("No name found");
  }
  // if no user found then send error
  if (!resetPassUser) {
    throw new ApiError(404, "Link is expired");
  }
  resetPassUser.forgotPasswordToken = undefined;
  resetPassUser.forgotPasswordExpiry = undefined;
  resetPassUser.password = password;
  let name = resetPassUser.name;
  await resetPassUser.save();
  await sendMail({
    email: resetPassUser.email,
    subject: " Reset Password Email",
    mailGenContent: resetPasswordEmailContent(name),
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed Successfully"));
});

const changePass = asyncHandler(async (req, res) => {
  // get passwords from req.body
  const { oldPass, newPass, confirmPass } = req.body;
  //find user by req.user.id
  const loggedinUser = await User.findById(req.user.id);
  //if user no found show error
  let name = loggedinUser.name;
  if (!loggedinUser) {
    throw new ApiError(404, "User not found");
  }
  // verify the old password
  let isMatch = await bcrypt.compare(oldPass, loggedinUser.password);
  if (!isMatch) {
    throw new ApiError(404, "old password is wrong");
  }
  // validate that old password and new Password are different
  if (oldPass == newPass) {
    throw new ApiError(
      404,
      "New Password should be different from Old Password",
    );
  }
  // Update the user
  loggedinUser.password = newPass;
  //clear all the cookies

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.clearCookie("AccessToken", cookieOptions);

  res.clearCookie("RefreshToken", cookieOptions);
  // delete refresh Token from databases
  loggedinUser.refreshToken = undefined;
  // Save the User
  await loggedinUser.save();
  await sendMail({
    email: loggedinUser.email,
    subject: " Reset Password Email",
    mailGenContent: changePasswordEmailContent(name),
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed Successfully"));
});

const deleteAccount = asyncHandler(async (req, res) => {
  const userToDelete = await User.findById(req.user.id);
  if (!userToDelete) {
    throw new ApiError(404, "User not found");
  }

  const { password } = req.body;
  console.log("password", password);
  console.log("orginal password", userToDelete.password);
  const isMatch = await bcrypt.compare(password, userToDelete.password);
  if (!isMatch) {
    throw new ApiError(400, "Password is incorrect");
  }

  // Delete user
  await User.findByIdAndDelete(req.user.id);

  // Clear cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.clearCookie("AccessToken", cookieOptions);
  res.clearCookie("RefreshToken", cookieOptions);

  // Send farewell email
  await sendMail({
    email: userToDelete.email,
    subject: "Account Deleted",
    mailGenContent: accountDeletionEmailContent(userToDelete.name),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Account deleted successfully"));
});

export {
  userRegister,
  verifyUser,
  resendverificationemail,
  loginUser,
  logOut,
  forgotPass,
  resetPass,
  changePass,
  deleteAccount,
};
