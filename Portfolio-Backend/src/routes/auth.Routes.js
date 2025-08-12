import { Router } from "express";
import {
  accountDeletionValidators,
  forgotPassValidators,
  resendVerifcationEmailValidators,
  changePassValidators,
  resetPassValidators,
  userloginValidators,
  userRegistrationvalidators,
} from "../validators/auth.validators.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  changePass,
  deleteAccount,
  forgotPass,
  loginUser,
  logOut,
  resendverificationemail,
  resetPass,
  userRegister,
  verifyUser,
} from "../controllers/auth.controllers.js";
import isloggedIn from "../middlewares/isLoggedIn.middleware.js";

const router = Router();

router.post(
  "/register",
  userRegistrationvalidators(),
  validateRequest,
  userRegister,
);
router.get("/verify/:token", verifyUser);
router.post(
  "/resend-verifyemail",
  resendVerifcationEmailValidators(),
  validateRequest,
  resendverificationemail,
);

router.post("/login", userloginValidators(), validateRequest, loginUser);
router.get("/logOut", isloggedIn, logOut);
router.get("/forgotPass", forgotPassValidators(), validateRequest, forgotPass);
router.post(
  "/resetPass/:token",
  resetPassValidators(),
  validateRequest,
  resetPass,
);
router.post(
  "/changePass",
  isloggedIn,
  changePassValidators(),
  validateRequest,
  changePass,
);
router.post(
  "/deleteAccount",
  isloggedIn,
  accountDeletionValidators,
  validateRequest,
  deleteAccount,
);

export default router;
