import Link from "next/link";
import { ShopProductCard, type ShopProductCardProps } from "@/components/products/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import { REFERENCE_PRICE_NOTE } from "@/lib/pricing-copy";

export function HomeCatalogGrid({ products }: { products: ShopProductCardProps[] }) {
  return (
    <section className="section">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Catalog · Rackmount"
          title="Racks, 2U Rows & Cabinet SKUs"
          subtitle="Guangzhou factory-direct catalog — phone farm boxes, motherboard density racks, PSU/cooling/USB modules. Reference USD pricing; written proforma quote before payment."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {products.map((p) => (
            <ShopProductCard key={p.slug} {...p} />
          ))}
        </div>
        <p className="text-center text-xs text-[var(--text-subtle)] mt-8 max-w-2xl mx-auto">{REFERENCE_PRICE_NOTE}</p>
        <div className="text-center mt-6">
          <Link href="/products" className="btn-outline-dark">Browse Shop Filters</Link>
          <span className="mx-2 text-[var(--text-subtle)]">·</span>
          <Link href="/docs/hardware-spec-quick-reference" className="text-[var(--brand)] text-sm font-medium hover:underline">
            Procurement spec checklist
          </Link>
        </div>
      </div>
    </section>
  );
}
