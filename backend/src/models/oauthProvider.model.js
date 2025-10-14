import mongoose from "mongoose";

const { Schema } = mongoose;

const oauthProviderSchema = new Schema(
  {
    provider_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User",
    },
    provider_name: {
      type: String,
      required: true,
      enum: ["google", "github", "facebook", "twitter", "linkedin"],
    },
    provider_user_id: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true, // encrypted before saving
    },
    refresh_token: {
      type: String,
      required: false, // some providers may not give refresh tokens
    },
    expires_at: {
      type: Date,
      required: false,
    },
    scope: {
      type: [String],
      default: [],
      description: "List of OAuth scopes granted by the provider",
    },
  },
  {
    timestamps: true, // auto adds createdAt, updatedAt
  },
);

// Compound unique index for provider + provider_user_id
oauthProviderSchema.index(
  { provider_name: 1, provider_user_id: 1 },
  { unique: true },
);
// Lookup index for user
oauthProviderSchema.index({ user_id: 1 });

const OAuthProvider = mongoose.model("OAuthProvider", oauthProviderSchema);
export default OAuthProvider;
