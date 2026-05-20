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
import { deleteAccount, getProfile, updateIdentity, updatePreferences, uploadAvatar } from "../controllers/user.controller.js";
import { getActiveSessions, revokeSession, revokeAllOtherSessions } from "../controllers/session.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.get("/getMe", isLoggedIn, getProfile);

router.post(
  "/register",
  authLimiter,
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

router.post("/login", authLimiter, userloginValidators(), validateRequest, loginUser);
router.get("/logout", isLoggedIn, logoutUser);
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
  isLoggedIn,
  changePassValidators(),
  validateRequest,
  changePassword,
);
router.post(
  "/deleteAccount",
  isLoggedIn,
  accountDeletionValidators(),
  validateRequest,
  deleteAccount,
);

router.patch("/updateIdentity", isLoggedIn, updateIdentity);
router.patch("/updatePreferences", isLoggedIn, updatePreferences);
router.post("/profile/avatar", isLoggedIn, upload.single("avatar"), uploadAvatar);

router.get("/sessions", isLoggedIn, getActiveSessions);
router.delete("/sessions/revoke-all", isLoggedIn, revokeAllOtherSessions);
router.delete("/sessions/:sessionId", isLoggedIn, revokeSession);

export default router; 
