import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import mongoose from "mongoose";

export const healthCheck = asyncHandler(async (_req, res) => {
  let dbStatus = "unknown";
  let dbInfo = {};
  let latency = null;

  try {
    const state = mongoose.connection.readyState;
    const stateMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    dbStatus = stateMap[state] || "unknown";

    if (state === 1) {
      // 1️⃣ Measure latency on ping
      const start = performance.now();
      await mongoose.connection.db.admin().ping();
      latency = Math.round(performance.now() - start);

      dbStatus = "healthy";

      // 2️⃣ Fetch server info
      const admin = mongoose.connection.db.admin();
      const serverInfo = await admin.serverStatus();
      const buildInfo = await admin.buildInfo();

      dbInfo = {
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        version: buildInfo.version,
        clusterTime: serverInfo.operationTime?.toString?.() || null,
        storageEngine: serverInfo.storageEngine?.name || "unknown",
      };
    }
  } catch (error) {
    dbStatus = `unhealthy: ${error.message}`;
  }

  return res.status(200).json(
    new ApiResponse(200, "OK", {
      uptime: process.uptime(),
      db: dbStatus,
      latency: latency !== null ? `${latency}ms` : null,
      dbInfo,
      timestamp: new Date().toISOString(),
    })
  );
});

export default healthCheck;
