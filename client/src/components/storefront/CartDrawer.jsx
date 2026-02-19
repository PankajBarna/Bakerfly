import { useMemo } from "react";
import Drawer from "../layout/Drawer.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useSettings } from "../../hooks/useSettings.js";
import { generateWhatsAppMessage } from "../../utils/whatsapp";
import { track } from "../../lib/track.js";

export default function CartDrawer({ addonsCatalog = [] }) {
  const { settings } = useSettings();
  const { drawerOpen, setDrawerOpen, items, addons, customer, setCustomer, totals, setAddonQty, upsertItem } = useCart();

  const waHref = useMemo(() => {
    const encoded = generateWhatsAppMessage({
      customer,
      selectedItems: items.map((it) => ({ ...it })),
      addons: addons.map((a) => ({ name: a.name, price: a.price, qty: a.qty })),
      total: totals.grandTotal,
      businessInfo: {
        name: settings.business.name,
        location: settings.business.location,
        whatsappNumber: settings.business.whatsappNumber
      }
    });
    return `https://wa.me/${settings.business.whatsappNumber}?text=${encoded}`;
  }, [customer, items, addons, totals.grandTotal, settings]);

  function orderNow() {
    track("order_intent", "/menu", { itemsCount: items.length, total: totals.grandTotal });
    window.open(waHref, "_blank", "noreferrer");
  }

  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Your Order">
      {items.length === 0 ? (
        <div className="text-sm text-[var(--muted)]">
          No items selected yet. Add items from the Menu page.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-xl border border-[var(--border)] p-3 bg-[var(--surface)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {it.qty} {it.unit} × ₹{it.price} = ₹{it.qty * it.price}
                    </div>
                  </div>
                  <button
                    className="text-sm px-2 py-1 rounded-lg hover:bg-black/5"
                    onClick={() => upsertItem(it, 0, "")}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-2">
                  <label className="text-xs text-[var(--muted)]">Item note (optional)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                    value={it.note || ""}
                    onChange={(e) => {
                      upsertItem(it, it.qty, e.target.value);
                    }}
                    placeholder="e.g., less sweet, eggless, write message on cake..."
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--border)] p-3 bg-[var(--surface)]">
            <div className="font-semibold mb-2">Add-ons</div>
            <div className="space-y-2">
              {addonsCatalog.map((a) => {
                const inCart = addons.find((x) => x.id === a.id);
                const qty = inCart?.qty || 0;
                return (
                  <div key={a.id} className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm">{a.name}</div>
                      <div className="text-xs text-[var(--muted)]">₹{a.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-black/5" onClick={() => setAddonQty(a, qty - 1)}>
                        −
                      </button>
                      <div className="w-8 text-center text-sm">{qty}</div>
                      <button className="px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-black/5" onClick={() => setAddonQty(a, qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] p-3 bg-[var(--surface)]">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-[var(--muted)]">Items total</div>
              <div className="text-right">₹{totals.itemsTotal}</div>
              <div className="text-[var(--muted)]">Add-ons total</div>
              <div className="text-right">₹{totals.addonsTotal}</div>
              <div className="font-semibold">Grand total</div>
              <div className="text-right font-semibold">₹{totals.grandTotal}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] p-3 bg-[var(--surface)]">
            <div className="font-semibold mb-2">Your details</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Your name" />
              <Input label="Preferred date/time" value={customer.date} onChange={(e) => setCustomer({ ...customer, date: e.target.value })} placeholder="e.g. 24 Feb, 6pm" />
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Delivery / Pickup</label>
                <div className="mt-2 flex gap-2">
                  <button
                    className={`px-3 py-2 rounded-xl border ${customer.fulfillment === "delivery" ? "border-[var(--brand)] bg-[rgba(184,138,122,0.10)]" : "border-[var(--border)]"} `}
                    onClick={() => setCustomer({ ...customer, fulfillment: "delivery" })}
                    type="button"
                  >
                    Delivery
                  </button>
                  <button
                    className={`px-3 py-2 rounded-xl border ${customer.fulfillment === "pickup" ? "border-[var(--brand)] bg-[rgba(184,138,122,0.10)]" : "border-[var(--border)]"} `}
                    onClick={() => setCustomer({ ...customer, fulfillment: "pickup" })}
                    type="button"
                  >
                    Pickup
                  </button>
                </div>
              </div>
              <Input label="Area" value={customer.area} onChange={(e) => setCustomer({ ...customer, area: e.target.value })} placeholder="Thane area" />
              <Input label="Address (if delivery)" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="House/Building + landmark" />
              <div className="sm:col-span-2">
                <Textarea label="Overall notes" value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} placeholder="Any notes for the order..." />
              </div>
            </div>
          </div>

          <Button variant="brand" className="w-full py-3" onClick={orderNow}>
            Order Now on WhatsApp
          </Button>

          <div className="text-xs text-[var(--muted)]">
            Tip: WhatsApp message includes items, quantities, totals, delivery/pickup, date, area/address, and notes.
          </div>
        </div>
      )}
    </Drawer>
  );
}
