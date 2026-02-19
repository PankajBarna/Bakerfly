import { useEffect, useMemo, useState } from "react";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { apiDel, apiGet, apiPost, apiPut } from "../../lib/api.js";

export default function Items() {
  const token = localStorage.getItem("admin_token");

  const [cats, setCats] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // form state
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    price: "",
    unit: "piece",
    desc: "",
    image_url: "",
    featured: false,
    active: true,
    sort_order: 0,
    min_qty: 1,
    step: 1
  });

  const categoryById = useMemo(() => {
    const m = new Map();
    cats.forEach((c) => m.set(c._id, c));
    return m;
  }, [cats]);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const [c, i] = await Promise.all([
        apiGet("/api/admin/categories", token),
        apiGet("/api/admin/items", token)
      ]);
      setCats(c || []);
      setItems(i || []);
      // auto set category if empty
      if (!form.category_id && (c || []).length) {
        setForm((p) => ({ ...p, category_id: (c || [])[0]._id }));
      }
    } catch (e) {
      setErr("Failed to load items");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setField(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function addItem(e) {
    e.preventDefault();
    setErr("");

    if (!form.category_id) return setErr("Choose a category first");
    if (!form.name.trim()) return setErr("Item name required");
    if (form.price === "" || Number(form.price) <= 0) return setErr("Price must be > 0");

    try {
      await apiPost(
        "/api/admin/items",
        {
          ...form,
          name: form.name.trim(),
          price: Number(form.price),
          sort_order: Number(form.sort_order) || 0,
          min_qty: Number(form.min_qty) || 1,
          step: Number(form.step) || 1
        },
        token
      );

      setForm((p) => ({
        ...p,
        name: "",
        price: "",
        desc: "",
        image_url: "",
        featured: false,
        active: true,
        sort_order: 0,
        min_qty: 1,
        step: 1
      }));
      await load();
    } catch {
      setErr("Failed to add item");
    }
  }

  async function updateItem(id, patch) {
    setErr("");
    try {
      await apiPut(`/api/admin/items/${id}`, patch, token);
      await load();
    } catch {
      setErr("Failed to update item");
    }
  }

  async function removeItem(id) {
    if (!confirm("Delete this item?")) return;
    setErr("");
    try {
      await apiDel(`/api/admin/items/${id}`, token);
      await load();
    } catch {
      setErr("Failed to delete item");
    }
  }

  return (
    <div>
      <div className="text-xl font-semibold">Menu Items</div>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Add/edit/delete items. These show on the public Menu page.
      </p>

      {cats.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="font-medium">No categories found</div>
          <div className="mt-1 text-sm text-[var(--muted)]">
            Create categories first from <span className="font-medium">Categories</span>.
          </div>
        </div>
      ) : (
        <form onSubmit={addItem} className="mt-5 rounded-2xl border border-[var(--border)] p-4 bg-[var(--surface)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[var(--muted)]">Category</label>
              <select
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                value={form.category_id}
                onChange={(e) => setField("category_id", e.target.value)}
              >
                {cats.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Input label="Item name" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="e.g. Rose Gold Theme Cake" />

            <Input label="Price (₹)" type="number" value={form.price} onChange={(e) => setField("price", e.target.value)} placeholder="e.g. 1199" />
            <div>
              <label className="text-sm text-[var(--muted)]">Unit</label>
              <select
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                value={form.unit}
                onChange={(e) => setField("unit", e.target.value)}
              >
                <option value="piece">piece</option>
                <option value="kg">kg</option>
                <option value="box">box</option>
              </select>
            </div>

            <Input label="Image URL" value={form.image_url} onChange={(e) => setField("image_url", e.target.value)} placeholder="https://..." />
            <Input label="Sort order" type="number" value={form.sort_order} onChange={(e) => setField("sort_order", e.target.value)} />

            <Input label="Min Qty" type="number" value={form.min_qty} onChange={(e) => setField("min_qty", e.target.value)} />
            <Input label="Step (e.g. 0.5 for kg)" type="number" value={form.step} onChange={(e) => setField("step", e.target.value)} />

            <div className="md:col-span-2">
              <label className="text-sm text-[var(--muted)]">Description</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 min-h-[90px]"
                value={form.desc}
                onChange={(e) => setField("desc", e.target.value)}
                placeholder="Short premium description…"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={(e) => setField("active", e.target.checked)} />
                Active
              </label>
            </div>

            <div className="md:col-span-2">
              <Button variant="brand" className="h-[42px]">Add Item</Button>
            </div>
          </div>

          {err ? <div className="mt-3 text-sm text-red-600">{err}</div> : null}
        </form>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="text-sm text-[var(--muted)]">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">No items yet.</div>
        ) : (
          <div className="overflow-auto rounded-2xl border border-[var(--border)]">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-black/5">
                <tr>
                  <th className="text-left p-3">Item</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Unit</th>
                  <th className="text-left p-3">Featured</th>
                  <th className="text-left p-3">Active</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it._id} className="border-t border-[var(--border)]">
                    <td className="p-3 min-w-[240px]">
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-[var(--muted)] line-clamp-2">{it.desc || "-"}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">{categoryById.get(it.category_id)?.name || "-"}</td>
                    <td className="p-3 whitespace-nowrap">₹{it.price}</td>
                    <td className="p-3 whitespace-nowrap">{it.unit}</td>
                    <td className="p-3">
                      <button
                        className="px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-black/5"
                        onClick={() => updateItem(it._id, { featured: !it.featured })}
                        type="button"
                      >
                        {it.featured ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        className="px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-black/5"
                        onClick={() => updateItem(it._id, { active: !it.active })}
                        type="button"
                      >
                        {it.active ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        className="px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-black/5"
                        onClick={() => removeItem(it._id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
