import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import dbConnection from "./infrastructure/db/connection.js";
import userRoutes from "./routes/auth.routes.js";
import healthCheck from "./controllers/healthcheck.controller.js";

dotenv.config({
  path: ".env", // relative path is /home/saimahmed/Desktop/Folder/.env
});
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["PUT", "DELETE", "OPTIONS", "GET"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  }),
);

dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/users", userRoutes);
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
