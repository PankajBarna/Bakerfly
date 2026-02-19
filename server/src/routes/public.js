import { Router } from "express";
import Setting from "../models/Setting.js";
import MenuCategory from "../models/MenuCategory.js";
import MenuItem from "../models/MenuItem.js";
import Lead from "../models/Lead.js";
import AnalyticsEvent from "../models/AnalyticsEvent.js";
import { z } from "zod";

const router = Router();

router.get("/settings", async (req, res) => {
  // runtime overrides for config:
  const docs = await Setting.find({});
  const out = {};
  docs.forEach(d => (out[d.key] = d.value));
  res.json(out);
});

router.get("/menu", async (req, res) => {
  const categories = await MenuCategory.find({}).sort({ sort_order: 1, createdAt: 1 });
  const items = await MenuItem.find({ active: true }).sort({ sort_order: 1, createdAt: 1 });
  res.json({ categories, items });
});

router.post("/lead", async (req, res) => {
  const schema = z.object({
    name: z.string().min(2),
    phone: z.string().min(8),
    message: z.string().optional().default(""),
    preferred_date: z.string().optional().default(""),
    fulfillment: z.enum(["delivery", "pickup"]).optional().default("delivery"),
    area: z.string().optional().default("")
  });

  const data = schema.parse(req.body);
  const lead = await Lead.create(data);

  // analytics
  await AnalyticsEvent.create({
    type: "lead_submit",
    path: "/contact",
    meta: { leadId: lead._id }
  });

  res.json({ ok: true, leadId: lead._id });
});

router.post("/analytics", async (req, res) => {
  const schema = z.object({
    type: z.string().min(1),
    path: z.string().optional().default(""),
    meta: z.any().optional().default({})
  });
  const data = schema.parse(req.body);

  await AnalyticsEvent.create({
    ...data,
    ua: req.headers["user-agent"] || "",
    ip: req.headers["x-forwarded-for"]?.toString()?.split(",")[0]?.trim() || req.socket.remoteAddress || ""
  });

  res.json({ ok: true });
});

export default router;
