import React, { createContext, useContext, useMemo, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, name, price, unit, qty, note}
  const [addons, setAddons] = useState([]); // {id,name,price,qty}
  const [customer, setCustomer] = useState({
    name: "",
    date: "",
    fulfillment: "delivery", // delivery/pickup
    area: "",
    address: "",
    notes: ""
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  function upsertItem(item, qty, note = "") {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (qty <= 0) {
        if (idx >= 0) return prev.filter((x) => x.id !== item.id);
        return prev;
      }
      const next = [...prev];
      const payload = { id: item.id, name: item.name, price: item.price, unit: item.unit, qty, note };
      if (idx >= 0) next[idx] = payload;
      else next.push(payload);
      return next;
    });
  }

  function setAddonQty(addon, qty) {
    setAddons((prev) => {
      const idx = prev.findIndex((x) => x.id === addon.id);
      if (qty <= 0) {
        if (idx >= 0) return prev.filter((x) => x.id !== addon.id);
        return prev;
      }
      const next = [...prev];
      const payload = { id: addon.id, name: addon.name, price: addon.price, qty };
      if (idx >= 0) next[idx] = payload;
      else next.push(payload);
      return next;
    });
  }

  const totals = useMemo(() => {
    const itemsTotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const addonsTotal = addons.reduce((s, a) => s + a.price * a.qty, 0);
    return { itemsTotal, addonsTotal, grandTotal: itemsTotal + addonsTotal };
  }, [items, addons]);

  const value = {
    items,
    addons,
    customer,
    setCustomer,
    upsertItem,
    setAddonQty,
    totals,
    drawerOpen,
    setDrawerOpen
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  return useContext(CartCtx);
}
