import Link from "next/link";
import { TrustStrip } from "@/components/trust-strip";
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
      <TrustStrip />
      <div className="section">
        <div className="container-wide max-w-2xl text-center">
          <div className="w-12 h-12 rounded-full border border-green-700 bg-green-950/50 flex items-center justify-center mx-auto mb-6">
            <span className="text-green-400 text-xl" aria-hidden="true">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Inquiry Received</h1>
          <p className="text-slate-300 mb-2">We received your hardware quotation request.</p>
          <p className="text-slate-500 text-sm mb-10 max-w-lg mx-auto">
            Our Guangzhou sales team will review your device quantity, product interest, and shipping country, then reply with configuration advice and a written quote. This is not an order confirmation or online checkout.
          </p>

          <div className="text-left p-6 rounded-lg border border-slate-800 mb-10">
            <h2 className="font-semibold text-white mb-4">What happens next</h2>
            <ol className="space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-slate-400">
                  <span className="text-slate-500 font-medium shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp Sales
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-secondary">
              Email Sales
            </a>
            <Link href="/products" className="btn-outline">
              Back to Products
            </Link>
            <Link href="/packages" className="btn-outline">
              View Packages
            </Link>
          </div>

          <p className="text-xs text-slate-600 mt-8">
            Typical reply within one business day. Urgent requests: WhatsApp {CONTACT.whatsapp}
          </p>
        </div>
      </div>
    </>
  );
}
