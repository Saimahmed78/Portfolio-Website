import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["email", "sms", "push"], required: true },
  purpose: {
    type: String,
    enum: [
      "REGISTRATION",
      "VERIFICATION",
      "WELCOME",
      "PASSWORD_RESET",
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
  provider: { type: String, default: "Brevo" },
  message_id: { type: String }, // Brevo message ID for webhook mapping
  created_at: { type: Date, default: Date.now },
  sent_at: Date,
  updated_at: Date,
  error_message: String, // if failed
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
