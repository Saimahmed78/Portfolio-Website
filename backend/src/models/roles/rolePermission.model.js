import mongoose from "mongoose";
const { Schema } = mongoose;

const rolePermissionSchema = new Schema(
  {
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true,
    },
    
    perm_id: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
      index: true,
    },
    assigned_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Avoid duplicate role-permission pairs
rolePermissionSchema.index({ role_id: 1, perm_id: 1 }, { unique: true });

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

export default RolePermission;
