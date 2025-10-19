import { v4 as uuidv4 } from "uuid";
import { collectTelemetry } from "../middlewares/collectTelemetry.js";
import LastDevice from "../models/lastDevice.model.js";
import Notification from "../models/notification.model.js";
import AuditLog from "../models/auditLog.model.js";

export async function recordUserActivity({
  req,
  user,
  eventType,
  metadata = {},
}) {
  // Collect telemetry data from the request
  const t = collectTelemetry(req);
  // 1️⃣ Create or update Device record
  const deviceIdentifier =   uuidv4();

  const deviceUpdatePayload = {
    user_id: user._id,
    device_id: deviceIdentifier,
    user_agent: t.uaRaw,
    ip_address: t.ipaddress,
    location: t.location ? `${t.location.city}, ${t.location.country}` : null,
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
        risk_score: 0, // This could be calculated by another service
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
    status: "SUCCESS",
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

  await AuditLog.create(activityLog);

  return { savedDevice, notification };
}
