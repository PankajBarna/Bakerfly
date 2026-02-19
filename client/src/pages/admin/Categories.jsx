import { useEffect, useState } from "react";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { apiDel, apiGet, apiPost, apiPut } from "../../lib/api.js";

export default function Categories() {
  const token = localStorage.getItem("admin_token");
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [sort, setSort] = useState(0);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet("/api/admin/categories", token);
      setCats(data || []);
    } catch (e) {
      setErr("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addCategory(e) {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("Category name required");

    try {
      await apiPost("/api/admin/categories", { name: name.trim(), sort_order: Number(sort) || 0 }, token);
      setName("");
      setSort(0);
      await load();
    } catch (e) {
      setErr("Failed to add category");
    }
  }

  async function updateCategory(id, patch) {
    setErr("");
    try {
      await apiPut(`/api/admin/categories/${id}`, patch, token);
      await load();
    } catch {
      setErr("Failed to update category");
    }
  }

  async function removeCategory(id) {
    if (!confirm("Delete category? This will also delete items in it.")) return;
    setErr("");
    try {
      await apiDel(`/api/admin/categories/${id}`, token);
      await load();
    } catch {
      setErr("Failed to delete category");
    }
  }

  return (
    <div>
      <div className="text-xl font-semibold">Categories</div>
      <p className="mt-1 text-sm text-[var(--muted)]">Add/edit/delete menu categories.</p>

      <form onSubmit={addCategory} className="mt-5 rounded-2xl border border-[var(--border)] p-4 bg-[var(--surface)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <Input label="Category name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Theme Cakes" />
          <Input label="Sort order" type="number" value={sort} onChange={(e) => setSort(e.target.value)} />
          <Button variant="brand" className="h-[42px]">Add Category</Button>
        </div>
        {err ? <div className="mt-3 text-sm text-red-600">{err}</div> : null}
      </form>

      <div className="mt-5">
        {loading ? (
          <div className="text-sm text-[var(--muted)]">Loading…</div>
        ) : cats.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">No categories yet.</div>
        ) : (
          <div className="overflow-auto rounded-2xl border border-[var(--border)]">
            <table className="min-w-[720px] w-full text-sm">
              <thead className="bg-black/5">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Sort</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cats.map((c) => (
                  <tr key={c._id} className="border-t border-[var(--border)]">
                    <td className="p-3">
                      <input
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                        defaultValue={c.name}
                        onBlur={(e) => updateCategory(c._id, { name: e.target.value.trim() || c.name })}
                      />
                    </td>
                    <td className="p-3 w-[140px]">
                      <input
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                        type="number"
                        defaultValue={c.sort_order || 0}
                        onBlur={(e) => updateCategory(c._id, { sort_order: Number(e.target.value) || 0 })}
                      />
                    </td>
                    <td className="p-3">
                      <button className="px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-black/5" onClick={() => removeCategory(c._id)} type="button">
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
