import Link from "next/link";
import { listCatalogProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";
import { PRODUCT_LINES } from "@/data/product-lines";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Catalog — Racks, Boxes & Accessories",
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
      <div className="section">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Phone Farm Hardware Catalog</h1>
          <p className="text-slate-400 max-w-3xl mb-4">
            {products.length} hardware SKUs assembled in {SITE.location}. Browse by product line, order online with USDT after checkout, or contact sales for bulk pricing and custom configurations.
          </p>

          {/* Product lines */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-white mb-4">Product Lines</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {PRODUCT_LINES.map((line) => (
                <div key={line.id} id={`line-${line.id}`} className="p-5 rounded-lg border border-slate-800">
                  <h3 className="font-semibold text-white mb-2">{line.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">{line.summary}</p>
                  <p className="text-xs text-slate-500 mb-3">{line.suitableFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {line.categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        className="text-xs px-2 py-1 rounded border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/products"
              className={`px-3 py-1 rounded-full text-sm border ${!params.category ? "border-slate-500 text-white" : "border-slate-700 text-slate-400"}`}
            >
              All SKUs
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`px-3 py-1 rounded-full text-sm border ${params.category === cat ? "border-slate-500 text-white" : "border-slate-700 text-slate-400"}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="flex gap-3 mb-8 text-sm">
            <span className="text-slate-500">Sort:</span>
            <Link href={`${sortBase}${sortSep}sort=price-asc`} className="text-slate-400 hover:text-white">Price Low</Link>
            <Link href={`${sortBase}${sortSep}sort=price-desc`} className="text-slate-400 hover:text-white">Price High</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                shortDesc={p.shortDesc}
                priceUsd={p.priceUsd}
                stock={p.stock}
                imageCard={p.imageCard}
                category={p.category}
              />
            ))}
          </div>

          <div className="mt-16">
            <ContactCTA title="Need a Bulk Quote or Custom Configuration?" />
          </div>
        </div>
      </div>
    </>
  );
}
