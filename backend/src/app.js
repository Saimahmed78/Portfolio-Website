import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import dbConnection from "./infrastructure/db/connection.js";
import authRoutes from "./routes/auth.routes.js";
import healthCheck from "./controllers/healthcheck.controller.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config({
  path: ".env",
});
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [process.env.CLIENT_URL?.trim()];
      const isLocal = origin.includes("localhost") || origin.includes("127.0.0.1") || /^http:\/\/192\.168\./.test(origin);
      
      if (allowedOrigins.includes(origin) || isLocal) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["PUT", "DELETE", "OPTIONS", "GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-device-model"],
    exposedHeaders: ["Set-Cookie", "*"],
  }),
);

dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount the authentication routes at /api/v1/auth
app.use("/api/v1/auth", apiLimiter, authRoutes);
app.use("/api/v1/healthCheck", healthCheck);

app.use((err, req, res, next) => {
  console.error("💥 Error Middleware Triggered:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors || [],
    });
  }

  if (err.name === "ValidationError") {
    const fields = Object.keys(err.errors);
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${fields.join(", ")}`,
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    statusCode: 500,
  });
});

export default app;
