import { Router } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { requireAdmin } from "../middleware/auth.js";
import Setting from "../models/Setting.js";
import MenuCategory from "../models/MenuCategory.js";
import MenuItem from "../models/MenuItem.js";
import Lead from "../models/Lead.js";
import AnalyticsEvent from "../models/AnalyticsEvent.js";
import { z } from "zod";

const router = Router();

// login
router.post("/login", async (req, res) => {
  const schema = z.object({ password: z.string().min(1) });
  const { password } = schema.parse(req.body);
  if (password !== env.ADMIN_PASSWORD) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ admin: true }, env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// protected below
router.use(requireAdmin);

// settings (store as key/value json)
router.get("/settings", async (req, res) => {
  const docs = await Setting.find({});
  const out = {};
  docs.forEach(d => (out[d.key] = d.value));
  res.json(out);
});

router.put("/settings/:key", async (req, res) => {
  const key = req.params.key;
  const value = req.body?.value;
  const doc = await Setting.findOneAndUpdate(
    { key },
    { key, value },
    { upsert: true, new: true }
  );
  res.json(doc);
});

// categories CRUD
router.get("/categories", async (req, res) => {
  const cats = await MenuCategory.find({}).sort({ sort_order: 1, createdAt: 1 });
  res.json(cats);
});

router.post("/categories", async (req, res) => {
  const schema = z.object({ name: z.string().min(2), sort_order: z.number().optional().default(0) });
  const data = schema.parse(req.body);
  const cat = await MenuCategory.create(data);
  res.json(cat);
});

router.put("/categories/:id", async (req, res) => {
  const schema = z.object({ name: z.string().min(2), sort_order: z.number().optional() });
  const data = schema.parse(req.body);
  const updated = await MenuCategory.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});

router.delete("/categories/:id", async (req, res) => {
  await MenuCategory.findByIdAndDelete(req.params.id);
  await MenuItem.deleteMany({ category_id: req.params.id });
  res.json({ ok: true });
});

// items CRUD
router.get("/items", async (req, res) => {
  const items = await MenuItem.find({}).sort({ sort_order: 1, createdAt: 1 });
  res.json(items);
});

router.post("/items", async (req, res) => {
  const schema = z.object({
    category_id: z.string().min(1),
    name: z.string().min(2),
    price: z.number().min(0),
    unit: z.string().optional().default("piece"),
    desc: z.string().optional().default(""),
    image_url: z.string().optional().default(""),
    featured: z.boolean().optional().default(false),
    active: z.boolean().optional().default(true),
    sort_order: z.number().optional().default(0),
    min_qty: z.number().optional().default(1),
    step: z.number().optional().default(1),
    tags: z.array(z.string()).optional().default([])
  });
  const data = schema.parse(req.body);
  const item = await MenuItem.create(data);
  res.json(item);
});

router.put("/items/:id", async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/items/:id", async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// leads list
router.get("/leads", async (req, res) => {
  const leads = await Lead.find({}).sort({ createdAt: -1 }).limit(200);
  res.json(leads);
});

// analytics
router.get("/analytics/summary", async (req, res) => {
  const last7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const total = await AnalyticsEvent.countDocuments({});
  const week = await AnalyticsEvent.countDocuments({ createdAt: { $gte: last7 } });

  const byType = await AnalyticsEvent.aggregate([
    { $match: { createdAt: { $gte: last7 } } },
    { $group: { _id: "$type", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const topPages = await AnalyticsEvent.aggregate([
    { $match: { type: "page_view", createdAt: { $gte: last7 } } },
    { $group: { _id: "$path", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  res.json({ total, week, byType, topPages });
});

export default router;
