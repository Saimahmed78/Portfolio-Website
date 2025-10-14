import mongoose from "mongoose";

const { Schema } = mongoose;

const auditLogSchema = new Schema(
  {
    log_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    event_type: {
      type: String,
      required: true,
      enum: [
        "LOGIN_SUCCESS",
        "LOGIN_FAILURE",
        "LOGOUT",
        "TOKEN_REFRESH",
        "TOKEN_REVOKE",
        "PASSWORD_RESET",
        "MFA_VERIFIED",
        "FAILED_MFA",
        "SUSPICIOUS_ACTIVITY",
        "EMAIL_VERIFICATION",
        "DEVICE_ADDED",
        "ROLE_CHANGED",
      ],
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token_id: {
      type: Schema.Types.ObjectId,
      default: null,
      index: true,
      ref: "SessionToken",
    },

    ip_address: { type: String },
    reason: { type: String, default: null }, // optional, e.g., failure reason
    device_info: { type: Object, default: {} }, // user-agent, OS, browser
    metadata: { type: Schema.Types.Mixed, default: {} }, // any extra JSON
  },
  {
    timestamps: true, // optional, if you want Mongoose to auto-manage createdAt/updatedAt
  },
);
// Fast user-based queries
auditLogSchema.index({ user_id: 1 });
// Event type queries
auditLogSchema.index({ event_type: 1 });
// Recent logs first
auditLogSchema.index({ timestamp: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
