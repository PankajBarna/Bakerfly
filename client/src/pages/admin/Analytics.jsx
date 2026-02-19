import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api.js";

export default function Analytics() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    apiGet("/api/admin/analytics/summary", token).then(setData);
  }, [token]);

  if (!data) return <div className="text-sm text-[var(--muted)]">Loading…</div>;

  return (
    <div>
      <div className="text-xl font-semibold">Analytics (last 7 days)</div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-[var(--border)] p-4">
          <div className="text-sm text-[var(--muted)]">Total events</div>
          <div className="text-2xl font-semibold">{data.total}</div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] p-4">
          <div className="text-sm text-[var(--muted)]">Events (7d)</div>
          <div className="text-2xl font-semibold">{data.week}</div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] p-4">
          <div className="text-sm text-[var(--muted)]">Top event type</div>
          <div className="text-2xl font-semibold">{data.byType?.[0]?._id || "-"}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[var(--border)] p-4">
          <div className="font-semibold">Events by type</div>
          <div className="mt-3 space-y-2 text-sm">
            {data.byType.map((x) => (
              <div key={x._id} className="flex justify-between">
                <div className="text-[var(--muted)]">{x._id}</div>
                <div className="font-medium">{x.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] p-4">
          <div className="font-semibold">Top pages</div>
          <div className="mt-3 space-y-2 text-sm">
            {data.topPages.map((x) => (
              <div key={x._id} className="flex justify-between">
                <div className="text-[var(--muted)]">{x._id}</div>
                <div className="font-medium">{x.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
