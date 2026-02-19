import { useEffect, useState } from "react";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { apiGet, apiPut } from "../../lib/api.js";

export default function Settings() {
  const token = localStorage.getItem("admin_token");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    name: "Bakerfly",
    tagline: "Premium home bakery in Thane",
    hours: "11:00 AM – 9:00 PM (Daily)",
    phone: "+91 88798 78493",
    whatsapp: "918879878493",
    location: "Thane, Plalva Phase 2",
    serviceArea: "Thane city",
    pickup: "Plalva Phase 2"
  });

  function setField(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const data = await apiGet("/api/admin/settings", token);
        // expecting { ...settings } or { value: {...} }
        const settings = data?.value ? data.value : data;
        if (settings && typeof settings === "object") {
          setForm((p) => ({ ...p, ...settings }));
        }
      } catch {
        // fallback stays
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  async function save() {
    setSaving(true);
    setErr("");
    setOk("");
    try {
      await apiPut("/api/admin/settings", form, token);
      setOk("Saved successfully.");
      setTimeout(() => setOk(""), 2500);
    } catch {
      setErr("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-[var(--muted)]">Loading…</div>;

  return (
    <div>
      <div className="text-xl font-semibold">Business Settings</div>
      <p className="mt-1 text-sm text-[var(--muted)]">
        These values override the config at runtime (stored in MongoDB).
      </p>

      <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Business name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
          <Input label="Tagline" value={form.tagline} onChange={(e) => setField("tagline", e.target.value)} />

          <Input label="Hours" value={form.hours} onChange={(e) => setField("hours", e.target.value)} />
          <Input label="Phone (display)" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />

          <Input
            label="WhatsApp number (digits only)"
            value={form.whatsapp}
            onChange={(e) => setField("whatsapp", e.target.value.replace(/\D/g, ""))}
            placeholder="918879878493"
          />
          <Input label="Location" value={form.location} onChange={(e) => setField("location", e.target.value)} />

          <Input label="Service area" value={form.serviceArea} onChange={(e) => setField("serviceArea", e.target.value)} />
          <Input label="Pickup area" value={form.pickup} onChange={(e) => setField("pickup", e.target.value)} />
        </div>

        {err ? <div className="mt-3 text-sm text-red-600">{err}</div> : null}
        {ok ? <div className="mt-3 text-sm text-green-600">{ok}</div> : null}

        <div className="mt-4 flex gap-3">
          <Button variant="brand" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
