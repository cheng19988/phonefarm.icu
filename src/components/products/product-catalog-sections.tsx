import { SHOP_FILTERS } from "@/lib/config";
import { ShopProductCard } from "./product-card";
import type { ShopProductCardProps } from "./product-card";

type Product = ShopProductCardProps;

const CATALOG_SECTIONS = SHOP_FILTERS.filter((f) => f.categories !== null) as {
  key: string;
  label: string;
  categories: string[];
}[];

type Props = {
  products: Product[];
};

export function ProductCatalogSections({ products }: Props) {
  return (
    <div className="space-y-16">
      {CATALOG_SECTIONS.map((section) => {
        const items = products.filter((p) => section.categories.includes(p.category));
        if (items.length === 0) return null;
        return (
          <section key={section.key}>
            <div className="flex items-end justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">{section.label}</h2>
              <span className="text-sm text-[var(--text-subtle)] shrink-0">{items.length} items</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {items.map((p) => (
                <ShopProductCard key={p.slug} {...p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
