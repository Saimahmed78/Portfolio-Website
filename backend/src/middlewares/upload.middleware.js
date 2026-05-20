import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

// Use memory storage for quick streaming uploads to Cloudinary without creating temp directory files
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Safe general format check (no executables or system-level scripts)
  const allowedExtensions = /\.(jpeg|jpg|png|gif|webp|pdf|doc|docx|zip|txt|csv|xlsx)$/i;
  if (!file.originalname.match(allowedExtensions)) {
    return cb(new ApiError(400, "Unsupported file format. Please upload standard documents or images."), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Allow up to 10MB
  },
  fileFilter,
});
