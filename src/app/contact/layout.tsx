import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sales — Request a Hardware Quote",
  description:
    "Request a quote for phone farm racks, motherboard boxes, cooling racks, and bulk deployment hardware. Guangzhou assembly team — WhatsApp, Telegram, email.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
