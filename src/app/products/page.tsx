import Image from "next/image";
import Link from "next/link";
import { listCatalogProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata } from "@/lib/seo";
import { SITE, PRODUCT_CATEGORIES } from "@/lib/config";
import { PRODUCT_LINES } from "@/data/product-lines";
import { getProductSeed } from "@/data/products";
import { specHighlight } from "@/lib/product-specs";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Shop — Phone Farm Hardware Catalog",
  description:
    "Shop phone farm racks, motherboard boxes, cooling racks, USB hubs, power supplies, and network modules. USD reference prices — buy online with USDT or request a bulk quote.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const params = await searchParams;
  const products = await listCatalogProducts({
    category: params.category,
    orderBy: params.sort === "price-desc" ? "priceUsd" : params.sort === "price-asc" ? "priceUsd" : "name",
    sort: params.sort === "price-desc" ? "desc" : "asc",
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const sortBase = params.category
    ? `/products?category=${encodeURIComponent(params.category)}`
    : "/products";
  const sortSep = params.category ? "&" : "?";

  return (
    <>
      <TrustStrip />

      {/* Shop hero */}
      <section className="relative min-h-[45vh] flex items-center border-b border-slate-800 overflow-hidden">
        <Image src={IMAGES.homeHero} alt="" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        <div className="container-hero relative py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-cyan-400 text-sm font-medium mb-3">BoxPhone Shop · Hardware Catalog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop Phone Farm Hardware</h1>
            <p className="text-lg text-slate-300 mb-6">
              {products.length} SKUs from {SITE.location}. Reference USD prices, Buy Now with USDT, or request a bulk quote for custom configurations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="btn-primary">Sign Up to Order</Link>
              <Link href="/pricing" className="btn-secondary">View Pricing</Link>
              <Link href="/contact" className="btn-outline">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container-hero">
          {/* Product lines */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Product Lines</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {PRODUCT_LINES.map((line) => (
                <div key={line.id} id={`line-${line.id}`} className="p-6 rounded-xl border border-slate-800 bg-slate-900/30">
                  <h3 className="font-semibold text-white text-lg mb-2">{line.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">{line.summary}</p>
                  <p className="text-xs text-slate-500 mb-4">{line.suitableFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {line.categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        className="text-xs px-3 py-1.5 rounded-full border border-slate-700 text-slate-400 hover:border-cyan-600 hover:text-white"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/products"
              className={`px-4 py-1.5 rounded-full text-sm border ${!params.category ? "border-cyan-600 text-white bg-cyan-950/30" : "border-slate-700 text-slate-400 hover:text-white"}`}
            >
              All Products
            </Link>
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-1.5 rounded-full text-sm border ${params.category === cat ? "border-cyan-600 text-white bg-cyan-950/30" : "border-slate-700 text-slate-400 hover:text-white"}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 mb-10 text-sm items-center">
            <span className="text-slate-500">Sort by price:</span>
            <Link href={`${sortBase}${sortSep}sort=price-asc`} className="text-slate-400 hover:text-white">Low → High</Link>
            <Link href={`${sortBase}${sortSep}sort=price-desc`} className="text-slate-400 hover:text-white">High → Low</Link>
            <span className="text-slate-600 ml-auto">{products.length} products</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => {
              const seed = getProductSeed(p.slug);
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  shortDesc={p.shortDesc}
                  priceUsd={p.priceUsd}
                  stock={p.stock}
                  imageCard={p.imageCard}
                  category={p.category}
                  specHighlight={seed ? specHighlight(seed) : undefined}
                />
              );
            })}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "How to Buy", href: "/docs/buying-guide", desc: "Register, order, and pay with USDT" },
              { title: "USDT Payment", href: "/docs/usdt-payment-guide", desc: "TRC20 payment after order confirmation" },
              { title: "Shipping Guide", href: "/docs/shipping-guide", desc: "Export packing, MOQ, and freight options" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="card p-6 hover:border-cyan-800 transition-colors">
                <h3 className="font-bold text-white mb-2">{g.title}</h3>
                <p className="text-sm text-slate-400">{g.desc}</p>
              </Link>
            ))}
          </div>

          <ContactCTA title="Need a Bulk Quote or Custom Rack Configuration?" />
        </div>
      </div>
    </>
  );
}
