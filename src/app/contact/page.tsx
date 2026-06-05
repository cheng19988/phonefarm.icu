import { InquiryForm } from "@/components/inquiry-form";
import { ContactBar } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { SITE } from "@/lib/config";

export default function ContactPage() {
  return (
    <>
      <TrustStrip />
      <div className="section">
        <div className="container-wide max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Sales</h1>
          <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Request a hardware quotation from our {SITE.location} team. Include device quantity, product interest, and shipping country. We review each inquiry for rack layout, compatibility, and freight before sending a written quote.
          </p>

          <div className="p-6 rounded-lg border border-slate-800 mb-8">
            <h2 className="font-bold text-white mb-2">Direct Contact</h2>
            <p className="text-slate-500 text-sm mb-4">WhatsApp is fastest for urgent configuration questions. Email works well for spec attachments.</p>
            <ContactBar />
          </div>

          <InquiryForm sourcePage="/contact" />
        </div>
      </div>
    </>
  );
}
