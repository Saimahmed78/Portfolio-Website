import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({
  path: ".env", // relative path is /home/saimahmed/Desktop/Folder/.env
});
const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
    methods: ["PUT", "DELETE", "UPDATE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export default app;
