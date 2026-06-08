import Link from "next/link";
import { listCatalogProducts } from "@/lib/catalog";
import { ContactCTA } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { ShopHero } from "@/components/products/shop-hero";
import { ShopProductCard } from "@/components/products/product-card";
import { CategoryFilters } from "@/components/products/category-filters";
import { buildMetadata } from "@/lib/seo";
import { getShopFilterCategories } from "@/lib/config";
import { getProductSeed } from "@/data/products";
import { specHighlights } from "@/lib/product-specs";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Shop — Phone Farm Hardware Catalog",
  description:
    "Shop phone farm racks, motherboard boxes, cooling racks, USB hubs, power supplies, and network modules. USD reference prices — buy online with USDT or request a bulk quote.",
  path: "/products",
});

const BUYING_GUIDES = [
  { title: "How to Buy", href: "/docs/buying-guide", desc: "Register, order, and pay with USDT after confirmation" },
  { title: "USDT Payment", href: "/docs/usdt-payment-guide", desc: "TRC20 payment after order confirmation" },
  { title: "Shipping Guide", href: "/docs/shipping-guide", desc: "Export packing, MOQ, and freight options" },
  { title: "Warranty", href: "/docs/warranty-guide", desc: "Hardware support and replacement parts" },
  { title: "Bulk Quote", href: "/contact", desc: "Custom rack layout and project pricing" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string; group?: string }>;
}) {
  const params = await searchParams;
  const groupCategories = getShopFilterCategories(params.group);

  let products = await listCatalogProducts({
    category: params.category,
    orderBy: params.sort === "price-desc" || params.sort === "price-asc" ? "priceUsd" : "name",
    sort: params.sort === "price-desc" ? "desc" : "asc",
  });

  if (groupCategories) {
    products = products.filter((p) => groupCategories.includes(p.category));
  }

  const sortBase = (() => {
    const q = new URLSearchParams();
    if (params.category) q.set("category", params.category);
    if (params.group) q.set("group", params.group);
    const s = q.toString();
    return s ? `/products?${s}` : "/products";
  })();
  const sortSep = sortBase.includes("?") ? "&" : "?";

  return (
    <>
      <ShopHero productCount={products.length} />
      <TrustStrip variant="light" />

      <div className="section section-light">
        <div className="container-hero">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <CategoryFilters activeGroup={params.group} activeCategory={params.category} />
            <div className="flex flex-wrap gap-4 text-sm items-center shrink-0">
              <span className="text-[var(--text-subtle)]">Sort:</span>
              <Link href={`${sortBase}${sortSep}sort=price-asc`} className="text-[var(--text-muted)] hover:text-[var(--brand)] font-medium">
                Price ↑
              </Link>
              <Link href={`${sortBase}${sortSep}sort=price-desc`} className="text-[var(--text-muted)] hover:text-[var(--brand)] font-medium">
                Price ↓
              </Link>
              <span className="text-[var(--text-subtle)] ml-2">{products.length} products</span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 card p-10">
              <p className="text-lg text-[var(--text-muted)] mb-4">No products match this filter.</p>
              <Link href="/products" className="btn-primary">View All Products</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {products.map((p) => {
                const seed = getProductSeed(p.slug);
                return (
                  <ShopProductCard
                    key={p.id}
                    slug={p.slug}
                    name={p.name}
                    shortDesc={p.shortDesc}
                    priceUsd={p.priceUsd}
                    stock={p.stock}
                    imageCard={p.imageCard}
                    category={p.category}
                    specHighlights={seed ? specHighlights(seed) : undefined}
                  />
                );
              })}
            </div>
          )}

          <section className="mt-20 mb-16">
            <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Before You Order</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Buying Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BUYING_GUIDES.map((g) => (
                <Link key={g.href} href={g.href} className="card card-hover p-6">
                  <h3 className="font-bold text-[var(--text)] mb-2">{g.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{g.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <ContactCTA title="Need a Bulk Quote or Custom Rack Configuration?" />
        </div>
      </div>
    </>
  );
}
