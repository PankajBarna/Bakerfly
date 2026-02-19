import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, default: "" },
    preferred_date: { type: String, default: "" },
    fulfillment: { type: String, default: "delivery" }, // delivery/pickup
    area: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", LeadSchema);
