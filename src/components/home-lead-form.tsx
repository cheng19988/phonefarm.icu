import { InquiryForm } from "@/components/inquiry-form";

export function HomeLeadForm() {
  return (
    <section className="section">
      <div className="container-hero max-w-3xl">
        <h2 className="text-2xl font-bold text-[var(--text)] text-center mb-2">Bulk Quote &amp; Custom Configuration</h2>
        <p className="text-[var(--text-muted)] text-center mb-8 text-sm">
          Catalog + procurement site for phone farm hardware from Guangzhou. Submit your node count, platform, and
          shipping country for a written BOM-style quote — final configuration and price confirmed before any USDT
          payment. Sample orders available after sales confirmation.
        </p>
        <InquiryForm sourcePage="/" submitLabel="Request Bulk Quote" />
      </div>
    </section>
  );
}
