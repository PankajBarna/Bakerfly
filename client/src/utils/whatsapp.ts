type Customer = {
  name: string;
  date: string;
  fulfillment: "delivery" | "pickup";
  area: string;
  address: string;
  notes: string;
};

type SelectedItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  qty: number;
  note?: string;
};

type BusinessInfo = {
  name: string;
  location: string;
  whatsappNumber: string;
};

export function generateWhatsAppMessage(params: {
  customer: Customer;
  selectedItems: SelectedItem[];
  addons?: { name: string; price: number; qty: number }[];
  total: number;
  businessInfo: BusinessInfo;
}) {
  const { customer, selectedItems, addons = [], total, businessInfo } = params;

  const lines: string[] = [];
  lines.push(`Hello ${businessInfo.name} 👋`);
  lines.push(`I’d like to place an order:`);

  lines.push(``);
  lines.push(`👤 Name: ${customer.name || "-"}`);
  lines.push(`📦 Fulfillment: ${customer.fulfillment}`);
  lines.push(`🗓️ Date/Time: ${customer.date || "-"}`);
  lines.push(`📍 Area: ${customer.area || "-"}`);
  lines.push(`🏠 Address: ${customer.address || "-"}`);

  lines.push(``);
  lines.push(`🍰 Items:`);
  selectedItems.forEach((it, i) => {
    const lineTotal = it.price * it.qty;
    lines.push(`${i + 1}) ${it.name} — ${it.qty} ${it.unit} × ₹${it.price} = ₹${lineTotal}`);
    if (it.note?.trim()) lines.push(`   • Note: ${it.note.trim()}`);
  });

  if (addons.length) {
    lines.push(``);
    lines.push(`✨ Add-ons:`);
    addons.forEach((a, i) => {
      const lineTotal = a.price * a.qty;
      lines.push(`${i + 1}) ${a.name} — ${a.qty} × ₹${a.price} = ₹${lineTotal}`);
    });
  }

  lines.push(``);
  lines.push(`💰 Grand Total: ₹${total}`);
  lines.push(`📝 Overall Notes: ${customer.notes?.trim() || "-"}`);

  lines.push(``);
  lines.push(`Please confirm availability. Thank you!`);

  const message = lines.join("\n");
  // CRITICAL: encodeURIComponent is correct here
  return encodeURIComponent(message);
}
