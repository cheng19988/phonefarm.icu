import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogProduct, listCatalogProducts } from "@/lib/catalog";
import { ProductCommerceActions, FAQAccordion, RelatedProducts } from "@/components/commerce";
import { ProductGallery } from "@/components/product-gallery";
import { ContactCTA, JsonLd } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT, PAYMENT } from "@/lib/config";
import { getProductSeed } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { getProductLine } from "@/data/product-lines";
import { buildFullSpecTable } from "@/lib/product-specs";

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
  try { return JSON.parse(s); } catch { return fallback; }
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
  const sameCategory = allProducts.filter((p) => p.slug !== slug && p.category === product.category);
  const others = allProducts.filter((p) => p.slug !== slug && p.category !== product.category);
  const relatedProducts = [...sameCategory, ...others]
    .slice(0, 4)
    .map((p) => ({ slug: p.slug, name: p.name, priceUsd: p.priceUsd, imageCard: p.imageCard, category: p.category }));

  const galleryImages = [product.imageDetail, product.imageHero, product.imageCard];

  return (
    <>
      <JsonLd data={[
        productJsonLd({ name: product.name, description: product.shortDesc, slug: product.slug, priceUsd: product.priceUsd, stock: product.stock, image: product.imageHero }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]),
      ]} />

      <TrustStrip />

      <div className="section pt-8">
        <div className="container-hero">
          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            {" / "}
            <Link href="/products" className="hover:text-white">Shop</Link>
            {" / "}
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white">{product.category}</Link>
            {" / "}
            <span className="text-slate-300">{product.name}</span>
          </nav>

          {productLine && (
            <p className="text-sm text-slate-500 mb-4">
              Product line:{" "}
              <Link href={`/products#line-${seed?.productLine}`} className="text-cyan-400 hover:text-white">
                {productLine.name}
              </Link>
            </p>
          )}

          {/* Buy box + gallery */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
            <ProductGallery images={galleryImages} alt={`${product.name} — phone farm hardware`} />
            <div className="lg:py-4">
              <p className="text-cyan-400 text-sm font-medium mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">{product.shortDesc}</p>

              <div className="flex flex-wrap items-baseline gap-3 mb-6 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                <span className="text-3xl font-bold text-white">${product.priceUsd.toLocaleString()}</span>
                <span className="text-slate-500">USD reference price</span>
                <span className="text-sm text-slate-500 w-full">
                  {product.stock > 0 ? `${product.stock} in stock (reference)` : "Built to order — contact for lead time"}
                </span>
              </div>

              <ProductCommerceActions slug={product.slug} productName={product.name} stock={product.stock} />

              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-lg border border-slate-800 text-slate-400">
                  <p className="text-white font-medium mb-1">Warranty</p>
                  {seed?.afterSales[0]?.slice(0, 40) ?? "12-month hardware support"}
                </div>
                <div className="p-3 rounded-lg border border-slate-800 text-slate-400">
                  <p className="text-white font-medium mb-1">Shipping</p>
                  Global export from Guangzhou
                </div>
                <div className="p-3 rounded-lg border border-slate-800 text-slate-400">
                  <p className="text-white font-medium mb-1">Payment</p>
                  USDT after confirmation
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg border border-slate-800 text-sm text-slate-400">
                <p className="font-medium text-white mb-1">Sales contact</p>
                <p>{CONTACT.phone} · WhatsApp · Telegram · {CONTACT.email}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Product Overview</h2>
                <p className="text-slate-300 leading-relaxed text-lg">{product.description}</p>
              </section>

              {features.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-slate-300 p-3 rounded-lg border border-slate-800 bg-slate-900/30">
                        <span className="text-cyan-500 shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Technical Specifications</h2>
                <table className="w-full text-sm border border-slate-800 rounded-xl overflow-hidden">
                  <tbody>
                    {Object.entries(fullSpecs).map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-800 last:border-0">
                        <td className="py-3.5 px-5 text-slate-500 bg-slate-900/50 w-2/5 font-medium">{k}</td>
                        <td className="py-3.5 px-5 text-white">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Suitable For</h2>
                <ul className="space-y-3">
                  {scenarios.map((s) => (
                    <li key={s} className="text-slate-300 border-l-2 border-cyan-800 pl-4">{s}</li>
                  ))}
                </ul>
              </section>

              {seed && seed.compatibilityNotes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Compatibility & Configuration</h2>
                  <ul className="space-y-2 text-slate-400">
                    {seed.compatibilityNotes.map((n) => (
                      <li key={n}>— {n}</li>
                    ))}
                  </ul>
                  <Link href={`/contact?product=${slug}&message=Compatibility+check`} className="inline-block mt-4 btn-outline text-sm">
                    Request compatibility check
                  </Link>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Why Choose PhoneFarm ICU</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Guangzhou factory-direct hardware since 2017",
                    "Real-device racks — not cloud or emulator infrastructure",
                    "Workshop burn-in and QC before export packing",
                    "USDT checkout path plus bulk quote for enterprise",
                  ].map((item) => (
                    <p key={item} className="text-sm text-slate-300 p-4 rounded-lg border border-slate-800">{item}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Deployment & Maintenance</h2>
                <ul className="space-y-2 text-slate-400">
                  {delivery.map((d) => <li key={d}>— {d}</li>)}
                  {maintenance.map((m) => <li key={m}>— {m}</li>)}
                </ul>
              </section>

              <section className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
                <h2 className="text-xl font-bold text-white mb-4">Payment Information</h2>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>— USDT ({PAYMENT.network}) available after order confirmation on <Link href="/docs/usdt-payment-guide" className="text-cyan-400 hover:text-white">/orders</Link></li>
                  <li>— {PAYMENT.expiryMinutes}-minute payment window once order is created</li>
                  <li>— Wire transfer (T/T) available for enterprise bulk — contact sales</li>
                  <li>— Reference USD price shown; final amount confirmed at checkout</li>
                </ul>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link href="/docs/usdt-payment-guide" className="text-sm text-cyan-400 hover:text-white">USDT payment guide →</Link>
                  <Link href="/docs/buying-guide" className="text-sm text-cyan-400 hover:text-white">How to buy →</Link>
                </div>
              </section>

              {faq.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Product FAQ</h2>
                  <FAQAccordion items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
                </section>
              )}
            </div>

            <div className="space-y-6">
              <section className="p-5 rounded-xl border border-slate-800 sticky top-24">
                <h3 className="font-bold text-white mb-3">Package Contents</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  {accessories.map((a) => <li key={a}>— {a}</li>)}
                </ul>
              </section>

              {seed && seed.packingNotes.length > 0 && (
                <section className="p-5 rounded-xl border border-slate-800">
                  <h3 className="font-bold text-white mb-3">Shipping</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {seed.packingNotes.map((n) => <li key={n}>— {n}</li>)}
                  </ul>
                  <Link href="/docs/shipping-guide" className="text-sm text-cyan-400 hover:text-white mt-3 inline-block">Shipping guide →</Link>
                </section>
              )}

              {seed && seed.afterSales.length > 0 && (
                <section className="p-5 rounded-xl border border-slate-800">
                  <h3 className="font-bold text-white mb-3">Warranty & After-Sales</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {seed.afterSales.map((n) => <li key={n}>— {n}</li>)}
                  </ul>
                  <Link href="/docs/warranty-guide" className="text-sm text-cyan-400 hover:text-white mt-3 inline-block">Warranty guide →</Link>
                </section>
              )}

              {seed && (
                <section className="p-5 rounded-xl border border-slate-800">
                  <h3 className="font-bold text-white mb-2">MOQ & Customization</h3>
                  <p className="text-sm text-slate-400 mb-2">{seed.moqNotes}</p>
                  <p className="text-xs text-slate-500">{seed.quoteGuidance}</p>
                </section>
              )}

              {relatedPackages.length > 0 && (
                <section className="p-5 rounded-xl border border-slate-800">
                  <h3 className="font-bold text-white mb-3">Recommended Packages</h3>
                  <ul className="space-y-3 text-sm">
                    {relatedPackages.map((pkg) => (
                      <li key={pkg.slug}>
                        <Link href={`/packages/${pkg.slug}`} className="text-white font-medium hover:text-cyan-400">{pkg.name}</Link>
                        <p className="text-slate-500 text-xs mt-0.5">From ${pkg.fromPriceUsd}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
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
