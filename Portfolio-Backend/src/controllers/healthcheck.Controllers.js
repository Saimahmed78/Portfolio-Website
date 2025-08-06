import ApiResponse from "../utils/ApiResponse.js";

const healthCheck = async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "Server is running", {
      uptime: process.uptime(), // seconds since app started
      timestamp: new Date().toISOString(),
    }),
  );
};
export default healthCheck;
