import mongoose from "mongoose";

const { Schema } = mongoose;

const lastDeviceSchema = new Schema(
  {
     
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    device_id: { type: String, required: true },
    user_agent: String,
    ip_address: String,
    location: String,
    first_used: Date,
    last_used: Date,
    is_trusted: { type: Boolean, default: false },
    activity: {
      type: String,
      enum: [
        "login",
        "logout",
        "mfa_challenge",
        "password_reset",
        "verification",
      ],
    },
    risk_score: { type: Number, default: 0 },
    device_trust_level: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    device_type: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      default: "desktop",
    },
  },
  { timestamps: true },
);

// Index to quickly find devices per user
lastDeviceSchema.index({ user_id: 1 });
// Index for sorting by recent activity
lastDeviceSchema.index({ last_used: -1 });

const LastDevice = mongoose.model("LastDevice", lastDeviceSchema);
export default LastDevice;
