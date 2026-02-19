import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

/**
 * ✅ CORS (single, clean config)
 * Add your Netlify production + preview URLs here (NO trailing slash).
 */
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:3000",
  // Netlify (production)
  "https://astounding-gelato-856f18.netlify.app",
  // Netlify (deploy preview – optional)
  "https://699692f02527f46c5b730425--astounding-gelato-856f18.netlify.app",
]);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (curl, server-to-server, health checks)
      if (!origin) return cb(null, true);

      if (allowedOrigins.has(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

/**
 * Debug endpoint (optional)
 */
app.get("/db-status", (req, res) => {
  res.json({
    readyState: mongoose.connection.readyState,
    states: {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    },
  });
});

app.get("/health", (req, res) => res.json({ ok: true }));

// Routes
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

// Start
await connectDB();
app.listen(env.PORT, () => console.log(`✅ Server running on port ${env.PORT}`));
