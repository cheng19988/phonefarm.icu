import Link from "next/link";
import { KBSearch } from "@/components/kb-search";
import { TrustStrip } from "@/components/trust-strip";
import { ContentHero } from "@/components/content/content-hero";
import { KB_ARTICLES, KB_CATEGORIES } from "@/data/knowledge-base";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Buying Knowledge Base — Phone Farm Hardware Guides",
  description:
    "PhoneFarm ICU knowledge base: rack selection, motherboard boxes, cooling, power, USDT payment, shipping, and bulk orders.",
  path: "/knowledge-base",
});

export default function KnowledgeBasePage() {
  return (
    <>
      <ContentHero
        eyebrow="Buying Guides"
        title="Buying Knowledge Base"
        subtitle={`Hardware deployment guides for ${SITE.name} buyers — rack selection, cooling, power planning, orders, and shipping from ${SITE.location}.`}
      >
        <Link href="/docs/buying-guide" className="btn-primary px-7 py-3 inline-flex">
          How to Buy
        </Link>
      </ContentHero>
      <TrustStrip variant="light" />

      <div className="section section-light">
        <div className="container-hero">
          <KBSearch articles={KB_ARTICLES} />

          <div className="grid lg:grid-cols-4 gap-10">
            <aside className="lg:col-span-1">
              <h2 className="text-sm font-semibold text-[var(--text-subtle)] uppercase mb-4">Categories</h2>
              <ul className="space-y-2 text-sm sticky top-28">
                {KB_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <a href={`#${cat.replace(/\s+/g, "-").toLowerCase()}`} className="text-[var(--text-muted)] hover:text-[var(--brand)] font-medium">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="lg:col-span-3 space-y-12">
              {KB_CATEGORIES.map((cat) => {
                const articles = KB_ARTICLES.filter((a) => a.category === cat);
                if (!articles.length) return null;
                return (
                  <section key={cat} id={cat.replace(/\s+/g, "-").toLowerCase()}>
                    <h2 className="text-xl font-bold text-[var(--text)] mb-5">{cat}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {articles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/knowledge-base/${article.slug}`}
                          className="card card-hover p-5 block h-full"
                        >
                          <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--brand)] mb-2">{article.title}</h3>
                          <p className="text-sm text-[var(--text-muted)] line-clamp-2">{article.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
