import Container from "../components/layout/Container.jsx";
import ProductCard from "../components/storefront/ProductCard.jsx";
import CartDrawer from "../components/storefront/CartDrawer.jsx";
import { useMenu } from "../hooks/useMenu.js";
import { siteConfig } from "../config/siteConfig.js";
import { useCart } from "../context/CartContext.jsx";

export default function Menu() {
  const { data, loading } = useMenu();
  const { setDrawerOpen } = useCart();
  const addonsCatalog = siteConfig.menu.addons;

  const categories = data.categories || [];
  const items = data.items || [];

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Menu</h1>
          <p className="mt-2 text-[var(--muted)]">
            Select items, choose quantities, add notes, then tap <b>Order Now</b> to open WhatsApp.
          </p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="hidden md:inline-flex px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-black/5"
        >
          View Order
        </button>
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-[var(--muted)]">Loading menu…</div>
      ) : (
        <div className="mt-6 space-y-10">
          {categories.map((cat) => {
            const catId = cat._id || cat.id;
            const catItems = items.filter((it) => String(it.category_id) === String(catId));
            if (!catItems.length) return null;

            return (
              <section key={catId}>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl sm:text-2xl font-semibold">{cat.name}</h2>
                  <div className="text-sm text-[var(--muted)]">{catItems.length} items</div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catItems.map((item) => (
                    <ProductCard key={item._id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <CartDrawer addonsCatalog={addonsCatalog} />
      <div className="h-24 md:h-6" />
    </Container>
  );
}
