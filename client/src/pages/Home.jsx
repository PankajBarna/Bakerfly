import { motion } from "framer-motion";
import Container from "../components/layout/Container.jsx";
import Button from "../components/ui/Button.jsx";
import { useSettings } from "../hooks/useSettings.js";
import { useCart } from "../context/CartContext.jsx";
import ReviewCards from "../components/storefront/ReviewCards.jsx";
import FAQ from "../components/storefront/FAQ.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function Home() {
  const { settings } = useSettings();
  const { setDrawerOpen } = useCart();

  return (
    <div>
      <section className="relative overflow-hidden">
        {/* soft animated blob */}
        <motion.div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle at 30% 30%, var(--brand2), transparent 60%)" }}
          animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle at 50% 50%, var(--brand), transparent 60%)" }}
          animate={{ x: [0, 22, 0], y: [0, -16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                <span className="text-xs text-[var(--muted)]">Luxury home bakery • Thane</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                {settings.business.name}: theme cakes that look as premium as they taste.
              </h1>

              <p className="mt-4 text-[var(--muted)] text-base sm:text-lg max-w-xl">
                Crafted for birthdays, anniversaries, and celebrations—with elegant detailing, rich flavors, and WhatsApp-first ordering.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="brand" className="px-5 py-3" onClick={() => setDrawerOpen(true)}>
                  Order on WhatsApp
                </Button>
                <Button variant="outline" className="px-5 py-3" as="a" href="/menu">
                  View Menu
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                  <div className="text-[var(--muted)]">Hours</div>
                  <div className="font-medium">{settings.business.hours}</div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                  <div className="text-[var(--muted)]">Delivery</div>
                  <div className="font-medium">{settings.business.delivery}</div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:col-span-1 col-span-2">
                  <div className="text-[var(--muted)]">Best seller</div>
                  <div className="font-medium">Theme Cakes</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[var(--border)]" style={{ background: "var(--cardGrad)" }}>
                  <div className="text-sm text-[var(--muted)]">Signature spotlight</div>
                  <div className="font-semibold text-lg">Theme Cakes • Rose-gold finish</div>
                </div>
                <div className="aspect-[16/11] bg-black/5">
                  <img
                    src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1400&q=80"
                    alt="Cake placeholder"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden sm:block rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow)] p-3">
                <div className="text-xs text-[var(--muted)]">Price range</div>
                <div className="font-semibold">₹699–₹2,999</div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <h2 className="text-2xl sm:text-3xl font-semibold">Why people love Bakerfly</h2>
            <p className="mt-2 text-[var(--muted)] max-w-2xl">
              Premium finishing, reliable delivery within Thane, and super smooth ordering over WhatsApp.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              { t: "Luxury finishing", d: "Rose-gold tones, elegant detail, consistent presentation." },
              { t: "WhatsApp-first", d: "Choose items, add notes, and send a perfect message instantly." },
              { t: "Thane service area", d: "Delivery + pickup, clear timings, quick confirmations." }
            ].map((x) => (
              <motion.div key={x.t} variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-5">
                <div className="font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-[var(--muted)]">{x.d}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <ReviewCards />
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <FAQ />
        </Container>
      </section>
    </div>
  );
}
