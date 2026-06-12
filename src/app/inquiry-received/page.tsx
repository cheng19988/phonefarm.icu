import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Inquiry Received",
  description: "Your hardware quotation request was received by PhoneFarm ICU sales team in Guangzhou.",
  path: "/inquiry-received",
  noIndex: true,
});

const STEPS = [
  "Review your device quantity and product interest",
  "Confirm rack, box, or accessory configuration",
  "Prepare hardware quotation and shipping estimate",
  "Confirm production and delivery details",
];

export default function InquiryReceivedPage() {
  return (
    <>
      <div className="section section-light">
        <div className="container-hero max-w-2xl text-center">
          <div className="w-14 h-14 rounded-full border-2 border-green-200 bg-green-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-2xl" aria-hidden="true">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-3">Inquiry Received</h1>
          <p className="text-[var(--text-muted)] mb-2">We received your hardware quotation request.</p>
          <p className="text-[var(--text-subtle)] text-sm mb-10 max-w-lg mx-auto">
            Our Guangzhou sales team will review your requirements and reply with configuration advice and a written quote. You can also shop and order directly from the catalog.
          </p>

          <div className="text-left p-6 rounded-2xl border border-[var(--border)] bg-white mb-10">
            <h2 className="font-semibold text-[var(--text)] mb-4">What happens next</h2>
            <ol className="space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--brand)] font-bold shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-accent">
              WhatsApp Sales
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-secondary">
              Email Sales
            </a>
            <Link href="/products" className="btn-secondary">
              Browse Catalog
            </Link>
            <Link href="/register" className="btn-outline-dark">
              Register to Order
            </Link>
          </div>

          <p className="text-xs text-[var(--text-subtle)] mt-8">
            Typical reply within one business day. Urgent requests: WhatsApp {CONTACT.whatsapp}
          </p>
        </div>
      </div>
    </>
  );
}
