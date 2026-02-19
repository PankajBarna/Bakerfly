import Container from "../components/layout/Container.jsx";
import Button from "../components/ui/Button.jsx";
import { useSettings } from "../hooks/useSettings.js";

export default function Pricing() {
  const { settings } = useSettings();
  const wa = `https://wa.me/${settings.business.whatsappNumber}`;

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold">Pricing</h1>
      <p className="mt-2 text-[var(--muted)] max-w-2xl">
        Transparent tiers. For final customization, tap WhatsApp and we’ll confirm availability + exact quote.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {settings.pricing?.tiers?.map((t) => (
          <div key={t.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-5">
            <div className="text-sm text-[var(--muted)]">Tier</div>
            <div className="mt-1 text-lg font-semibold">{t.title}</div>
            <div className="mt-3 text-2xl font-semibold">{t.price}</div>
            <div className="mt-2 text-sm text-[var(--muted)]">{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-[var(--muted)]">Get exact quote</div>
          <div className="text-xl font-semibold">Share your theme + date, we’ll respond fast.</div>
          <div className="text-sm text-[var(--muted)] mt-1">
            Custom cakes start ₹{settings.pricing?.customStarts}/kg • Price range {settings.pricing?.range}
          </div>
        </div>
        <Button as="a" href={wa} target="_blank" rel="noreferrer" variant="brand" className="px-6 py-3">
          Get exact quote on WhatsApp
        </Button>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="font-semibold">Notes</div>
        <ul className="mt-2 text-sm text-[var(--muted)] list-disc pl-5 space-y-1">
          <li>Theme complexity, size, and delivery timing can affect final quote.</li>
          <li>Eggless options available (mention in notes).</li>
          <li>Delivery within Thane city; pickup at Plalva Phase 2.</li>
        </ul>
      </div>
    </Container>
  );
}
