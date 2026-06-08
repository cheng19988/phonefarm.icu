import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge } from "@/components/shared";

export type ShopProductCardProps = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
  specHighlights?: string[];
};

export function ShopProductCard({
  slug,
  name,
  shortDesc,
  priceUsd,
  stock,
  imageCard,
  category,
  specHighlights = [],
}: ShopProductCardProps) {
  const outOfStock = stock <= 0;

  return (
    <article className="card card-hover group flex flex-col h-full">
      <Link href={`/products/${slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageCard}
          alt={`${name} — phone farm hardware`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 text-xs font-medium bg-white/95 text-[var(--text-muted)] px-2.5 py-1 rounded-md shadow-sm">
          {category}
        </span>
      </Link>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2 line-clamp-2 text-lg">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{shortDesc}</p>
        {specHighlights.length > 0 && (
          <ul className="text-xs text-[var(--text-subtle)] space-y-1 mb-4 flex-1">
            {specHighlights.slice(0, 4).map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-[var(--brand)] shrink-0">•</span>
                <span className="line-clamp-1">{s}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between mb-4 mt-auto">
          <PriceTag priceUsd={priceUsd} size="sm" />
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Link href={`/products/${slug}`} className="btn-secondary text-center text-sm py-2.5">
            View Details
          </Link>
          <form action="/api/orders" method="POST">
            <input type="hidden" name="productSlug" value={slug} />
            <input type="hidden" name="action" value="buy" />
            <button type="submit" disabled={outOfStock} className="btn-accent w-full text-sm py-2.5 disabled:opacity-50">
              Buy Now
            </button>
          </form>
        </div>
        <Link
          href={`/contact?product=${slug}`}
          className="text-center text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] py-1"
        >
          Request Quote →
        </Link>
      </div>
    </article>
  );
}
