import { MessageCircle, PhoneCall } from "lucide-react";
import Button from "../ui/Button.jsx";
import { useSettings } from "../../hooks/useSettings.js";
import { useCart } from "../../context/CartContext.jsx";

export default function MobileCtaBar() {
  const { settings } = useSettings();
  const { setDrawerOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow)] rounded-2xl p-2 flex gap-2">
          <Button variant="brand" className="flex-1" onClick={() => setDrawerOpen(true)}>
            <MessageCircle className="w-4 h-4" />
            Order Now
          </Button>
          <Button
            as="a"
            href={`tel:${settings.business.whatsappNumber}`}
            className="flex-1"
            variant="outline"
          >
            <PhoneCall className="w-4 h-4" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}
