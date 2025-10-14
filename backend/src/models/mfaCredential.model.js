const mfaCredentialSchema = new Schema(
  {
     
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["TOTP", "SMS", "EMAIL"],
      required: true,
    },
    secret_hash: {
      type: String,
      required: true,
    },
    backup_codes: {
      type: [String],
      default: [],
    },
    mfa_enrolled_at: {
      type: Date,
      default: Date.now,
    },
    last_used: {
      type: Date,
      default: null,
    },
    risk_score: {
      type: Number,
      default: 0,
    },
    device_trust_level: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "LOW",
    },
    device_type: {
      type: String,
      enum: ["DESKTOP", "MOBILE", "TABLET"],
      default: "DESKTOP",
    },
    algorithm: {
      type: String,
      enum: ["SHA1", "SHA256", "SHA512"],
      default: "SHA1",
    },
    delivery_channel: {
      type: String,
      enum: ["SMS", "EMAIL", "AUTH_APP"],
      default: "AUTH_APP",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }, // adds createdAt & updatedAt automatically
);
mfaSchema.index({ user_id: 1, is_active: 1 });
const MFACredential = mongoose.model("MFACredential", mfaCredentialSchema);
export default MFACredential;
