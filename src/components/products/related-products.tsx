import { ShopProductCard, type ShopProductCardProps } from "./product-card";

type Props = {
  products: ShopProductCardProps[];
  title?: string;
};

export function RelatedProductsGrid({ products, title = "Related Products" }: Props) {
  if (products.length === 0) return null;

  return (
    <section>
      <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">You may also need</p>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((p) => (
          <ShopProductCard key={p.slug} {...p} specHighlights={p.specHighlights?.slice(0, 2)} />
        ))}
      </div>
    </section>
  );
}
