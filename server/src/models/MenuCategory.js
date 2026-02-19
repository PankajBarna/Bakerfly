import mongoose from "mongoose";

const MenuCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sort_order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("MenuCategory", MenuCategorySchema);
