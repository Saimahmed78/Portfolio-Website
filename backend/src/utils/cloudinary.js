import { v2 as cloudinary } from "cloudinary";

const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("✅ Cloudinary connected and configured successfully.");
} else {
  console.warn("⚠️ Cloudinary credentials are not defined in environmental variables. Falling back to secure mock/local data-URI storage during development.");
}

/**
 * Uploads a file buffer directly to Cloudinary or returns a development data-URI fallback.
 * @param {Buffer} fileBuffer - The file buffer to upload.
 * @param {string} originalName - Original filename to determine mime type.
 * @param {string} folder - Destination folder on Cloudinary.
 * @returns {Promise<string>} The public secure URL.
 */
export const uploadToCloudinary = async (fileBuffer, originalName, folder = "pulse_board") => {
  if (!isCloudinaryConfigured) {
    // Generate a data-URI representation of the file as an exceptionally reliable fallback
    const ext = originalName.split(".").pop().toLowerCase();
    let mime = "application/octet-stream";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      mime = `image/${ext === "jpg" ? "jpeg" : ext}`;
    } else if (ext === "pdf") {
      mime = "application/pdf";
    } else if (["doc", "docx"].includes(ext)) {
      mime = "application/msword";
    } else if (ext === "zip") {
      mime = "application/zip";
    }
    const base64Data = fileBuffer.toString("base64");
    return `data:${mime};base64,${base64Data}`;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder,
        resource_type: "auto"
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};
