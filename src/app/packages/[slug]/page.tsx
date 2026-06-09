import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, HARDWARE_PACKAGES } from "@/data/packages";
import { ContactCTA, JsonLd } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { PackageBuyBox } from "@/components/packages/package-buy-box";
import { FAQAccordion } from "@/components/commerce";
import { ShopProductCard } from "@/components/products/product-card";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { getProductSeed } from "@/data/products";
import { specHighlights } from "@/lib/product-specs";
import { listCatalogProducts } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return HARDWARE_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: `${pkg.name} — Hardware Package`,
    description: `${pkg.description} Order or request a quote from PhoneFarm ICU, Guangzhou.`,
    path: `/packages/${slug}`,
    image: pkg.image,
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const allProducts = await listCatalogProducts();
  const relatedProducts = pkg.productSlugs
    .map((s) => allProducts.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 4)
    .map((p) => {
      const seed = getProductSeed(p!.slug);
      return {
        slug: p!.slug,
        name: p!.name,
        shortDesc: p!.shortDesc,
        priceUsd: p!.priceUsd,
        stock: p!.stock,
        imageCard: p!.imageCard,
        category: p!.category,
        specHighlights: seed ? specHighlights(seed).slice(0, 2) : undefined,
      };
    });

  const c = pkg.comparison;

  return (
    <>
      <JsonLd data={faqJsonLd(pkg.faq.map((f) => ({ question: f.q, answer: f.a })))} />
      <TrustStrip variant="light" />

      <div className="section section-light pt-6">
        <div className="container-hero">
          <nav className="text-sm text-[var(--text-subtle)] mb-8 flex flex-wrap gap-1">
            <Link href="/" className="hover:text-[var(--brand)]">Home</Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-[var(--brand)]">Packages</Link>
            <span>/</span>
            <span className="text-[var(--text-muted)] font-medium">{pkg.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 mb-20">
            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-[var(--border)] shadow-lg">
              <Image src={pkg.image} alt={`${pkg.name} phone farm hardware package`} fill className="object-cover" sizes="55vw" priority />
            </div>
            <PackageBuyBox pkg={pkg} />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Package Overview</h2>
                <p className="text-[var(--text-muted)] leading-relaxed text-lg">{pkg.description}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-4">What Is Included</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[var(--text-muted)] p-4 rounded-xl border border-[var(--border)] bg-white">
                      <span className="text-[var(--brand)] shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Suitable For</h2>
                <p className="text-[var(--text-muted)] mb-4">{c.bestFor}</p>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  {pkg.highlights.map((h) => (
                    <li key={h}>— {h}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Hardware Configuration</h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    ["Device quantity", c.deviceQuantity],
                    ["Main hardware", c.mainHardware],
                    ["Power layout", c.powerLayout],
                    ["Support level", c.supportLevel],
                  ].map(([label, value]) => (
                    <div key={label} className="p-4 rounded-xl border border-[var(--border)] bg-white">
                      <p className="text-[var(--text-subtle)] text-xs mb-1">{label}</p>
                      <p className="text-[var(--text)] font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Cooling &amp; Power Notes</h2>
                <p className="text-[var(--text-muted)]">
                  Cooling: {c.coolingLevel}. Power: {c.powerLayout}. Final thermal and PSU sizing confirmed in quotation based on device model and room ambient temperature.
                </p>
              </section>

              {pkg.faq.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[var(--text)] mb-4">FAQ</h2>
                  <FAQAccordion items={pkg.faq.map((f) => ({ question: f.q, answer: f.a }))} />
                </section>
              )}
            </div>

            <div className="space-y-6">
              <section className="p-5 rounded-2xl border border-[var(--border)] bg-white sticky top-28">
                <h3 className="font-bold text-[var(--text)] mb-3">Shipping &amp; Packing</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Export packing from Guangzhou with accessory checklist. Heavy multi-rack orders may ship on pallet. Freight quoted by destination.
                </p>
                <Link href="/docs/shipping-guide" className="text-sm text-[var(--brand)] font-medium mt-3 inline-block hover:underline">
                  Shipping guide →
                </Link>
              </section>
              <section className="p-5 rounded-2xl border border-[var(--border)] bg-white">
                <h3 className="font-bold text-[var(--text)] mb-3">Warranty &amp; Support</h3>
                <p className="text-sm text-[var(--text-muted)]">{c.supportLevel}</p>
                <Link href="/docs/warranty-guide" className="text-sm text-[var(--brand)] font-medium mt-3 inline-block hover:underline">
                  Warranty guide →
                </Link>
              </section>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mb-20">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-8">Catalog SKUs in This Bundle</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ShopProductCard key={p.slug} {...p} />
                ))}
              </div>
            </section>
          )}

          <ContactCTA title={`Discuss ${pkg.name} with Sales`} />
        </div>
      </div>
    </>
  );
}
