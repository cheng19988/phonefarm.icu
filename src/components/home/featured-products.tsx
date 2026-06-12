import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/ui/price-tag";
import { REFERENCE_PRICE_NOTE } from "@/lib/pricing-copy";
import { SectionHeader } from "@/components/ui/section-header";
import { StockBadge } from "@/components/shared";

type Product = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageHero: string;
  category: string;
};

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [lead, ...rest] = products.slice(0, 3);

  if (!lead) return null;

  return (
    <section className="section">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Featured Hardware"
          title="Flagship Products"
          subtitle="Guangzhou factory-direct catalog — reference USD pricing, written quote before payment, bulk BOM via RFQ."
        />
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mt-4">
          <Link
            href={`/products/${lead.slug}`}
            className="lg:col-span-7 group card card-hover grid md:grid-cols-2 min-h-[400px] overflow-hidden"
          >
            <div className="relative min-h-[240px] md:min-h-full bg-white">
              <Image
                src={lead.imageHero}
                alt={lead.name}
                fill
                className="object-contain p-6 group-hover:scale-[1.02] transition-transform duration-500"
                sizes="60vw"
                priority
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="eyebrow mb-2">{lead.category}</p>
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3 group-hover:text-[var(--brand)] transition-colors">
                {lead.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-3">{lead.shortDesc}</p>
              <div className="flex items-center gap-4 mt-auto">
                <PriceTag priceUsd={lead.priceUsd} size="lg" />
                <StockBadge stock={lead.stock} />
              </div>
            </div>
          </Link>
          <div className="lg:col-span-5 flex flex-col gap-6">
            {rest.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group card card-hover flex flex-1 min-h-[180px] overflow-hidden">
                <div className="relative w-2/5 min-w-[140px] bg-white">
                  <Image src={p.imageHero} alt={p.name} fill className="object-contain p-2" sizes="200px" />
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)] mb-1">{p.category}</p>
                  <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2">{p.name}</h3>
                  <PriceTag priceUsd={p.priceUsd} size="sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-[var(--text-subtle)] mt-6 max-w-xl mx-auto">{REFERENCE_PRICE_NOTE}</p>
        <div className="text-center mt-6">
          <Link href="/products" className="btn-outline-dark">
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
