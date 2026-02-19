import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api.js";

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]">
      <div className="text-sm text-[var(--muted)]">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-[var(--text)]">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const token = localStorage.getItem("admin_token");
  const [stats, setStats] = useState({ leads: 0, menuItems: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const data = await apiGet("/api/admin/analytics/summary", token);
        if (data) setStats(data);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [token]);

  return (
    <div>
      <div className="text-xl font-semibold">Admin Dashboard</div>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Quick overview of enquiries and menu content.
      </p>

      {loading ? (
        <div className="mt-6 text-sm text-[var(--muted)]">Loading…</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Leads" value={stats.leads ?? 0} />
          <StatCard label="Categories" value={stats.categories ?? 0} />
          <StatCard label="Menu Items" value={stats.menuItems ?? 0} />
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="font-medium">Next steps</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)] space-y-1">
          <li>Add categories (Theme Cakes, Cheesecakes, etc.)</li>
          <li>Add menu items with price, unit, image URL</li>
          <li>Test Contact form → leads will show up in Leads page</li>
          <li>Test WhatsApp order message from Menu page</li>
        </ul>
      </div>
    </div>
  );
}
