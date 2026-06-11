import Link from "next/link";
import Image from "next/image";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryGateway } from "@/components/home/category-gateway";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FactoryTrustSection } from "@/components/home/factory-trust-section";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";
import { listCatalogProducts } from "@/lib/catalog";
import { HARDWARE_PACKAGES } from "@/data/packages";

export const metadata = buildMetadata({
  title: SITE.headline,
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const featured = await listCatalogProducts({ orderBy: "priceUsd", take: 3 });

  return (
    <>
      <HeroBanner />
      <CategoryGateway />
      <FeaturedProducts products={featured} />
      <FactoryTrustSection />

      <section className="section">
        <div className="container-hero">
          <SectionHeader
            eyebrow="Deployment Bundles"
            title="Pre-Configured Rack Packages"
            subtitle="Starter, density, and enterprise bundles - hardware matrix confirmed with sales before shipment."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-4">
            {HARDWARE_PACKAGES.slice(0, 2).map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/packages/${pkg.slug}`}
                className="group card card-hover overflow-hidden grid md:grid-cols-2 min-h-[280px]"
              >
                <div className="relative min-h-[200px] md:min-h-full">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-2">{pkg.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">{pkg.tagline}</p>
                  <p className="text-lg font-semibold text-[var(--accent)]">From ${pkg.fromPriceUsd}</p>
                  <span className="text-sm text-[var(--brand)] font-medium mt-4">View package</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/packages" className="btn-outline-dark">Compare All Packages</Link>
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container-hero max-w-3xl mx-auto">
          <div className="cta-band">
            <p className="eyebrow">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text)] mb-4 tracking-tight">
              Ready to Deploy Phone Farm Hardware?
            </h2>
            <p className="text-[var(--text-muted)] text-base mb-8 leading-relaxed">
              Browse the catalog, register to order, or contact our Guangzhou sales team for bulk quotes and custom rack layouts.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/products" className="btn-accent">Shop Catalog</Link>
              <Link href="/register" className="btn-primary">Create Account</Link>
              <Link href="/contact" className="btn-outline-dark">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
