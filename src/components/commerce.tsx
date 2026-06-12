"use client";

import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { ShopProductCard, type ShopProductCardProps } from "@/components/products/product-card";
import { BuyBox } from "@/components/products/buy-box";
import { RelatedProductsGrid } from "@/components/products/related-products";

export type ProductCardProps = ShopProductCardProps & { specHighlight?: string; large?: boolean };

/** @deprecated use ShopProductCard — kept for existing imports */
export function ProductCard({
  specHighlight,
  specHighlights,
  large: _large,
  ...props
}: ProductCardProps) {
  const highlights = specHighlights ?? (specHighlight ? [specHighlight] : []);
  return <ShopProductCard {...props} specHighlights={highlights} />;
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="card p-4 group">
          <summary className="font-medium text-[var(--text)] cursor-pointer list-none flex justify-between items-center">
            {item.question}
            <span className="text-[var(--text-subtle)] group-open:rotate-45 transition-transform text-xl">+</span>
          </summary>
          <p className="mt-3 text-[var(--text-muted)] text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Primary commerce CTAs on product pages — wraps BuyBox */
export function ProductCommerceActions({
  slug,
  productName,
  stock,
  category = "",
  shortDesc = "",
  priceUsd = 0,
  productLine,
  productLineHref,
  warrantySummary,
}: {
  slug: string;
  productName: string;
  stock: number;
  category?: string;
  shortDesc?: string;
  priceUsd?: number;
  productLine?: string | null;
  productLineHref?: string | null;
  warrantySummary?: string;
}) {
  if (category && shortDesc && priceUsd > 0) {
    return (
      <BuyBox
        slug={slug}
        name={productName}
        category={category}
        shortDesc={shortDesc}
        priceUsd={priceUsd}
        stock={stock}
        model={slug}
        productLine={productLine}
        productLineHref={productLineHref}
        warrantySummary={warrantySummary}
      />
    );
  }

  const disabled = stock <= 0;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Link href={`/contact?product=${slug}`} className="btn-accent">
          Request Quote
        </Link>
        <form action="/api/orders" method="POST">
          <input type="hidden" name="productSlug" value={slug} />
          <input type="hidden" name="action" value="buy" />
          <button type="submit" disabled={disabled} className="btn-secondary disabled:opacity-50">
            Place Order
          </button>
        </form>
        <form action="/api/orders" method="POST">
          <input type="hidden" name="productSlug" value={slug} />
          <input type="hidden" name="action" value="quote" />
          <button type="submit" className="btn-outline-dark">Add to Order</button>
        </form>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
          WhatsApp Sales
        </a>
      </div>
      <p className="text-xs text-[var(--text-subtle)]">
        USDT payment is available after order confirmation. Sales team will confirm payment and update the order status.
      </p>
    </div>
  );
}

type RelatedProduct = {
  slug: string;
  name: string;
  shortDesc?: string;
  priceUsd: number;
  stock?: number;
  imageCard: string;
  category: string;
  specHighlights?: string[];
};

export function RelatedProducts({ products, title = "Related Products" }: { products: RelatedProduct[]; title?: string }) {
  const cards: ShopProductCardProps[] = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    shortDesc: p.shortDesc ?? "",
    priceUsd: p.priceUsd,
    stock: p.stock ?? 10,
    imageCard: p.imageCard,
    category: p.category,
    specHighlights: p.specHighlights,
  }));
  return <RelatedProductsGrid products={cards} title={title} />;
}

/** @deprecated use ProductCommerceActions */
export function ProductQuoteButtons({ slug, productName }: { slug: string; productName: string }) {
  return <ProductCommerceActions slug={slug} productName={productName} stock={10} />;
}

export function BuyButtons({ slug, stock }: { slug: string; stock: number }) {
  return <ProductCommerceActions slug={slug} productName={slug} stock={stock} />;
}
