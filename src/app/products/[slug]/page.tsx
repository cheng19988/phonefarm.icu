import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogProduct, listCatalogProducts } from "@/lib/catalog";
import { FAQAccordion, RelatedProducts } from "@/components/commerce";
import { ProductGallery } from "@/components/product-gallery";
import { BuyBox } from "@/components/products/buy-box";
import { SpecTable } from "@/components/products/spec-table";
import { ContactCTA, JsonLd } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PAYMENT } from "@/lib/config";
import { getProductSeed } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { getProductLine } from "@/data/product-lines";
import { buildFullSpecTable } from "@/lib/product-specs";
import { buildGalleryImages } from "@/lib/product-images";
import { getGalleryCaptions, getProductImageManifest } from "@/lib/product-image-manifest";
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

  const features = parseJson<string[]>(product.features, []);
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const maintenance = parseJson<string[]>(product.maintenance, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);

  const fullSpecs = seed
    ? buildFullSpecTable(seed, product.name, product.category)
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

  const galleryImages = buildGalleryImages(slug, product);
  const galleryCaptions = getGalleryCaptions(slug);
  const imageManifest = getProductImageManifest(slug).filter((e) => e.role === "gallery" || e.role === "hero");
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

      <TrustStrip variant="light" />

      <div className="section section-light pt-6">
        <div className="container-hero">
          <nav className="text-sm text-[var(--text-subtle)] mb-8 flex flex-wrap gap-1">
            <Link href="/" className="hover:text-[var(--brand)]">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[var(--brand)]">Shop</Link>
            <span>/</span>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-[var(--brand)]"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[var(--text-muted)] font-medium">{product.name}</span>
          </nav>

          {/* PDP hero: gallery + buy box */}
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 xl:gap-16 mb-20">
            <ProductGallery
              images={galleryImages}
              alt={`${product.name} — phone farm hardware`}
              captions={galleryCaptions}
            />
            <BuyBox
              slug={product.slug}
              name={product.name}
              category={product.category}
              shortDesc={product.shortDesc}
              priceUsd={product.priceUsd}
              stock={product.stock}
              model={product.slug}
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
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
            <div className="lg:col-span-2 space-y-14">
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4">Product Overview</h2>
                <p className="text-[var(--text-muted)] leading-relaxed text-lg">{product.description}</p>
              </section>

              {features.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Key Features</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-2 text-sm text-[var(--text-muted)] p-4 rounded-xl border border-[var(--border)] bg-white"
                      >
                        <span className="text-[var(--brand)] shrink-0 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div id="specs">
                <SpecTable specs={fullSpecs} />
              </div>

              {imageManifest.length > 1 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Reference Models &amp; Gallery</h2>
                  <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
                    Product photos below are synced from factory assets. Filename labels include model, RAM/storage, and port
                    configuration (USB, LAN, OTG) for each reference platform.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {imageManifest.map((entry) => (
                      <li
                        key={entry.file}
                        className="text-[var(--text-muted)] p-3 rounded-lg border border-[var(--border)] bg-white"
                      >
                        {entry.label}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Suitable For</h2>
                <ul className="space-y-3">
                  {scenarios.map((s) => (
                    <li key={s} className="text-[var(--text-muted)] border-l-4 border-[var(--brand)] pl-4">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              {seed && seed.compatibilityNotes.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Compatibility Notes</h2>
                  <ul className="space-y-2 text-[var(--text-muted)]">
                    {seed.compatibilityNotes.map((n) => (
                      <li key={n}>— {n}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?product=${slug}&message=Compatibility+check`}
                    className="inline-block mt-4 btn-outline text-sm"
                  >
                    Request compatibility check
                  </Link>
                </section>
              )}

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Shipping &amp; Packing</h2>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  {(seed?.packingNotes ?? delivery).map((n) => (
                    <li key={n}>— {n}</li>
                  ))}
                </ul>
                <Link href="/docs/shipping-guide" className="text-sm text-[var(--brand)] font-medium hover:underline mt-4 inline-block">
                  Shipping guide →
                </Link>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Warranty &amp; After-Sales</h2>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  {(seed?.afterSales ?? maintenance).map((n) => (
                    <li key={n}>— {n}</li>
                  ))}
                </ul>
                <Link href="/docs/warranty-guide" className="text-sm text-[var(--brand)] font-medium hover:underline mt-4 inline-block">
                  Warranty guide →
                </Link>
              </section>

              <section className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50">
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">Payment Information</h2>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>
                    — USDT ({PAYMENT.network}) available after order confirmation on{" "}
                    <Link href="/docs/usdt-payment-guide" className="text-[var(--brand)] hover:underline">
                      orders page
                    </Link>
                  </li>
                  <li>— {PAYMENT.expiryMinutes}-minute payment window once order is created</li>
                  <li>— Wire transfer (T/T) available for enterprise bulk — contact sales</li>
                  <li>— USDT payment is available after order confirmation. Sales team confirms payment and updates order status.</li>
                </ul>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link href="/docs/usdt-payment-guide" className="text-sm text-[var(--brand)] font-medium hover:underline">
                    USDT payment guide →
                  </Link>
                  <Link href="/docs/buying-guide" className="text-sm text-[var(--brand)] font-medium hover:underline">
                    How to buy →
                  </Link>
                </div>
              </section>

              {faq.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">Product FAQ</h2>
                  <FAQAccordion items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
                </section>
              )}
            </div>

            <div className="space-y-6">
              <section className="p-5 rounded-2xl border border-[var(--border)] bg-white sticky top-28">
                <h3 className="font-bold text-[var(--text)] mb-3">Package Contents</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  {accessories.map((a) => (
                    <li key={a}>— {a}</li>
                  ))}
                </ul>
              </section>

              {seed && (
                <section className="p-5 rounded-2xl border border-[var(--border)] bg-white">
                  <h3 className="font-bold text-[var(--text)] mb-2">MOQ &amp; Customization</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{seed.moqNotes}</p>
                  <p className="text-xs text-[var(--text-subtle)]">{seed.quoteGuidance}</p>
                </section>
              )}

              {relatedPackages.length > 0 && (
                <section className="p-5 rounded-2xl border border-[var(--border)] bg-white">
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

              <section className="p-5 rounded-2xl border border-[var(--border)] bg-white">
                <h3 className="font-bold text-[var(--text)] mb-3">Deployment Notes</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  {delivery.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="mb-20">
            <RelatedProducts products={relatedProducts} />
          </div>

          <ContactCTA title={`Order or Quote — ${product.name}`} />
        </div>
      </div>
    </>
  );
}
