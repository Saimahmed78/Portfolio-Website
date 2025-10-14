import mongoose from "mongoose";
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
   
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  },
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
