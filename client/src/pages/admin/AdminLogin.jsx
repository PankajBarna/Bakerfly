import { useState } from "react";
import Container from "../../components/layout/Container.jsx";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { apiPost } from "../../lib/api.js";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await apiPost("/api/admin/login", { password });
      localStorage.setItem("admin_token", res.token);
      window.location.href = "/admin/dashboard";
    } catch {
      setErr("Wrong password.");
    }
  }

  return (
    <Container className="py-10">
      <div className="max-w-md mx-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-6">
        <div className="text-xl font-semibold">Admin Login</div>
        <p className="mt-1 text-sm text-[var(--muted)]">Password is stored in server ENV.</p>

        <form className="mt-5 space-y-4" onSubmit={submit}>
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {err ? <div className="text-sm text-red-600">{err}</div> : null}
          <Button variant="brand" className="w-full py-3">Login</Button>
        </form>
      </div>
    </Container>
  );
}
