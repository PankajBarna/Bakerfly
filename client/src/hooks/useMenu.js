import { useEffect, useState } from "react";
import { apiGet } from "../lib/api.js";
import { siteConfig } from "../config/siteConfig.js";

export function useMenu() {
  const [data, setData] = useState({ categories: [], items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/api/menu")
      .then(setData)
      .catch(() => {
        // fallback to config if DB empty
        setData({
          categories: siteConfig.menu.categories.map((c) => ({ _id: c.id, name: c.name, sort_order: c.sort_order })),
          items: siteConfig.menu.items.map((i) => ({
            _id: i.id,
            category_id: i.category_id,
            name: i.name,
            price: i.price,
            unit: i.unit,
            desc: i.shortDesc,
            image_url: i.image,
            featured: i.featured,
            active: true,
            min_qty: i.minQty,
            step: i.step,
            tags: i.tags
          }))
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
