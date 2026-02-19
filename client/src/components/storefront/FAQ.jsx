export default function FAQ() {
  const faqs = [
    { q: "How do I place an order?", a: "Select items on Menu → open the order drawer → tap Order Now to send WhatsApp message." },
    { q: "Do you deliver within Thane?", a: "Yes, delivery within Thane city. Pickup available at Plalva Phase 2." },
    { q: "Can I request eggless?", a: "Yes. Add “eggless” in item note or overall notes." }
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold">FAQ</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-4">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <div className="mt-2 text-sm text-[var(--muted)]">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
