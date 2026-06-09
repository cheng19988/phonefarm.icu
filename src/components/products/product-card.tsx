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
}: ShopProductCardProps) {
  const outOfStock = stock <= 0;

  return (
    <article className="group card card-hover flex flex-col h-full rounded-lg overflow-hidden">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden bg-white">
        <Image
          src={imageCard}
          alt={`${name} — phone farm hardware`}
          fill
          className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width:768px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.15em] bg-[var(--dark-bg)]/80 text-white px-3 py-1.5 rounded">
          {category}
        </span>
      </Link>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-lg text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2 line-clamp-2">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-[var(--text-muted)] mb-5 line-clamp-2 flex-1">{shortDesc}</p>
        <div className="flex items-center justify-between mb-5 pt-4 border-t border-[var(--border)]">
          <PriceTag priceUsd={priceUsd} size="sm" />
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href={`/products/${slug}`} className="btn-secondary text-center text-sm py-3">
            Details
          </Link>
          <form action="/api/orders" method="POST">
            <input type="hidden" name="productSlug" value={slug} />
            <input type="hidden" name="action" value="buy" />
            <button type="submit" disabled={outOfStock} className="btn-accent w-full text-sm py-3 disabled:opacity-50">
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
