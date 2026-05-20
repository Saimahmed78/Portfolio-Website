import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import * as SessionService from "../services/session.service.js";
import crypto from "crypto";

export const getActiveSessions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Mark current session
  const currentToken = req.cookies.refreshToken;
  const currentHash = currentToken
    ? crypto.createHash("sha256").update(currentToken).digest("hex")
    : null;

  const sessions = await SessionService.getUserSessions(userId, currentHash);

  return res.status(200).json(new ApiResponse(200, { active: sessions }, "Sessions fetched"));
});

export const revokeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;
  await SessionService.revokeSession(userId, sessionId);
  return res.status(200).json(new ApiResponse(200, null, "Session revoked"));
});

export const revokeAllOtherSessions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const currentToken = req.cookies.refreshToken;
  if (!currentToken) throw new ApiError(400, "Current session token missing");
  
  const currentHash = crypto.createHash("sha256").update(currentToken).digest("hex");
  await SessionService.revokeAllOtherSessions(userId, currentHash);
  
  return res.status(200).json(new ApiResponse(200, null, "Other sessions revoked"));
});
