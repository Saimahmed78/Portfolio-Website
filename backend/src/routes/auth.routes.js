import { Router } from "express";
import {
  accountDeletionValidators,
  forgotPassValidators,
  resendVerifcationEmailValidators,
  changePassValidators,
  resetPassValidators,
  userloginValidators,
  userRegistrationValidators,
} from "../validators/auth.validators.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  loginUser,
  logoutUser,
  resendVerification,
  registerUser,
  verifyAccount,
} from "../controllers/auth.controller.js";
import {
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/password.controller.js";
import { deleteAccount } from "../controllers/user.controller.js";
import isloggedIn from "../middlewares/isLoggedIn.js";

const router = Router();

router.post(
  "/register",
  userRegistrationValidators(),
  validateRequest,
  registerUser,
);
router.get("/verify/:token", verifyAccount);
router.post(
  "/resendVerification",
  resendVerifcationEmailValidators(),
  validateRequest,
  resendVerification
);

router.post("/login", userloginValidators(), validateRequest, loginUser);
router.get("/logout", isloggedIn, logoutUser);
router.post(
  "/forgotPass",
  forgotPassValidators(),
  validateRequest,
  forgotPassword,
);
router.post(
  "/resetPass/:token",
  resetPassValidators(),
  validateRequest,
  resetPassword,
);
router.post(
  "/changePass",
  isloggedIn,
  changePassValidators(),
  validateRequest,
  changePassword,
);
router.post(
  "/deleteAccount",
  isloggedIn,
  accountDeletionValidators,
  validateRequest,
  deleteAccount,
);

export default router; 
