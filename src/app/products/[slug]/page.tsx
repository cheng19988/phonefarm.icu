import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogProduct, listCatalogProducts } from "@/lib/catalog";
import { RelatedProducts } from "@/components/commerce";
import { ProductGallery } from "@/components/product-gallery";
import { BuyBox } from "@/components/products/buy-box";
import { ProductDetailSections } from "@/components/products/product-detail-sections";
import { ContactCTA, JsonLd } from "@/components/shared";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getProductSeed } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { getProductLine } from "@/data/product-lines";
import { buildDisplaySpecTable } from "@/lib/product-specs";
import { buildProductGallery } from "@/lib/product-images";
import { pickRelatedProducts } from "@/lib/related-products";
import { specHighlights } from "@/lib/product-specs";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} — Phone Farm Hardware`,
    description: `${product.shortDesc} Shop online with USDT or request a bulk quote from PhoneFarm ICU, Guangzhou hardware manufacturer.`,
    path: `/products/${slug}`,
    image: product.imageHero,
  });
}

function parseJson<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s);
  } catch {
    return fallback;
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  if (!product) notFound();

  const seed = getProductSeed(slug);
  const allProducts = await listCatalogProducts();

  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  const features = parseJson<string[]>(product.features, []);

  const fullSpecs = seed
    ? buildDisplaySpecTable(seed, product.name, product.category)
    : parseJson<Record<string, string>>(product.specs, {});

  const productLine = seed ? getProductLine(seed.productLine) : null;
  const relatedPackages = HARDWARE_PACKAGES.filter((pkg) => pkg.productSlugs.includes(slug)).slice(0, 2);
  const relatedProducts = pickRelatedProducts(slug, product.category, allProducts, 4).map((p) => ({
    ...p,
    specHighlights: (() => {
      const s = getProductSeed(p.slug);
      return s ? specHighlights(s).slice(0, 2) : undefined;
    })(),
  }));

  const gallery = buildProductGallery(slug, product);
  const warrantySummary =
    seed?.afterSales.find((s) => s.toLowerCase().includes("month") || s.toLowerCase().includes("support")) ??
    seed?.afterSales[0] ??
    "12-month hardware support — term confirmed in quotation";

  return (
    <>
      <JsonLd
        data={[
          productJsonLd({
            name: product.name,
            description: product.shortDesc,
            slug: product.slug,
            priceUsd: product.priceUsd,
            stock: product.stock,
            image: product.imageHero,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/products" },
            { name: product.category, path: `/products?category=${encodeURIComponent(product.category)}` },
            { name: product.name, path: `/products/${slug}` },
          ]),
        ]}
      />

      <PageIntro
        eyebrow={product.category}
        title={product.name}
        subtitle={product.shortDesc}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
          { label: product.name },
        ]}
      />

      <div className="section section-light pt-0">
        <div className="container-hero">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 xl:gap-16 mb-16">
            <ProductGallery
              images={gallery.images}
              alt={`${product.name} — phone farm hardware`}
              captions={gallery.captions}
            />
            <BuyBox
              slug={product.slug}
              name={product.name}
              category={product.category}
              shortDesc=""
              priceUsd={product.priceUsd}
              stock={product.stock}
              productLine={productLine?.name}
              productLineHref={
                seed
                  ? {
                      "rack-systems": "/products?group=racks",
                      "motherboard-systems": "/products?group=motherboard",
                      "cooling-power": "/products?group=power",
                      connectivity: "/products?group=network",
                    }[seed.productLine] ?? "/products"
                  : null
              }
              warrantySummary={warrantySummary}
              specHighlights={seed ? specHighlights(seed) : undefined}
              compact
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-10 lg:gap-14 mb-16">
            <ProductDetailSections
              slug={slug}
              description={product.description}
              features={features}
              specs={fullSpecs}
              scenarios={scenarios}
              faq={faq}
              referenceLabels={gallery.referenceLabels}
              seed={seed}
            />

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              {accessories.length > 0 && (
                <section className="p-5 rounded-xl border border-[var(--border)] bg-white">
                  <h3 className="font-bold text-[var(--text)] mb-3">Package Contents</h3>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    {accessories.map((a) => (
                      <li key={a}>— {a}</li>
                    ))}
                  </ul>
                </section>
              )}

              {seed && (
                <section className="p-5 rounded-xl border border-[var(--border)] bg-white">
                  <h3 className="font-bold text-[var(--text)] mb-2">MOQ &amp; Customization</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{seed.moqNotes}</p>
                  <p className="text-xs text-[var(--text-subtle)]">{seed.quoteGuidance}</p>
                </section>
              )}

              {relatedPackages.length > 0 && (
                <section className="p-5 rounded-xl border border-[var(--border)] bg-white">
                  <h3 className="font-bold text-[var(--text)] mb-3">Recommended Packages</h3>
                  <ul className="space-y-3 text-sm">
                    {relatedPackages.map((pkg) => (
                      <li key={pkg.slug}>
                        <Link href={`/packages/${pkg.slug}`} className="text-[var(--text)] font-medium hover:text-[var(--brand)]">
                          {pkg.name}
                        </Link>
                        <p className="text-[var(--text-subtle)] text-xs mt-0.5">From ${pkg.fromPriceUsd}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>

          <div className="mb-16">
            <RelatedProducts products={relatedProducts} />
          </div>

          <ContactCTA title={`Order or Quote — ${product.name}`} />
        </div>
      </div>
    </>
  );
}
