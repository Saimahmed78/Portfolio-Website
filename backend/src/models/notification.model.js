import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    notif_id: {
      type: String,
      required: true,
      unique: true,
      index: true, // primary key equivalent
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // fast lookup by user
    },
    channel: {
      type: String,
      enum: ["EMAIL", "SMS"],
      required: true,
    },
    type: {
      type: String,
      enum: ["VERIFICATION", "RESET", "ALERT", "MFA"],
      required: true,
    },
    status: {
      type: String,
      enum: ["SENT", "FAILED", "DELIVERED"],
      default: "SENT",
    },
    attempt_count: {
      type: Number,
      default: 0,
    },
    last_attempt_at: {
      type: Date,
      default: null,
    },
    error_message: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // maps spec field created_at
  },
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
