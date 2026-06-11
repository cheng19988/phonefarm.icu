import Link from "next/link";
import { SITE } from "@/lib/config";
import { AI_GLOSSARY } from "@/data/ai-discovery";

/** Visible manufacturer + glossary block — quotable by AI crawlers and humans */
export function ManufacturerFacts() {
  const terms = AI_GLOSSARY.slice(0, 4);

  return (
    <section className="section-compact" aria-label="Phone farm hardware manufacturer facts">
      <div className="container-hero max-w-4xl">
        <div className="card p-6 md:p-8">
          <p className="eyebrow mb-2">Guangzhou Manufacturer · Since {SITE.since}</p>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-3">
            {SITE.name} — Phone Farm Box & Rack Hardware Supplier
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
            Factory-direct catalog for box phone farms, motherboard boxes, USB hubs, power supplies, cooling modules,
            network equipment, and custom cabinets. Real-device racks — not cloud phone subscriptions.
          </p>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            {terms.map((g) => (
              <div key={g.term}>
                <dt className="font-medium text-[var(--text)]">{g.term}</dt>
                <dd className="text-[var(--text-muted)] mt-1 leading-relaxed">{g.definition}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-[var(--text-subtle)] mt-4">
            <Link href="/for-ai" className="text-[var(--brand)] hover:underline">
              AI / researcher fact sheet
            </Link>
            {" · "}
            <Link href="/llms.txt" className="text-[var(--brand)] hover:underline">
              llms.txt
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
