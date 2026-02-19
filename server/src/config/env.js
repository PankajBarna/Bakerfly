import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret"
};

if (!env.MONGO_URI) {
  console.warn("⚠️ MONGO_URI missing. Set it in .env");
}
if (!env.ADMIN_PASSWORD) {
  console.warn("⚠️ ADMIN_PASSWORD missing. Set it in .env");
}
