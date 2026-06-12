import Link from "next/link";
import type { ProductSeed } from "@/data/products";
import { buildProcurementFacts } from "@/lib/product-procurement";

type Props = { seed: ProductSeed };

/** Server-rendered B2B procurement block for product detail pages. */
export function ProductProcurementPanel({ seed }: Props) {
  const facts = buildProcurementFacts(seed);

  return (
    <section
      id="procurement"
      className="p-5 md:p-6 rounded-xl border border-[var(--border)] bg-white"
      aria-label="Procurement and shipping information"
    >
      <h2 className="text-lg font-bold text-[var(--text)] mb-1">Procurement Information</h2>
      <p className="text-xs text-[var(--text-subtle)] mb-4">
        Reference terms for B2B buyers — final figures confirmed in your written quotation.
      </p>
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        {facts.map(({ label, value }) => (
          <div key={label}>
            <dt className="font-semibold text-[var(--text)]">{label}</dt>
            <dd className="text-[var(--text-muted)] mt-1 leading-relaxed">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-xs text-[var(--text-subtle)] mt-4">
        Full pre-sale checklist:{" "}
        <Link href="/docs/hardware-spec-quick-reference" className="text-[var(--brand)] hover:underline">
          Hardware Spec Quick Reference
        </Link>
      </p>
    </section>
  );
}
