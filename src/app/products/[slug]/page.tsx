import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogProduct } from "@/lib/catalog";
import { ProductQuoteButtons, FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT } from "@/lib/config";
import { getProductSeed } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { getProductLine } from "@/data/product-lines";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} — Phone Farm Hardware`,
    description: `${product.shortDesc} Request a quote from PhoneFarm ICU, Guangzhou phone farm hardware manufacturer.`,
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

  const features = parseJson<string[]>(product.features, []);
  const specs = parseJson<Record<string, string>>(product.specs, {});
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const maintenance = parseJson<string[]>(product.maintenance, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);

  const productLine = seed ? getProductLine(seed.productLine) : null;
  const relatedPackages = HARDWARE_PACKAGES.filter((pkg) =>
    pkg.productSlugs.includes(slug)
  ).slice(0, 2);

  return (
    <>
      <JsonLd data={[
        productJsonLd({ name: product.name, description: product.shortDesc, slug: product.slug, priceUsd: product.priceUsd, stock: product.stock, image: product.imageHero }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]),
      ]} />

      <TrustStrip />

      <div className="section">
        <div className="container-wide">
          {productLine && (
            <p className="text-sm text-slate-500 mb-4">
              Product line:{" "}
              <Link href={`/products#line-${seed?.productLine}`} className="text-cyan-400 hover:text-white">
                {productLine.name}
              </Link>
            </p>
          )}

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
              <Image
                src={product.imageDetail}
                alt={`${product.name} — phone farm rack hardware`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-slate-300 mb-6 leading-relaxed">{product.shortDesc}</p>
              <p className="text-sm text-slate-500 mb-4">
                Reference price: <span className="text-white font-semibold">${product.priceUsd.toLocaleString()} USD</span>
                {" "}· {product.stock > 0 ? `${product.stock} in stock (reference)` : "Built to order — quote required"}
              </p>
              <ProductQuoteButtons slug={product.slug} productName={product.name} />
              <div className="mt-6 p-4 rounded-lg border border-slate-800 text-sm text-slate-400">
                <p className="font-medium text-white mb-1">Sales contact</p>
                <p>{CONTACT.phone} · WhatsApp · Telegram · {CONTACT.email}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">Product Overview</h2>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Key Specifications</h2>
                <table className="w-full text-sm border border-slate-800 rounded-lg overflow-hidden">
                  <tbody>
                    {Object.entries(specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-800 last:border-0">
                        <td className="py-3 px-4 text-slate-500 bg-slate-900/50 w-2/5">{k}</td>
                        <td className="py-3 px-4 text-white">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {features.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
                    {features.map((f) => (
                      <li key={f}>— {f}</li>
                    ))}
                  </ul>
                )}
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Suitable For</h2>
                <ul className="space-y-2">
                  {scenarios.map((s) => (
                    <li key={s} className="text-sm text-slate-300 border-l-2 border-slate-700 pl-4">{s}</li>
                  ))}
                </ul>
              </section>

              {seed && seed.compatibilityNotes.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Compatibility & Configuration</h2>
                  <p className="text-sm text-slate-500 mb-3">
                    Configuration depends on your device model, quantity, cooling requirement, and power layout.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {seed.compatibilityNotes.map((n) => (
                      <li key={n}>— {n}</li>
                    ))}
                  </ul>
                  <Link href={`/contact?product=${slug}&message=Compatibility+check`} className="inline-block mt-4 text-sm text-cyan-400 hover:text-white">
                    Ask for compatibility check →
                  </Link>
                </section>
              )}

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Deployment Notes</h2>
                <ul className="space-y-2 text-sm text-slate-400">
                  {delivery.map((d) => <li key={d}>— {d}</li>)}
                  {maintenance.map((m) => <li key={m}>— {m}</li>)}
                </ul>
              </section>

              {seed && (
                <section className="p-5 rounded-lg border border-slate-800 bg-slate-900/30">
                  <h2 className="text-lg font-bold text-white mb-3">Quote Guidance</h2>
                  <p className="text-sm text-slate-400 mb-3">{seed.quoteGuidance}</p>
                  <p className="text-sm text-slate-500"><strong className="text-slate-400">MOQ:</strong> {seed.moqNotes}</p>
                </section>
              )}

              {faq.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Product FAQ</h2>
                  <FAQAccordion items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
                </section>
              )}
            </div>

            <div className="space-y-6">
              <section className="p-5 rounded-lg border border-slate-800">
                <h3 className="font-bold text-white mb-3">What Is Included</h3>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  {accessories.map((a) => <li key={a}>— {a}</li>)}
                </ul>
              </section>

              {seed && seed.packingNotes.length > 0 && (
                <section className="p-5 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-white mb-3">Packing & Shipping</h3>
                  <ul className="space-y-1.5 text-sm text-slate-400">
                    {seed.packingNotes.map((n) => <li key={n}>— {n}</li>)}
                  </ul>
                </section>
              )}

              {seed && seed.afterSales.length > 0 && (
                <section className="p-5 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-white mb-3">After-Sales Support</h3>
                  <ul className="space-y-1.5 text-sm text-slate-400">
                    {seed.afterSales.map((n) => <li key={n}>— {n}</li>)}
                  </ul>
                </section>
              )}

              {relatedPackages.length > 0 && (
                <section className="p-5 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-white mb-3">Recommended Packages</h3>
                  <ul className="space-y-3 text-sm">
                    {relatedPackages.map((pkg) => (
                      <li key={pkg.slug}>
                        <Link href={`/packages/${pkg.slug}`} className="text-white font-medium hover:text-cyan-400">{pkg.name}</Link>
                        <p className="text-slate-500 text-xs mt-0.5">From ${pkg.fromPriceUsd} · {pkg.comparison.bestFor}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {productLine && (
                <section className="p-5 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-white mb-2">{productLine.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">{productLine.summary}</p>
                  <p className="text-xs text-slate-500">{productLine.suitableFor}</p>
                </section>
              )}
            </div>
          </div>

          <div className="mt-16">
            <ContactCTA title={`Request a Quote — ${product.name}`} />
          </div>
        </div>
      </div>
    </>
  );
}
