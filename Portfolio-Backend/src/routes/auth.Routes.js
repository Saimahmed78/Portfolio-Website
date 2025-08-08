import { Router } from "express";
import {
  forgotPassValidators,
  resendVerifcationEmailValidators,
  userloginValidators,
  userRegistrationvalidators,
} from "../validators/auth.validators.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  forgotPass,
  loginUser,
  logOut,
  resendverificationemail,
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

export default router;
