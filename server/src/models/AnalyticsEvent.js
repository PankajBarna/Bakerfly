import mongoose from "mongoose";

const AnalyticsEventSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // page_view | click | order_intent | lead_submit
    path: { type: String, default: "" },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    ua: { type: String, default: "" },
    ip: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("AnalyticsEvent", AnalyticsEventSchema);
