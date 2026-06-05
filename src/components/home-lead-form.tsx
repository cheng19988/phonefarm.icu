import { InquiryForm } from "@/components/inquiry-form";

export function HomeLeadForm() {
  return (
    <section className="py-16 border-t border-slate-800 bg-slate-900/30">
      <div className="container-wide max-w-3xl">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Get a Hardware Recommendation</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Tell us your device count and deployment goals. Our Guangzhou sales engineers typically reply within one business day with configuration advice.
        </p>
        <InquiryForm sourcePage="/" submitLabel="Request a Quote" />
      </div>
    </section>
  );
}
