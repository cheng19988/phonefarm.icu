import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/ui/price-tag";
import { ReferencePriceNote } from "@/components/ui/reference-price-note";
import { StockBadge } from "@/components/shared";
import { SAMPLE_ORDER_NOTE } from "@/lib/pricing-copy";

export type ShopProductCardProps = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
  productLine?: string;
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
  productLine,
  specHighlights = [],
}: ShopProductCardProps) {
  const outOfStock = stock <= 0;
  const highlight = specHighlights[0];

  return (
    <article className="group card card-hover flex flex-col h-full rounded-xl overflow-hidden">
      <Link href={`/products/${slug}`} className="block relative aspect-[5/4] overflow-hidden bg-white border-b border-[var(--border)]">
        <Image
          src={imageCard}
          alt={`${name} — phone farm hardware`}
          fill
          className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width:768px) 50vw, 33vw"
        />
      </Link>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{category}</p>
          {productLine ? (
            <span className="text-[10px] text-[var(--text-subtle)]">· {productLine}</span>
          ) : null}
        </div>
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-lg text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2 line-clamp-2 leading-snug">
            {name}
          </h3>
        </Link>
        {highlight ? (
          <p className="text-xs text-[var(--text-subtle)] mb-2 line-clamp-1 border-l-2 border-[var(--accent)] pl-2">
            {highlight}
          </p>
        ) : null}
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 flex-1 leading-relaxed">{shortDesc}</p>
        <div className="mb-4 pt-3 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-1">
            <PriceTag priceUsd={priceUsd} size="sm" />
            <StockBadge stock={stock} />
          </div>
          <ReferencePriceNote />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/contact?product=${slug}`} className="btn-accent text-center text-sm py-2.5">
            Request Quote
          </Link>
          <Link href={`/products/${slug}`} className="btn-secondary text-center text-sm py-2.5">
            Details
          </Link>
        </div>
        <form action="/api/orders" method="POST" className="mt-2">
          <input type="hidden" name="productSlug" value={slug} />
          <input type="hidden" name="action" value="buy" />
          <button
            type="submit"
            disabled={outOfStock}
            title={SAMPLE_ORDER_NOTE}
            className="btn-outline-light w-full text-sm py-2 disabled:opacity-50"
          >
            Sample order
          </button>
        </form>
      </div>
    </article>
  );
}
