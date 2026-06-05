import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogProduct } from "@/lib/catalog";
import { ProductQuoteButtons, FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT } from "@/lib/config";
import { PRODUCT_SEEDS } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";

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

  const features = parseJson<string[]>(product.features, []);
  const specs = parseJson<Record<string, string>>(product.specs, {});
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const maintenance = parseJson<string[]>(product.maintenance, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);

  const relatedProducts = PRODUCT_SEEDS.filter(
    (p) => p.category === product.category && p.slug !== slug
  ).slice(0, 3);

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

      <div className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
              <Image
                src={product.imageDetail}
                alt={`${product.name} — phone farm rack hardware detail`}
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
                {" "}· Stock: {product.stock > 0 ? `${product.stock} units` : "Quote required"}
              </p>
              <ProductQuoteButtons slug={product.slug} productName={product.name} />
              <div className="mt-6 p-4 rounded-lg border border-slate-800 text-sm text-slate-400">
                <p className="font-medium text-white mb-2">Contact Sales</p>
                <p>{CONTACT.phone} · WhatsApp · Telegram · {CONTACT.email}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">Product Overview</h2>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
                <p className="text-sm text-slate-500 mt-4">
                  Final configuration depends on device model, quantity, cooling requirement, and power layout. Request a quote for an exact specification.
                </p>
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

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Deployment Notes</h2>
                <ul className="space-y-2 text-sm text-slate-400">
                  {delivery.map((d) => <li key={d}>— {d}</li>)}
                  {maintenance.map((m) => <li key={m}>— {m}</li>)}
                </ul>
              </section>

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

              {(relatedProducts.length > 0 || relatedPackages.length > 0) && (
                <section className="p-5 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-white mb-3">Related Hardware</h3>
                  {relatedProducts.length > 0 && (
                    <ul className="space-y-2 text-sm mb-4">
                      {relatedProducts.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/products/${p.slug}`} className="text-cyan-400 hover:text-white">{p.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {relatedPackages.length > 0 && (
                    <ul className="space-y-2 text-sm">
                      {relatedPackages.map((pkg) => (
                        <li key={pkg.slug}>
                          <Link href={`/packages/${pkg.slug}`} className="text-cyan-400 hover:text-white">{pkg.name} package</Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
