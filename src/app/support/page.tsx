import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { ContentHero } from "@/components/content/content-hero";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Support Center - Orders, Payment & Hardware Help",
  description:
    "PhoneFarm ICU support for orders, USDT payment, shipping, warranty, compatibility, and bulk quotes from Guangzhou.",
  path: "/support",
});

const SUPPORT_BLOCKS = [
  { title: "Pre-sale spec guide", desc: "Dimensions, weight, voltage, power draw, models, lead time, packaging, and warranty in one place.", href: "/docs/hardware-spec-quick-reference", cta: "Spec Quick Reference" },
  { title: "Order support", desc: "Help with sample orders, account orders, and payment status after sales confirmation.", href: "/account/orders", cta: "My Orders" },
  { title: "Payment support", desc: "USDT (TRC20) payment after order confirmation - sales team confirms payment.", href: "/docs/usdt-payment-guide", cta: "USDT Guide" },
  { title: "Shipping support", desc: "Export packing, pre-shipment photos, MOQ, express vs sea freight.", href: "/docs/packing-and-pre-shipment-photos", cta: "Packing & Photos" },
  { title: "Warranty support", desc: "Hardware warranty, replacement parts, and remote diagnostics.", href: "/docs/warranty-guide", cta: "Warranty Guide" },
  { title: "Product compatibility", desc: "Supported phone models, one-PC multi-rack limits, and slot matching.", href: "/knowledge-base/supported-device-compatibility", cta: "Device Compatibility" },
  { title: "Bulk quote support", desc: "Custom racks, packages, and enterprise deployment quotes.", href: "/contact", cta: "Contact Sales" },
];

export default function SupportPage() {
  return (
    <>
      <ContentHero
        eyebrow="Support Center"
        title="Order & Hardware Support"
        subtitle={`${SITE.name} support covers online orders, USDT payment, shipping, warranty, and bulk quotes - direct from our Guangzhou team.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-accent px-7 py-3">Request a Quote</Link>
          <Link href="/products" className="btn-secondary px-7 py-3">Browse Catalog</Link>
          <Link href="/register" className="btn-outline-dark px-7 py-3">Register to Order</Link>
        </div>
      </ContentHero>

      <div className="section section-light pt-0">
        <div className="container-hero">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {SUPPORT_BLOCKS.map((block) => (
              <article key={block.title} className="card card-hover p-6 flex flex-col">
                <h2 className="font-bold text-[var(--text)] mb-2">{block.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mb-4 flex-1">{block.desc}</p>
                <Link href={block.href} className="text-sm font-semibold text-[var(--brand)] hover:underline">
                  {block.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            <Link href="/docs/buying-guide" className="card card-hover p-5 text-center">
              <p className="font-semibold text-[var(--text)]">How to Buy</p>
            </Link>
            <Link href="/faq" className="card card-hover p-5 text-center">
              <p className="font-semibold text-[var(--text)]">FAQ</p>
            </Link>
            <Link href="/knowledge-base" className="card card-hover p-5 text-center">
              <p className="font-semibold text-[var(--text)]">Knowledge Base</p>
            </Link>
          </div>

          <ContactCTA title="Need Help Choosing Hardware?" />
        </div>
      </div>
    </>
  );
}
