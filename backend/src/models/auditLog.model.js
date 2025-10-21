import mongoose from "mongoose";

const { Schema } = mongoose;

const auditLogSchema = new Schema(
  {
    event_type: {
      type: String,
      required: true,
      enum: [
        "REGISTRATION",
        "LOGIN",
        "LOGOUT",
        "VERIFICATION_RESEND",
        "ACCOUNT_LOCKED",
        "ACCOUNT_UNLOCKED",
        "PASSWORD_CHANGE",
        "TOKEN_REFRESH",
        "TOKEN_REVOKE",
        "DELETE_ACCOUNT",
        "PASSWORD_RESET",
        "MFA_VERIFIED",
        "FAILED_MFA",
        "SUSPICIOUS_ACTIVITY",
        "VERIFICATION_SUCCESS",
        "DEVICE_ADDED",
        "ROLE_CHANGED",
      ],
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILURE"],
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    performed_by: {
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
    location: String,
    device_info: {
      os: { type: Schema.Types.Mixed, default: {} },
      browser: { type: Schema.Types.Mixed, default: {} },
      user_agent: { type: String, default: "" },
    },

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
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
