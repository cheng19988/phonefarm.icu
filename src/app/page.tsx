import Link from "next/link";
import Image from "next/image";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryGateway } from "@/components/home/category-gateway";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FactoryTrustSection } from "@/components/home/factory-trust-section";
import { HomeCatalogGrid } from "@/components/home/home-catalog-grid";
import { HomeResourcesPreview } from "@/components/home/home-resources-preview";
import { HomeLeadForm } from "@/components/home-lead-form";
import { TrustStrip } from "@/components/trust-strip";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";
import { listCatalogProducts } from "@/lib/catalog";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { packageImageFor } from "@/lib/package-images";
import { getProductSeed } from "@/data/products";
import { getProductLine } from "@/data/product-lines";
import { specHighlights } from "@/lib/product-specs";

export const metadata = buildMetadata({
  title: SITE.headline,
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const allProducts = await listCatalogProducts({ orderBy: "name" });
  const featured = allProducts.slice().sort((a, b) => a.priceUsd - b.priceUsd).slice(0, 3);

  const RACK_SLUGS = new Set([
    "phone-farm-box",
    "motherboard-box",
    "android-phone-farm",
    "iphone-phone-farm",
    "real-device-phone-farm",
    "empty-box-chassis",
    "custom-cabinet",
  ]);

  const catalogCards = allProducts.filter((p) => RACK_SLUGS.has(p.slug)).map((p) => {
    const seed = getProductSeed(p.slug);
    const line = seed ? getProductLine(seed.productLine) : null;
    return {
      slug: p.slug,
      name: p.name,
      shortDesc: p.shortDesc,
      priceUsd: p.priceUsd,
      stock: p.stock,
      imageCard: p.imageCard,
      category: p.category,
      productLine: line?.name,
      specHighlights: seed ? specHighlights(seed).slice(0, 1) : undefined,
    };
  });

  return (
    <>
      <HeroBanner />
      <TrustStrip variant="light" />
      <CategoryGateway />
      <FeaturedProducts products={featured} />
      <HomeCatalogGrid products={catalogCards} />
      <FactoryTrustSection />
      <HomeResourcesPreview />
      <HomeLeadForm />

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
                  <Image src={packageImageFor(pkg)} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
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
              <Link href="/pricing" className="btn-outline-dark">See Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
