import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge } from "@/components/shared";

export type FeaturedProduct = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
};

export function FeaturedProducts({ products }: { products: FeaturedProduct[] }) {
  return (
    <section className="section section-light">
      <div className="container-hero">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Best Sellers</p>
            <h2 className="section-title mb-2">Featured Hardware</h2>
            <p className="section-subtitle mb-0 max-w-2xl">
              Reference USD prices · Buy Now online · USDT payment after order confirmation
            </p>
          </div>
          <Link href="/products" className="btn-outline shrink-0">View All Products</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p) => (
            <article key={p.slug} className="card card-hover group flex flex-col">
              <Link href={`/products/${p.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={p.imageCard}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 100vw, 25vw"
                />
                <span className="absolute top-3 left-3 text-xs font-medium bg-white/95 text-[var(--text-muted)] px-2.5 py-1 rounded-md shadow-sm">
                  {p.category}
                </span>
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <Link href={`/products/${p.slug}`}>
                  <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2 line-clamp-2">
                    {p.name}
                  </h3>
                </Link>
                <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 flex-1">{p.shortDesc}</p>
                <div className="flex items-center justify-between mb-4">
                  <PriceTag priceUsd={p.priceUsd} size="sm" />
                  <StockBadge stock={p.stock} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/products/${p.slug}`} className="btn-secondary text-center text-sm py-2.5">
                    View Details
                  </Link>
                  <form action="/api/orders" method="POST">
                    <input type="hidden" name="productSlug" value={p.slug} />
                    <input type="hidden" name="action" value="buy" />
                    <button
                      type="submit"
                      disabled={p.stock <= 0}
                      className="btn-accent w-full text-sm py-2.5 disabled:opacity-50"
                    >
                      Buy Now
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
