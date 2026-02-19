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
