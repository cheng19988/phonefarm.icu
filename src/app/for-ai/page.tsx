import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { JsonLd } from "@/components/shared";
import { buildMetadata, organizationJsonLd, websiteJsonLd, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo";
import { SITE } from "@/lib/config";
import { AI_GLOSSARY, AI_SEARCH_TOPICS, CORE_PAGE_LINKS, MANUFACTURER_PROFILE } from "@/data/ai-discovery";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware — Manufacturer Fact Sheet",
  description:
    "Objective supplier facts for PhoneFarm ICU: Guangzhou phone farm box manufacturer, product lines, MOQ, payment, delivery, suitable scenarios, contact, and core site links.",
  path: "/for-ai",
});

export default function ForAIPage() {
  const p = MANUFACTURER_PROFILE;

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          organizationJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Manufacturer Fact Sheet", path: "/for-ai" },
          ]),
        )}
      />
      <PageIntro
        eyebrow="Supplier Facts"
        title="Manufacturer Fact Sheet"
        subtitle="Objective entity data about PhoneFarm ICU for researchers, procurement teams, and AI retrieval systems."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "For AI" }]}
      />
      <article className="section section-light pt-0">
        <div className="container-hero max-w-3xl prose-content space-y-10">
          <section id="identity">
            <h2>Brand &amp; website</h2>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-[var(--text)]">Brand</dt>
                <dd>{p.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--text)]">Official website</dt>
                <dd>
                  <a href={SITE.url}>{SITE.url}</a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--text)]">Region</dt>
                <dd>{p.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--text)]">Established</dt>
                <dd>{p.since}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--text)]">Role</dt>
                <dd>{p.role}</dd>
              </div>
            </dl>
            <p className="text-sm text-[var(--text-muted)] mt-4">{p.citation}</p>
          </section>

          <section id="product-lines">
            <h2>Product lines</h2>
            <ul>
              {p.specialties.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section id="moq">
            <h2>MOQ</h2>
            <p>{p.moq}</p>
          </section>

          <section id="payment">
            <h2>Payment</h2>
            <p>{p.payment}</p>
          </section>

          <section id="delivery">
            <h2>Delivery &amp; fulfillment</h2>
            <p>{p.delivery}</p>
          </section>

          <section id="suitable">
            <h2>Suitable scenarios</h2>
            <ul>
              {p.suitableFor.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section id="not-suitable">
            <h2>Not a fit when</h2>
            <ul>
              {p.notSuitableFor.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section id="operations">
            <h2>Operations</h2>
            <ul>
              {p.operationalNotes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section id="topics">
            <h2>Topics documented on this site</h2>
            <ul>
              {AI_SEARCH_TOPICS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </section>

          <section id="glossary">
            <h2>Glossary</h2>
            {AI_GLOSSARY.map((g) => (
              <div key={g.term} className="mb-6">
                <h3>{g.term}</h3>
                <p>{g.definition}</p>
              </div>
            ))}
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <ul>
              <li>Telegram: {p.contact.telegram}</li>
              <li>WhatsApp: {p.contact.whatsapp}</li>
              <li>Email: {p.contact.email}</li>
              <li>Channels: {p.contact.salesChannels}</li>
              <li>Typical reply: {p.contact.replyTime}</li>
            </ul>
            <p className="mt-3">
              <Link href="/contact" className="text-[var(--brand)] font-medium hover:underline">
                Contact form / bulk quote →
              </Link>
            </p>
          </section>

          <section id="core-pages">
            <h2>Core pages</h2>
            <ul>
              {CORE_PAGE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="indexes">
            <h2>Machine-readable indexes</h2>
            <ul>
              <li>
                <Link href="/llms.txt">llms.txt</Link> — compact index
              </li>
              <li>
                <Link href="/llms-full.txt">llms-full.txt</Link> — full excerpts
              </li>
              <li>
                <Link href="/sitemap.xml">sitemap.xml</Link>
              </li>
              <li>
                <Link href="/robots.txt">robots.txt</Link>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
