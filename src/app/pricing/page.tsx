import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge } from "@/components/shared";
import { PageHero } from "@/components/ui/page-hero";
import { buildMetadata } from "@/lib/seo";
import { PRICING_TIERS, getCatalogPriceTable } from "@/data/pricing";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Hardware Pricing — Shop & Bulk Quotes",
  description:
    "USD reference prices for phone farm racks, motherboard boxes, cooling, and accessories. Buy online with USDT or contact sales for bulk orders from Guangzhou.",
  path: "/pricing",
});

export default function PricingPage() {
  const catalog = getCatalogPriceTable();

  return (
    <>
      <PageHero
        eyebrow="Reference Pricing"
        title="Hardware Pricing"
        subtitle={`Published USD reference prices from ${SITE.location}. Bulk quotes for custom racks and international freight.`}
        image={IMAGES.motherboardBox.hero}
        imageAlt="Motherboard box hardware pricing"
        ctas={[
          { label: "Browse Catalog", href: "/products", variant: "accent" },
          { label: "Bulk Quote", href: "/contact", variant: "outline" },
        ]}
        compact
      />
      <TrustStrip variant="light" />

      <div className="section section-light">
        <div className="container-hero">
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Deployment Scale</h2>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`card p-6 flex flex-col ${tier.id === "professional" ? "ring-2 ring-[var(--brand)]/20 border-[var(--brand)]/30" : ""}`}
                >
                  <h3 className="text-lg font-bold text-[var(--text)]">{tier.name}</h3>
                  <p className="text-2xl font-bold text-[var(--accent)] my-3">{tier.priceLabel}</p>
                  <p className="text-[var(--text-muted)] text-sm mb-4">{tier.description}</p>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)] mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-[var(--brand)] shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.href}
                    className={tier.id === "enterprise" ? "btn-outline text-center py-2.5" : "btn-accent text-center py-2.5"}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2">SKU Price List</h2>
            <p className="text-[var(--text-muted)] mb-8">Reference USD prices — buy online or open product page for full specifications.</p>
            <div className="rounded-2xl border border-[var(--border)] overflow-x-auto bg-white shadow-sm">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)] text-left">
                    <th className="p-4 text-[var(--text-subtle)] font-medium">Product</th>
                    <th className="p-4 text-[var(--text-subtle)] font-medium">Category</th>
                    <th className="p-4 text-[var(--text-subtle)] font-medium">Price</th>
                    <th className="p-4 text-[var(--text-subtle)] font-medium">Availability</th>
                    <th className="p-4 text-[var(--text-subtle)] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catalog.map((row, i) => (
                    <tr key={row.slug} className={i % 2 === 0 ? "bg-white" : "bg-[var(--surface-muted)]/40"}>
                      <td className="p-4">
                        <Link href={`/products/${row.slug}`} className="font-medium text-[var(--text)] hover:text-[var(--brand)]">
                          {row.name}
                        </Link>
                      </td>
                      <td className="p-4 text-[var(--text-muted)]">{row.category}</td>
                      <td className="p-4">
                        <PriceTag priceUsd={row.priceUsd} size="sm" />
                      </td>
                      <td className="p-4">
                        <StockBadge stock={row.stock} />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <form action="/api/orders" method="POST" className="inline">
                            <input type="hidden" name="productSlug" value={row.slug} />
                            <input type="hidden" name="action" value="buy" />
                            <button type="submit" disabled={row.stock <= 0} className="btn-accent text-xs py-2 px-3 disabled:opacity-50">
                              Buy Now
                            </button>
                          </form>
                          <Link href={`/products/${row.slug}`} className="btn-secondary text-xs py-2 px-3">
                            Details
                          </Link>
                          <Link href={`/contact?product=${row.slug}`} className="text-xs text-[var(--brand)] font-medium py-2 px-1 hover:underline">
                            Quote
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--text-subtle)] mt-6">
              Enterprise bulk pricing and OEM/ODM — <Link href="/contact" className="text-[var(--brand)] hover:underline">contact sales</Link>.
              {" "}Already have an account? <Link href="/login" className="text-[var(--brand)] hover:underline">Sign in</Link>.
            </p>
          </section>

          <ContactCTA title="Ready to Order or Need a Bulk Quote?" />
        </div>
      </div>
    </>
  );
}
