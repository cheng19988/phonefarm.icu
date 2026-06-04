import Link from "next/link";
import { DOC_ARTICLES, DOC_SECTIONS } from "@/data/docs";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Documentation — Deployment and Orders",
  description:
    "PhoneFarm ICU docs: catalog overview, chassis specs, USB topology, order lifecycle, USDT payment fields, and integration placeholders.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">Documentation</h1>
        <p className="section-subtitle">
          Technical and order documentation for {SITE.name} buyers — hardware deployment specs and commerce integration reference.
        </p>

        {DOC_SECTIONS.map((section) => {
          const articles = DOC_ARTICLES.filter((a) => a.section === section);
          return (
            <section key={section} className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">{section}</h2>
              <ul className="space-y-3">
                {articles.map((doc) => (
                  <li key={doc.slug}>
                    <Link href={`/docs/${doc.slug}`} className="block card p-4 hover:border-cyan-800">
                      <span className="font-medium text-white">{doc.title}</span>
                      <p className="text-sm text-slate-400 mt-1">{doc.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
