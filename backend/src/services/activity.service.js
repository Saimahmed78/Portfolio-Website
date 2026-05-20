import { v4 as uuidv4 } from "uuid";
import { collectTelemetry } from "../utils/collectTelemetry.js";
import LastDevice from "../models/auth/lastDevice.model.js";
import Notification from "../models/auth/notification.model.js";
import AuditLog from "../models/auth/auditLog.model.js";
import TelemetryEvent from "../models/telemetery/telemetery.model.js";

export async function recordUserActivity({
  req,
  user,
  eventType,
  status = "SUCCESS",
  metadata = {},
}) {
  // Collect telemetry data from the request
  const t = collectTelemetry(req);
  // 1️⃣ Create or update Device record
  // Try to find an existing device for this user with same IP and UA
  let existingDevice = await LastDevice.findOne({
    user_id: user._id,
    ip_address: t.ipaddress,
    user_agent: t.uaRaw,
  });

  const deviceIdentifier = existingDevice ? existingDevice.device_id : uuidv4();

  const deviceUpdatePayload = {
    user_id: user._id,
    device_id: deviceIdentifier,
    user_agent: t.uaRaw,
    ip_address: t.ipaddress,
    location: t.location ? `${t.location.city || "Unknown City"}, ${t.location.country || "Unknown Country"}` : "Unknown Location",
    last_used: new Date(),
    activity: eventType.toLowerCase(),
    device_type: t.isMobile ? "mobile" : "desktop",
  };

  const savedDevice = await LastDevice.findOneAndUpdate(
    { device_id: deviceIdentifier, user_id: user._id },
    {
      $set: deviceUpdatePayload,
      $setOnInsert: {
        first_used: new Date(),
        is_trusted: false,
        risk_score: 0,
        device_trust_level: "low",
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  // 2️⃣ Create Notification record based on eventType
  let notification;
  let notifDoc;

  const baseNotifDoc = {
    notif_id: uuidv4(),
    user_id: user._id,
    recipient: user.email,
    provider: "Brevo",
    channel: "EMAIL",
    type: "email",
    status: "QUEUED",
    attempt_count: 0,
  };

  switch (eventType) {
    case "REGISTRATION":
      notifDoc = {
        ...baseNotifDoc,
        subject: "Please verify your email",
        body_preview: `Hello ${user.name}, please verify your email by clicking the link.`,
        purpose: eventType,
      };
      break;

    case "PASSWORD_RESET":
      notifDoc = {
        ...baseNotifDoc,
        subject: "Password Reset Request",
        body_preview: `Hello ${user.name}, you requested a password reset.`,
        purpose: eventType,
      };
      break;

    case "PASSWORD_CHANGE":
      notifDoc = {
        ...baseNotifDoc,
        subject: "Password Changed Successfully",
        body_preview: `Hello ${user.name}, your password has been changed.`,
        purpose: eventType,
      };
      break;

    case "VERIFICATION_SUCCESS":
      notifDoc = {
        ...baseNotifDoc,
        subject: "Email Verified",
        body_preview: `Hello ${user.name}, your email has been verified.`,
        purpose: eventType,
      };
      break;

    // case "PASSWORD_RESET_REQUEST":
    //   notifDoc = { ... };
    //   break;

    default:
      break;
  }

  if (notifDoc) {
    notification = await Notification.create(notifDoc);
  }

  // 3. Create Audit Log entry

  const baseActivityLog = {
    user_id: user._id,
    performed_by: user._id,
    status: status,
    ip_address: t.ipaddress,
    location: savedDevice.location || "",
    device_info: {
      os: t.ua.os?.name || "Unknown",
      browser: t.ua.browser?.name || "Unknown",
      user_agent: t.uaRaw || "",
    },
    metadata: {
      // Base metadata related to the device and risk
      device_id: savedDevice.device_id,
      device_db_id: savedDevice._id,
      risk_score: savedDevice.risk_score,
      device_trust_level: savedDevice.device_trust_level,
    },
  };

  const activityLog = {
    ...baseActivityLog,
    event_type: eventType,
    metadata: {
      ...baseActivityLog.metadata,
      ...metadata, // Add specific metadata from the controller
      notification_id: notification ? notification._id : undefined,
    },
  };

  const auditLog = await AuditLog.create(activityLog);

  // 4️⃣ Create Telemetry entry (bringing the dead model to life)
  await TelemetryEvent.create({
    event_id: uuidv4(),
    user_id: user._id,
    version: "1.0.0",
    type: "auth",
    details: {
      eventType,
      path: req.originalUrl,
      method: req.method,
    },
    context: {
      ip: t.ipaddress,
      userAgent: t.uaRaw,
    },
    severity: status === "FAILURE" ? "warning" : "info",
  }).catch(err => console.error("Telemetry failed:", err));

  return { savedDevice, notification, auditLog };
}
