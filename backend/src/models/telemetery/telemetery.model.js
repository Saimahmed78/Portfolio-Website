import mongoose from "mongoose";

const { Schema } = mongoose;

const telemetryEventSchema = new Schema(
  {
    event_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user_id: {
      type: String,
      ref: "User",
      default: null,
      index: true,
    },
    version: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["auth", "api_call", "ui_interaction", "error", "system"],
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
    context: {
      type: Object,
      default: {},
    },
    session_id: {
      type: String,
      default: null,
      index: true,
    },
    severity: {
      type: String,
      enum: ["info", "warning", "error", "critical"],
      default: "info",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);


const TelemetryEvent = mongoose.model("TelemetryEvent", telemetryEventSchema);
export default TelemetryEvent;
