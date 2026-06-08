import Link from "next/link";
import { FAQAccordion } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { HomeLeadForm } from "@/components/home-lead-form";
import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FactoryTrustSection } from "@/components/home/factory-trust-section";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { SITE } from "@/lib/config";
import { listCatalogProducts } from "@/lib/catalog";
import { PRICING_TIERS } from "@/data/pricing";

export const metadata = buildMetadata({
  title: SITE.headline,
  description: SITE.description,
  path: "/",
});

const ADVANTAGES = [
  {
    title: "Guangzhou Factory Direct",
    desc: "Real-device racks and boxes assembled and QC'd in our Guangzhou workshop — not reseller markup.",
  },
  {
    title: "Reference USD Pricing",
    desc: "Published catalog prices with Buy Now path. Bulk and custom projects quoted by sales.",
  },
  {
    title: "Full Hardware Stack",
    desc: "Phone farm racks, motherboard boxes, USB hubs, PSU, cooling, network modules, and packages.",
  },
  {
    title: "USDT After Confirmation",
    desc: "USDT payment is available after order confirmation. Sales team confirms payment and updates order status.",
  },
];

const BUYING_GUIDES = [
  { title: "How to Buy", href: "/docs/buying-guide", desc: "Register, browse, and place your first order" },
  { title: "USDT Payment", href: "/docs/usdt-payment-guide", desc: "Pay after order confirmation" },
  { title: "Shipping & MOQ", href: "/docs/shipping-guide", desc: "Export packing and freight options" },
  { title: "Warranty", href: "/docs/warranty-guide", desc: "Hardware support and replacement parts" },
];

export default async function HomePage() {
  const featured = await listCatalogProducts({ orderBy: "priceUsd", take: 4 });
  const previewFaq = FAQ_ITEMS.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      <HeroBanner />

      <FeaturedProducts products={featured} />

      {/* Packages */}
      <section className="section section-muted">
        <div className="container-hero">
          <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Deployment Bundles</p>
          <h2 className="section-title">Hardware Packages</h2>
          <p className="section-subtitle">Pre-configured rack + accessory bundles — order online or request a bulk quote.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE_PACKAGES.map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/packages/${pkg.slug}`}
                className="card card-hover p-6 flex flex-col"
              >
                <h3 className="font-bold text-[var(--text)] mb-2">{pkg.name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4 flex-1 line-clamp-2">{pkg.tagline}</p>
                <p className="text-xl font-bold text-[var(--accent)]">From ${pkg.fromPriceUsd}</p>
                <span className="text-sm font-medium text-[var(--brand)] mt-3">View Package →</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/packages" className="btn-outline">Compare All Packages</Link>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="section section-light">
        <div className="container-hero">
          <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Reference Pricing</p>
          <h2 className="section-title">Pricing Tiers</h2>
          <p className="section-subtitle">From sample evaluation to enterprise deployment — transparent reference USD pricing.</p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.id} className="card p-6 lg:p-8 flex flex-col ring-1 ring-transparent hover:ring-[var(--brand)]/20 transition-all">
                <h3 className="text-xl font-bold text-[var(--text)] mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-[var(--accent)] mb-4">{tier.priceLabel}</p>
                <p className="text-sm text-[var(--text-muted)] mb-5 flex-1">{tier.description}</p>
                <ul className="space-y-2 mb-6 text-sm text-[var(--text-muted)]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[var(--brand)]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className="btn-primary text-center">{tier.cta}</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/pricing" className="btn-secondary">Full Price Table</Link>
          </div>
        </div>
      </section>

      {/* Factory advantages */}
      <section className="section section-light border-y border-[var(--border)]">
        <div className="container-hero">
          <h2 className="section-title">Why Buy Factory Direct</h2>
          <p className="section-subtitle">PhoneFarm ICU — Guangzhou source factory for real-device phone farm hardware.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)]">
                <h3 className="font-bold text-[var(--text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FactoryTrustSection />

      {/* Buying guides */}
      <section className="section section-muted">
        <div className="container-hero">
          <h2 className="section-title">Buying Guides</h2>
          <p className="section-subtitle">Everything you need to order, pay, and receive hardware from Guangzhou.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUYING_GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="card card-hover p-6 block">
                <h3 className="font-bold text-[var(--text)] mb-2">{g.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-light">
        <div className="container-hero max-w-3xl">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <FAQAccordion items={previewFaq} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn-outline">All FAQ</Link>
          </div>
        </div>
      </section>

      <HomeLeadForm />

      <section className="section section-muted pb-20">
        <div className="container-hero">
          <ContactCTA title="Start Your Phone Farm Hardware Order" />
        </div>
      </section>
    </>
  );
}
