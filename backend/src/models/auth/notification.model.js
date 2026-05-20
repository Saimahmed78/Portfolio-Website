import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
  notif_id: { type: String, unique: true }, // Added for internal tracking
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["email", "sms", "push"], required: true },
  channel: { type: String, enum: ["EMAIL", "SMS", "PUSH"], default: "EMAIL" }, // Added to match service
  purpose: {
    type: String,
    enum: [
      "REGISTRATION",
      "VERIFICATION",
      "VERIFICATION_SUCCESS",
      "WELCOME",
      "PASSWORD_RESET",
      "PASSWORD_CHANGE",
      "ALERT",
      "OTHER",
    ],
    required: true,
  },
  recipient: { type: String, required: true }, // email or phone
  subject: String,
  body_preview: String, // first 100 chars of body
  status: {
    type: String,
    enum: ["QUEUED", "SENT", "DELIVERED", "FAILED", "BOUNCED"],
    default: "QUEUED",
  },
  attempt_count: { type: Number, default: 0 }, // Added to match service
  provider: { type: String, default: "Brevo" },
  message_id: { type: String }, // Brevo message ID for webhook mapping
  created_at: { type: Date, default: Date.now },
  sent_at: Date,
  updated_at: Date,
  error_message: String, // if failed
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
