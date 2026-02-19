import { motion } from "framer-motion";

export default function ReviewCards() {
  const reviews = [
    { name: "Aarti", text: "Theme cake looked premium and tasted amazing. Super smooth WhatsApp ordering!" },
    { name: "Rohan", text: "Beautiful finishing. Delivery was on time. Highly recommended for celebrations." },
    { name: "Neha", text: "Loved the cheesecake—balanced sweetness and great texture." }
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold">Reviews</h2>
      <p className="mt-2 text-[var(--muted)]">Placeholder testimonials (replace later).</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-5"
          >
            <div className="font-semibold">{r.name}</div>
            <div className="mt-2 text-sm text-[var(--muted)]">“{r.text}”</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
