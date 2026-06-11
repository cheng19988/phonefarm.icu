import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { ContactCTA } from "@/components/shared";
import { CONTACT } from "@/lib/config";
import { ContentHero } from "@/components/content/content-hero";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Contact Sales ? Orders, Quotes & Support",
  description: "Contact PhoneFarm ICU sales for bulk quotes, compatibility checks, shipping estimates, and order support from Guangzhou.",
  path: "/contact",
});

const SUPPORT_TYPES = [
  { title: "Product order support", desc: "Questions about catalog SKUs, packages, and online orders." },
  { title: "Bulk quote", desc: "Multi-rack, custom cabinet, and project pricing." },
  { title: "Compatibility check", desc: "Device model list review for slot and cable matching." },
  { title: "Shipping estimate", desc: "Express or sea freight from Guangzhou by destination." },
  { title: "After-sales support", desc: "Replacement parts, warranty, and remote diagnostics." },
];

const BEFORE_CONTACT = [
  "Product model or SKU interest",
  "Target quantity (sample or bulk)",
  "Shipping country",
  "Device type (Android / iPhone / motherboard)",
  "Payment preference (USDT / T/T / other)",
];

export default function ContactPage() {
  return (
    <>
      <ContentHero
        eyebrow="Sales & Support"
        title="Contact Guangzhou Sales"
        subtitle={`Order support, bulk quotes, and configuration advice from ${SITE.location}. You can also shop and register to order online ? inquiry is for custom projects and bulk pricing.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn-accent px-7 py-3">Browse Products</Link>
          <Link href="/register" className="btn-primary px-7 py-3">Sign Up to Order</Link>
        </div>
      </ContentHero>
      <div className="section section-light pt-0">
        <div className="container-hero max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">How We Can Help</h2>
                <ul className="space-y-4">
                  {SUPPORT_TYPES.map((s) => (
                    <li key={s.title} className="p-4 rounded-xl border border-[var(--border)] bg-white">
                      <h3 className="font-semibold text-[var(--text)] text-sm mb-1">{s.title}</h3>
                      <p className="text-xs text-[var(--text-muted)]">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50">
                <h2 className="font-bold text-[var(--text)] mb-3">Direct Contact</h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Use the floating contact button (bottom-right) or reach us directly:
                </p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2">
                  <li>Telegram: {CONTACT.telegram}</li>
                  <li>WhatsApp: {CONTACT.whatsapp}</li>
                  <li>Email: {CONTACT.email}</li>
                </ul>
              </section>

              <section className="p-5 rounded-2xl border border-[var(--border)] bg-white">
                <h2 className="font-bold text-[var(--text)] mb-3">Before You Contact Us</h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">Include these details for a faster reply:</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2">
                  {BEFORE_CONTACT.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--brand)]">?</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-[var(--text)] mb-4">Request Bulk Quote</h2>
              <InquiryForm sourcePage="/contact" submitLabel="Request Bulk Quote" />
            </div>
          </div>

          <div className="mt-16">
            <ContactCTA title="Prefer to Order Online?" />
          </div>
        </div>
      </div>
    </>
  );
}
