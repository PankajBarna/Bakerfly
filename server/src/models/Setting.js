import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true } // json
  },
  { timestamps: true }
);

export default mongoose.model("Setting", SettingSchema);
