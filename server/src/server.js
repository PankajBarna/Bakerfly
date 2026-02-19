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

// import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://astounding-gelato-856f18.netlify.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl/postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS blocked: " + origin));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.options("*", cors());

app.get("/db-status", (req, res) => {
  res.json({
    readyState: mongoose.connection.readyState,
    states: {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    }
  });
});

import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://699692f02527f46c5b730425--astounding-gelato-856f18.netlify.app"
  ]
}));


app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

await connectDB();
app.listen(env.PORT, () => console.log(`✅ Server running on http://localhost:${env.PORT}`));
