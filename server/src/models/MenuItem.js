import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: "piece" }, // piece / kg
    desc: { type: String, default: "" },
    image_url: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sort_order: { type: Number, default: 0 },
    min_qty: { type: Number, default: 1 },
    step: { type: Number, default: 1 },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", MenuItemSchema);
