import { InquiryForm } from "@/components/inquiry-form";

export function HomeLeadForm() {
  return (
    <section className="py-16 border-t border-[var(--border)] bg-white">
      <div className="container-hero max-w-3xl">
        <h2 className="text-2xl font-bold text-[var(--text)] text-center mb-2">Bulk Quote &amp; Custom Configuration</h2>
        <p className="text-[var(--text-muted)] text-center mb-8 text-sm">
          Need a bulk quote or custom rack layout? Our Guangzhou sales team typically replies within one business day.
          You can also shop and order directly — USDT payment is available after order confirmation.
        </p>
        <InquiryForm sourcePage="/" submitLabel="Request Bulk Quote" />
      </div>
    </section>
  );
}
