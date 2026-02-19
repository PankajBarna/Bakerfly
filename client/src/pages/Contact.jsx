import Container from "../components/layout/Container.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Textarea from "../components/ui/Textarea.jsx";
import { useSettings } from "../hooks/useSettings.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiPost } from "../lib/api.js";
import { track } from "../lib/track.js";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(8, "Enter phone"),
  fulfillment: z.enum(["delivery", "pickup"]).default("delivery"),
  area: z.string().optional().default(""),
  preferred_date: z.string().optional().default(""),
  message: z.string().optional().default("")
});

export default function Contact() {
  const { settings } = useSettings();
  const wa = `https://wa.me/${settings.business.whatsappNumber}`;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fulfillment: "delivery" }
  });

  async function onSubmit(values) {
    await apiPost("/api/lead", values);
    track("click", "/contact", { action: "lead_submitted" });
    reset();
    alert("✅ Thanks! We received your details. We’ll contact you soon.");
  }

  return (
    <Container className="py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Contact</h1>
          <p className="mt-2 text-[var(--muted)]">
            WhatsApp and calls welcome. Service area: <b>{settings.business.serviceArea}</b>. Pickup: <b>{settings.business.location}</b>.
          </p>

          <div className="mt-5 flex gap-3">
            <Button as="a" href={wa} target="_blank" rel="noreferrer" variant="brand" className="px-6 py-3">
              WhatsApp
            </Button>
            <Button as="a" href={`tel:${settings.business.whatsappNumber}`} variant="outline" className="px-6 py-3">
              Call
            </Button>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] font-semibold">Map (placeholder)</div>
            <div className="aspect-[16/10]">
              <iframe
                title="Map placeholder"
                className="w-full h-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.95%2C19.15%2C73.05%2C19.25&layer=mapnik"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] p-6">
          <div className="font-semibold text-xl">Quick enquiry</div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Leave details and we’ll message you back.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input label="Name" placeholder="Your name" {...register("name")} />
              {errors.name ? <div className="text-xs text-red-600 mt-1">{errors.name.message}</div> : null}
            </div>
            <div>
              <Input label="Phone" placeholder="WhatsApp number preferred" {...register("phone")} />
              {errors.phone ? <div className="text-xs text-red-600 mt-1">{errors.phone.message}</div> : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Delivery / Pickup</label>
                <select
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                  {...register("fulfillment")}
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>
              <Input label="Area" placeholder="Thane area" {...register("area")} />
            </div>

            <Input label="Preferred date/time" placeholder="e.g., 24 Feb, evening" {...register("preferred_date")} />
            <Textarea label="Message" placeholder="Theme idea / size / eggless / any notes…" {...register("message")} />

            <Button disabled={isSubmitting} variant="brand" className="w-full py-3">
              {isSubmitting ? "Sending…" : "Submit"}
            </Button>
          </form>
        </div>
      </div>

      <div className="h-24 md:h-4" />
    </Container>
  );
}
