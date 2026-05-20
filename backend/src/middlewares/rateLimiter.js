import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import Redis from "ioredis";
import { ApiError } from "../utils/ApiError.js";

// Safe, fallback-enabled Redis Initialization
let store = null;
const redisUrl = process.env.REDIS_URL;

if (redisUrl) {
  try {
    console.log("Initializing Redis Client for Rate Limiting Store...");
    const redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => {
        // Stop retrying if connection fails to prevent application hang
        if (times > 3) {
          console.warn("Redis connection failed. Falling back to local in-memory rate-limiter store.");
          return null; 
        }
        return Math.min(times * 100, 2000);
      }
    });

    redisClient.on("error", (err) => {
      console.warn("Redis client error detected:", err.message);
    });

    store = new RedisStore({
      // @ts-ignore
      sendCommand: (...args) => redisClient.call(...args),
    });
    console.log("Redis Rate Limiter Store initialized successfully.");
  } catch (err) {
    console.warn("Failed to initialize Redis store. Falling back to in-memory rate limiting:", err.message);
    store = undefined; // express-rate-limit defaults to MemoryStore
  }
} else {
  console.log("No REDIS_URL found in environment. Utilizing safe local in-memory rate-limiter store.");
}

// Custom handler to return ApiError structure
const rateLimitHandler = (req, res, next, options) => {
  throw new ApiError(429, "Too many requests from this client. Please try again later.");
};

// 1. Strict Limiter for Authentications (Login / Signup)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  store: store
});

// 2. Limiter for Poll Creations
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // Max 15 poll creations per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  store: store
});

// 3. Strict Limiter for Poll Responses (Submit Response)
export const submitLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Max 10 submissions per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  store: store
});

// 4. General Global API Request Limiter
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  store: store
});
