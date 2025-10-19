import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true, // foreign key reference to users
      ref: "User",
    },
    device_id: {
      type: String,
      required: true,
      ref: "LastDevice",
      index: true, // foreign key reference to last_devices
    },
    refresh_token: {
      type: String,
      required: true,
    },

    issued_at: {
      type: Date,
      default: Date.now,
    },
    expires_at: {
      type: Date,
      required: true,
    },
    revoked_at: {
      type: Date,
      default: null,
    },
    ip_address: {
      type: String,
    },
    user_agent: {
      type: String,
    },
    revoked_reason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // auto-manage created_at & updated_at
  },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
