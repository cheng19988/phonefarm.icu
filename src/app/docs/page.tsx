import Link from "next/link";
import { TrustStrip } from "@/components/trust-strip";
import { ContentHero } from "@/components/content/content-hero";
import { DOC_ARTICLES, DOC_SECTIONS } from "@/data/docs";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Buyer Docs — Order & Deployment Guides",
  description:
    "PhoneFarm ICU buyer docs: how to buy, USDT payment, shipping, warranty, rack configuration, and bulk order process.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <>
      <ContentHero
        eyebrow="Order Guides"
        title="Buyer Docs"
        subtitle={`Step-by-step guides for ordering phone farm hardware from ${SITE.name} — register, buy, pay with USDT after confirmation, and receive export shipment.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/docs/buying-guide" className="btn-primary px-7 py-3">How to Buy</Link>
          <Link href="/docs/usdt-payment-guide" className="btn-outline px-7 py-3">USDT Payment</Link>
        </div>
      </ContentHero>
      <TrustStrip variant="light" />

      <div className="section section-light">
        <div className="container-hero max-w-4xl">
          {DOC_SECTIONS.map((section) => {
            const articles = DOC_ARTICLES.filter((a) => a.section === section);
            return (
              <section key={section} className="mb-12">
                <h2 className="text-lg font-bold text-[var(--text)] mb-5 pb-2 border-b border-[var(--border)]">{section}</h2>
                <ul className="space-y-3">
                  {articles.map((doc) => (
                    <li key={doc.slug}>
                      <Link href={`/docs/${doc.slug}`} className="card card-hover p-5 block">
                        <span className="font-semibold text-[var(--text)]">{doc.title}</span>
                        <p className="text-sm text-[var(--text-muted)] mt-1">{doc.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
