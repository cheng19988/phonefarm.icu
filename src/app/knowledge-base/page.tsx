import Link from "next/link";
import { KBSearch } from "@/components/kb-search";
import { KB_ARTICLES, KB_CATEGORIES } from "@/data/knowledge-base";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Knowledge Base — Phone Farm Hardware Guides",
  description:
    "PhoneFarm ICU knowledge base: phone farm box setup, motherboard boxes, power, cooling, network, remote control, shipping, and troubleshooting.",
  path: "/knowledge-base",
});

export default function KnowledgeBasePage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Knowledge Base</h1>
        <p className="section-subtitle max-w-3xl">
          Hardware deployment guides for {SITE.name} customers — setup, maintenance, and operations for real-device phone farms from {SITE.location}.
        </p>

        <KBSearch articles={KB_ARTICLES} />

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-3">Categories</h2>
            <ul className="space-y-2 text-sm">
              {KB_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a href={`#${cat.replace(/\s+/g, "-").toLowerCase()}`} className="text-slate-400 hover:text-white">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="lg:col-span-3 space-y-10">
            {KB_CATEGORIES.map((cat) => {
              const articles = KB_ARTICLES.filter((a) => a.category === cat);
              if (!articles.length) return null;
              return (
                <section key={cat} id={cat.replace(/\s+/g, "-").toLowerCase()}>
                  <h2 className="text-xl font-bold text-white mb-4">{cat}</h2>
                  <div className="grid gap-4">
                    {articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/knowledge-base/${article.slug}`}
                        className="card p-5 hover:border-cyan-800 transition-colors block"
                      >
                        <h3 className="font-semibold text-white mb-1">{article.title}</h3>
                        <p className="text-sm text-slate-400">{article.excerpt}</p>
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
  );
}
