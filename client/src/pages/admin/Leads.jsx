import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api.js";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    async function run() {
      try {
        const data = await apiGet("/api/admin/leads", token);
        setLeads(data || []);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [token]);

  if (loading) return <div className="text-sm text-[var(--muted)]">Loading…</div>;

  return (
    <div>
      <div className="text-xl font-semibold">Leads</div>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Latest enquiries submitted from Contact form.
      </p>

      {leads.length === 0 ? (
        <div className="mt-4 text-sm text-[var(--muted)]">No leads yet.</div>
      ) : (
        <div className="mt-4 overflow-auto rounded-2xl border border-[var(--border)]">
          <table className="min-w-[820px] w-full text-sm">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Area</th>
                <th className="text-left p-3">Preferred</th>
                <th className="text-left p-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l._id} className="border-t border-[var(--border)]">
                  <td className="p-3 whitespace-nowrap">
                    {new Date(l.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 whitespace-nowrap font-medium">{l.name}</td>
                  <td className="p-3 whitespace-nowrap">{l.phone}</td>
                  <td className="p-3 whitespace-nowrap">{l.fulfillment}</td>
                  <td className="p-3 whitespace-nowrap">{l.area || "-"}</td>
                  <td className="p-3 whitespace-nowrap">{l.preferred_date || "-"}</td>
                  <td className="p-3 min-w-[320px]">{l.message || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
