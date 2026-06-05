import Link from "next/link";
import { listCatalogProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Catalog — Racks, Boxes & Accessories",
  description:
    "Browse phone farm racks, motherboard boxes, fan cooling racks, USB hubs, power supplies, and network modules. Reference USD prices — request a quote from Guangzhou manufacturer.",
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
    <div className="section">
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Phone Farm Hardware Catalog</h1>
        <p className="text-slate-400 max-w-3xl mb-4">
          {products.length} hardware SKUs from {SITE.location} — phone farm racks, motherboard boxes, cooling, USB hubs, and power modules. Reference USD prices; request a written quote for bulk orders.
        </p>
        <p className="text-sm text-slate-500 mb-8 max-w-3xl">
          Each unit is assembled and burn-in tested before export. Standard lead time is 5–10 business days for in-stock models; custom cabinets and large orders are quoted separately.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/products"
            className={`px-3 py-1 rounded-full text-sm border ${!params.category ? "border-cyan-600 text-cyan-400" : "border-slate-700 text-slate-400"}`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`px-3 py-1 rounded-full text-sm border ${params.category === cat ? "border-cyan-600 text-cyan-400" : "border-slate-700 text-slate-400"}`}
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
  );
}
