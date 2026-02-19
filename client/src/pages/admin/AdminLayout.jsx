import { NavLink, Outlet } from "react-router-dom";
import Container from "../../components/layout/Container.jsx";
import Button from "../../components/ui/Button.jsx";

function navClass({ isActive }) {
  return `px-3 py-2 rounded-xl text-sm transition ${isActive ? "bg-black/5" : "hover:bg-black/5"}`;
}

export default function AdminLayout() {
  function logout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin";
  }

  return (
    <Container className="py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-[var(--muted)]">Edit business info, menu, view leads & analytics.</p>
        </div>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        <aside className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-3 h-fit">
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin/dashboard" className={navClass}>Dashboard</NavLink>
            <NavLink to="/admin/settings" className={navClass}>Settings</NavLink>
            <NavLink to="/admin/categories" className={navClass}>Categories</NavLink>
            <NavLink to="/admin/items" className={navClass}>Items</NavLink>
            <NavLink to="/admin/leads" className={navClass}>Leads</NavLink>
            <NavLink to="/admin/analytics" className={navClass}>Analytics</NavLink>
          </nav>
        </aside>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-5">
          <Outlet />
        </section>
      </div>
    </Container>
  );
}
