import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { Butterfly, Menu as MenuIcon, PhoneCall, MessageCircle } from "lucide-react";
import { Sparkles, Menu as MenuIcon, PhoneCall, MessageCircle } from "lucide-react";

import Container from "./Container.jsx";
import Button from "../ui/Button.jsx";
import { useSettings } from "../../hooks/useSettings.js";
import { useCart } from "../../context/CartContext.jsx";

function navClass({ isActive }) {
  return `px-3 py-2 rounded-lg text-sm transition ${
    isActive ? "bg-black/5" : "hover:bg-black/5"
  }`;
}

export default function Header() {
  const { settings } = useSettings();
  const { setDrawerOpen } = useCart();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const waUrl = useMemo(() => {
    const num = settings.business.whatsappNumber;
    return `https://wa.me/${num}`;
  }, [settings.business.whatsappNumber]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--bg)]/85 border-b border-[var(--border)]">
      <Container className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-black/5"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <button onClick={() => nav("/")} className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow)]">
              <Sparkles className="w-5 h-5 text-[var(--brand)]" />

            </span>
            <div className="text-left leading-tight">
              <div className="font-semibold tracking-tight">{settings.business.name}</div>
              <div className="text-xs text-[var(--muted)] hidden sm:block">
                {settings.business.tagline}
              </div>
            </div>
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/menu" className={navClass}>Menu</NavLink>
          <NavLink to="/pricing" className={navClass}>Pricing</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:inline-flex" onClick={() => setDrawerOpen(true)}>
            View Order
          </Button>
          <Button as="a" href={waUrl} target="_blank" rel="noreferrer" variant="brand">
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </Button>
          <a className="hidden md:inline-flex p-2 rounded-xl hover:bg-black/5" href={`tel:${settings.business.whatsappNumber}`}>
            <PhoneCall className="w-5 h-5" />
          </a>
        </div>
      </Container>

      {/* mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/30 transition ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-[var(--surface)] shadow-[var(--shadow)] transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="font-semibold">Menu</div>
            <button className="px-3 py-2 rounded-lg hover:bg-black/5" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="p-3 flex flex-col gap-1">
            <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/menu" className={navClass} onClick={() => setOpen(false)}>Menu</NavLink>
            <NavLink to="/pricing" className={navClass} onClick={() => setOpen(false)}>Pricing</NavLink>
            <NavLink to="/contact" className={navClass} onClick={() => setOpen(false)}>Contact</NavLink>
            <div className="mt-3">
              <Button className="w-full" variant="outline" onClick={() => { setOpen(false); setDrawerOpen(true); }}>
                View Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
