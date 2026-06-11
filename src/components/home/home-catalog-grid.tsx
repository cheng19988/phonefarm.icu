import Link from "next/link";
import { ShopProductCard, type ShopProductCardProps } from "@/components/products/product-card";
import { SectionHeader } from "@/components/ui/section-header";

export function HomeCatalogGrid({ products }: { products: ShopProductCardProps[] }) {
  return (
    <section className="section">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Full Catalog"
          title="All Hardware SKUs"
          subtitle="Reference USD pricing and stock status - register to order or contact sales for bulk quotes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {products.map((p) => (
            <ShopProductCard key={p.slug} {...p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="btn-outline-dark">Browse Shop Filters</Link>
        </div>
      </div>
    </section>
  );
}
