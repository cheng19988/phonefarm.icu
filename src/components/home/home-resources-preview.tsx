import Link from "next/link";
import { KB_ARTICLES } from "@/data/knowledge-base";
import { FAQ_ITEMS } from "@/data/faq";
import { DOC_ARTICLES } from "@/data/docs";
import { SectionHeader } from "@/components/ui/section-header";

export function HomeResourcesPreview() {
  const kb = [
    ...KB_ARTICLES.filter((a) => a.slug === "remote-control-setup-guide" || a.slug === "rack-maintenance-guide"),
    ...KB_ARTICLES,
  ]
    .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i)
    .slice(0, 4);
  const faq = FAQ_ITEMS.slice(0, 3);
  const docs = [
    DOC_ARTICLES.find((d) => d.slug === "order-api-placeholder"),
    ...DOC_ARTICLES,
  ]
    .filter((d): d is (typeof DOC_ARTICLES)[number] => !!d)
    .filter((d, i, arr) => arr.findIndex((x) => x.slug === d.slug) === i)
    .slice(0, 4);

  return (
    <section className="section-compact">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Resources"
          title="Guides, Docs & FAQ"
          subtitle="Setup checklists, buying guides, and answers before you place a bulk order."
        />
        <div className="grid lg:grid-cols-3 gap-6 mt-4">
          <div className="card p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">Knowledge Base</h3>
            <ul className="space-y-3 text-sm">
              {kb.map((a) => (
                <li key={a.slug}>
                  <Link href={`/knowledge-base/${a.slug}`} className="text-[var(--text-muted)] hover:text-[var(--brand)]">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/knowledge-base" className="inline-block mt-4 text-sm font-medium text-[var(--brand)]">All articles</Link>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">Documentation</h3>
            <ul className="space-y-3 text-sm">
              {docs.map((d) => (
                <li key={d.slug}>
                  <Link href={`/docs/${d.slug}`} className="text-[var(--text-muted)] hover:text-[var(--brand)]">
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/docs" className="inline-block mt-4 text-sm font-medium text-[var(--brand)]">All docs</Link>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">FAQ</h3>
            <ul className="space-y-3 text-sm">
              {faq.map((f) => (
                <li key={f.question}>
                  <Link href="/faq" className="text-[var(--text-muted)] hover:text-[var(--brand)]">
                    {f.question}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/faq" className="inline-block mt-4 text-sm font-medium text-[var(--brand)]">Full FAQ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
