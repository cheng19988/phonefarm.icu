import Link from "next/link";
import { FAQAccordion } from "@/components/commerce";
import { SpecTable } from "@/components/products/spec-table";
import { PAYMENT } from "@/lib/config";
import type { ProductSeed } from "@/data/products";

type Props = {
  slug: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  scenarios: string[];
  faq: { q: string; a: string }[];
  referenceLabels: string[];
  seed: ProductSeed | undefined;
};

export function ProductDetailSections({
  slug,
  description,
  features,
  specs,
  scenarios,
  faq,
  referenceLabels,
  seed,
}: Props) {
  return (
    <div className="space-y-12 max-w-3xl">
      <section>
        <h2 className="text-xl font-bold text-[var(--text)] mb-3">About This Product</h2>
        <p className="text-[var(--text-muted)] leading-relaxed mb-5">{description}</p>
        {features.length > 0 && (
          <ul className="grid sm:grid-cols-2 gap-2">
            {features.slice(0, 6).map((f) => (
              <li key={f} className="text-sm text-[var(--text-muted)] flex gap-2 p-3 rounded-lg bg-[var(--surface-muted)]">
                <span className="text-[var(--accent)] shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="specs">
        <SpecTable specs={specs} title="Specifications" />
      </section>

      {referenceLabels.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[var(--text)] mb-3">Reference Configurations</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Available factory board layouts for this product line. Your final quote confirms slot count and cable plan.
          </p>
          <div className="flex flex-wrap gap-2">
            {referenceLabels.map((label) => (
              <span
                key={label}
                className="text-sm px-3 py-1.5 rounded-full border border-[var(--border)] bg-white text-[var(--text-muted)]"
              >
                {label}
              </span>
            ))}
          </div>
        </section>
      )}

      {scenarios.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[var(--text)] mb-3">Typical Use Cases</h2>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {scenarios.map((s) => (
              <li key={s} className="border-l-2 border-[var(--brand)] pl-3">
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {seed && seed.compatibilityNotes.length > 0 && (
        <section className="p-5 rounded-xl border border-[var(--border)] bg-white">
          <h2 className="text-lg font-bold text-[var(--text)] mb-3">Before You Order</h2>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {seed.compatibilityNotes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
          <Link href={`/contact?product=${slug}`} className="inline-block mt-4 text-sm text-[var(--brand)] font-medium hover:underline">
            Request compatibility check →
          </Link>
        </section>
      )}

      <section className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/60">
        <h2 className="text-lg font-bold text-[var(--text)] mb-3">Shipping, Warranty &amp; Payment</h2>
        <ul className="space-y-2 text-sm text-[var(--text-muted)]">
          {(seed?.packingNotes ?? []).slice(0, 3).map((n) => (
            <li key={n}>— {n}</li>
          ))}
          {(seed?.afterSales ?? []).slice(0, 2).map((n) => (
            <li key={n}>— {n}</li>
          ))}
          <li>
            — USDT ({PAYMENT.network}) after order confirmation ·{" "}
            <Link href="/docs/usdt-payment-guide" className="text-[var(--brand)] hover:underline">
              payment guide
            </Link>
          </li>
        </ul>
      </section>

      {faq.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[var(--text)] mb-4">FAQ</h2>
          <FAQAccordion items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
        </section>
      )}
    </div>
  );
}
