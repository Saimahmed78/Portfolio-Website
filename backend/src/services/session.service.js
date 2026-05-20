import Session from "../models/auth/session.model.js";
import { ApiError } from "../utils/ApiError.js";
import { UAParser } from "ua-parser-js";
import { getHumanReadableDeviceName } from "../utils/deviceLookup.js";

export const getUserSessions = async (userId, currentRefreshTokenHash) => {
  const sessions = await Session.find({ 
    user_id: userId,
    revoked_at: null 
  }).sort({ issued_at: -1 });

  return sessions.map(session => {
    const parser = new UAParser(session.user_agent);
    const ua = parser.getResult();
    const browser = ua.browser?.name || "Unknown Browser";
    let deviceDetails = "";
    
    // Check if we appended a custom device model in the user_agent string
    const modelMatch = session.user_agent?.match(/\[Model:(.*?)\]/);
    if (modelMatch && modelMatch[1]) {
      deviceDetails = getHumanReadableDeviceName(modelMatch[1]);
    } else if (ua.device?.vendor || ua.device?.model) {
      const vendor = ua.device.vendor ? ua.device.vendor.trim() : "";
      let model = ua.device.model ? ua.device.model.trim() : "";
      
      // Handle User-Agent Reduction placeholder "K" (commonly sent by Chrome on Android 10+)
      if (model === "K") {
        model = ua.os?.name === "Android" ? "Android Device" : "Mobile Device";
      }
      
      if (model.toLowerCase().startsWith(vendor.toLowerCase())) {
        deviceDetails = model;
      } else {
        deviceDetails = `${vendor} ${model}`.trim();
      }
    } else if (ua.os?.name) {
      deviceDetails = ua.os.name;
    } else {
      deviceDetails = "Unknown Device";
    }

    return {
      id: session._id,
      device_id: session.device_id,
      ip_address: session.ip_address,
      user_agent: session.user_agent,
      device: `${browser} on ${deviceDetails}`,
      issued_at: session.issued_at,
      expires_at: session.expires_at,
      isCurrent: session.hashedRefreshToken === currentRefreshTokenHash
    };
  });
};

export const revokeSession = async (userId, sessionId) => {
  const session = await Session.findOne({ _id: sessionId, user_id: userId });
  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  session.revoked_at = new Date();
  session.revoked_reason = "USER_REVOKED";
  await session.save();

  return true;
};

export const revokeAllOtherSessions = async (userId, currentRefreshTokenHash) => {
  console.log("Revoking all other sessions for user", userId);
  console.log("Current refresh token hash", currentRefreshTokenHash);
  await Session.updateMany(
    { 
      user_id: userId, 
      hashedRefreshToken: { $ne: currentRefreshTokenHash },
      revoked_at: null 
    },
    {
      $set: {
        revoked_at: new Date(),
        revoked_reason: "USER_REVOKED_ALL"
      }
    }
  );

  return true;
};
