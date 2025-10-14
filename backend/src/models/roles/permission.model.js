import mongoose from "mongoose";
const { Schema } = mongoose;

const permissionSchema = new Schema(
  {
    
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true, // consistency (e.g. USER_CREATE)
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
