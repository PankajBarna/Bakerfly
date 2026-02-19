import Button from "../ui/Button.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function ProductCard({ item }) {
  const { items, upsertItem, setDrawerOpen } = useCart();
  const inCart = items.find((x) => x.id === item._id);
  const qty = inCart?.qty || 0;

  const min = item.min_qty ?? 1;
  const step = item.step ?? 1;

  function inc() {
    const next = qty === 0 ? min : +(qty + step);
    upsertItem({ id: item._id, name: item.name, price: item.price, unit: item.unit }, next, inCart?.note || "");
  }
  function dec() {
    const next = +(qty - step);
    upsertItem({ id: item._id, name: item.name, price: item.price, unit: item.unit }, next, inCart?.note || "");
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow)]">
      <div className="aspect-[4/3] bg-black/5">
        <img
          src={item.image_url || "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80"}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-[var(--muted)] line-clamp-2">{item.desc}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">₹{item.price}</div>
            <div className="text-xs text-[var(--muted)]">per {item.unit}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="px-3" onClick={dec} aria-label="Decrease quantity">−</Button>
            <div className="min-w-[56px] text-center text-sm">
              {qty || 0} <span className="text-[var(--muted)]">{item.unit}</span>
            </div>
            <Button variant="outline" className="px-3" onClick={inc} aria-label="Increase quantity">+</Button>
          </div>

          <Button variant="brand" onClick={() => setDrawerOpen(true)}>
            Customize & Order
          </Button>
        </div>
      </div>
    </div>
  );
}
