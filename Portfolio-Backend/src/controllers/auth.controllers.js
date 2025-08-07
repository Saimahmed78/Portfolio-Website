import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import {
  emailVerificationConfirmationContent,
  emailVerificationContent,
  sendMail,
} from "../utils/mail.js";
const userRegister = asyncHandler(async (req, res) => {
  // get email and password from the user
  try{
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
  const { token, hashedToken, tokenExpiry } = await newUser.generateVerificationToken();
  // save in db
  console.log("token =", token);
  console.log("hashedToken =", hashedToken);
  newUser.verificationToken = hashedToken;
  newUser.verificationTokenExpiry = tokenExpiry;
  console.log("newUser.verificationToken =", newUser.verificationToken);
  //Check if the tokens are generated ,
  if (!newUser.verificationToken && !newUser.verificationTokenExpiry) {
    throw new ApiError(400, "User registration is failed", [
      "Verification token failed",
      "Verifcation Token expiry failed",
    ]);
  }
  //if yes,  save user
  await newUser.save();
  //send Mail
  const verificationURL = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;
  try {
    await sendMail({
      email: newUser.email,
      subject: "User Verification Email",
      mailGenContent: emailVerificationContent(name, verificationURL),
    });
  } catch (err) {
    throw new ApiError(400, "Email Verification failed", err);
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "User is registered and Verification Email sent successfully",
      ),
    );
  } catch(err){
     throw new ApiError(400, "There is problem in user Registration", err)
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
    throw new ApiError(404, "User not found. Maybe Token is Expired");
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
  const verificationURL = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;
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
    maxAge: 10 * 60 * 1000, // 1 day
  };

  res.cookie("AccessToken", accessToken, accessTokenCookieOptions);

  //save refresh token in cookies
  const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 20 * 60 * 1000, // 1 hour
  };

  res.cookie("RefreshToken", refreshToken, refreshTokenCookieOptions);
  //save refresh token in database
  loggedinUser.refreshToken = refreshToken;

  // save the user
  await loggedinUser.save();
  res.status(200).json(new ApiResponse(200, " User is logged In"));
});

export { userRegister, verifyUser, resendverificationemail, loginUser };
