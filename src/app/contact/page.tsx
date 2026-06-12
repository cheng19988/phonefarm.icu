import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { ContactCTA, JsonLd } from "@/components/shared";
import { CONTACT, SITE } from "@/lib/config";
import { ContentHero } from "@/components/content/content-hero";
import { resolveProductInterest } from "@/lib/inquiry";
import { contactPageJsonLd } from "@/lib/seo";
const SUPPORT_TYPES = [
  { title: "Written BOM / quote", desc: "Multi-rack, motherboard density, accessories, and export freight in a proforma-style quotation." },
  { title: "Catalog SKU matching", desc: "Map your device list (Samsung, Oppo, Xiaomi, Pixel, etc.) to rack slots and cables." },
  { title: "Procurement specs", desc: "MOQ, lead time, packing, QC photos, warranty, and USDT/T/T payment terms." },
  { title: "Rackmount & enterprise", desc: "2U rows, PSU bus sizing, cooling, and 42U custom cabinet layouts." },
  { title: "Knowledge base & docs", desc: "Setup guides, spec quick reference, and installation checklists in English." },
];

const BEFORE_CONTACT = [
  "Product SKU or package interest",
  "Quantity / node count",
  "Platform (Android, iPhone, motherboard)",
  "Connection mode (USB/ADB vs LAN)",
  "Shipping country and budget (optional)",
];

type ContactPageProps = {
  searchParams: Promise<{ product?: string; service?: string; message?: string; inquiry_error?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const productKey = params.product || params.service || "";
  const defaultProductInterest = productKey ? resolveProductInterest(productKey) : "";
  const defaultMessage = params.message?.trim() ?? "";
  const inquiryError = params.inquiry_error?.trim();

  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <ContentHero
        eyebrow="RFQ · Guangzhou Factory"
        title="Request a Hardware Quote"
        subtitle={`Catalog + procurement site for phone farm racks, motherboard boxes, and accessories from ${SITE.location}. Submit the form for a written quote — configuration and final price are confirmed before any USDT payment.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#inquiry-form" className="btn-accent px-7 py-3">Request a Quote</Link>
          <Link href="/products" className="btn-secondary px-7 py-3">Browse Catalog</Link>
          <Link href="/register" className="btn-outline-dark px-7 py-3">Register to Order</Link>
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

              <section id="email" className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 scroll-mt-24">
                <h2 className="font-bold text-[var(--text)] mb-3">Direct Contact</h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Contact panel (bottom-right) or reach us directly:
                </p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2">
                  <li>Telegram: {CONTACT.telegram}</li>
                  <li>WhatsApp: {CONTACT.whatsapp}</li>
                  <li>Email: {CONTACT.email} (click the mail icon bottom-right to copy)</li>
                </ul>
              </section>

              <section className="p-5 rounded-2xl border border-[var(--border)] bg-white">
                <h2 className="font-bold text-[var(--text)] mb-3">Before You Contact Us</h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">Include these details for a faster reply:</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2">
                  {BEFORE_CONTACT.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--brand)] shrink-0">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-5 rounded-2xl border border-[var(--brand)]/20 bg-[var(--surface-muted)]/40">
                <h2 className="font-bold text-[var(--text)] mb-2">Buyer Pre-Sale Checklist</h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Dimensions, weight, power, models, lead time, packaging, warranty, pre-shipment photos, and remote setup — answered in one doc.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/docs/hardware-spec-quick-reference" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                    Spec Quick Reference
                  </Link>
                  <span className="text-[var(--text-subtle)]">·</span>
                  <Link href="/faq" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                    FAQ
                  </Link>
                </div>
              </section>
            </div>

            <div id="inquiry-form" className="lg:col-span-3 scroll-mt-28">
              <h2 className="text-xl font-bold text-[var(--text)] mb-2">RFQ Form</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                All fields marked * are required. Form HTML is server-rendered for search engines and no-JS access.
              </p>
              {inquiryError && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4" role="alert">
                  {inquiryError}
                </p>
              )}
              <InquiryForm
                sourcePage="/contact"
                submitLabel="Request Bulk Quote"
                defaultProductInterest={defaultProductInterest}
                defaultMessage={defaultMessage}
              />
            </div>
          </div>

          <div className="mt-16">
            <ContactCTA title="Prefer to Order Online?" variant="order" />
          </div>
        </div>
      </div>
    </>
  );
}
