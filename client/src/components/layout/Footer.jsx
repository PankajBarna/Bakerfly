import Container from "./Container.jsx";
import { useSettings } from "../../hooks/useSettings.js";

export default function Footer() {
  const { settings } = useSettings();
  return (
    <footer className="border-t border-[var(--border)]">
      <Container className="py-8 text-sm text-[var(--muted)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="font-semibold text-[var(--text)]">{settings.business.name}</div>
            <div className="mt-1">{settings.business.location}</div>
            <div className="mt-1">{settings.business.hours}</div>
          </div>
          <div>
            <div className="font-semibold text-[var(--text)]">Service</div>
            <div className="mt-1">Delivery + pickup within {settings.business.serviceArea}</div>
            <div className="mt-1">WhatsApp: +91 {settings.business.whatsappNumber}</div>
          </div>
          <div>
            <div className="font-semibold text-[var(--text)]">Admin</div>
            <a className="mt-1 inline-block underline" href="/admin">/admin</a>
            <div className="mt-2">© {new Date().getFullYear()} {settings.business.name}</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
