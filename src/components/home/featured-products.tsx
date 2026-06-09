import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/ui/price-tag";
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
    <section className="section section-muted">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Featured Hardware"
          title="Flagship Products"
          subtitle="Reference USD pricing — register to order online or contact sales for bulk deployment quotes."
        />
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mt-4">
          <Link href={`/products/${lead.slug}`} className="lg:col-span-7 group card card-hover relative min-h-[420px] lg:min-h-[520px] rounded-lg overflow-hidden">
            <Image src={lead.imageHero} alt={lead.name} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" sizes="60vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-[var(--accent)] text-xs uppercase tracking-[0.2em] mb-2">{lead.category}</p>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">{lead.name}</h3>
              <p className="text-slate-300 text-sm mb-4 max-w-lg line-clamp-2">{lead.shortDesc}</p>
              <div className="flex items-center gap-4">
                <PriceTag priceUsd={lead.priceUsd} size="lg" label="USD" />
                <StockBadge stock={lead.stock} />
              </div>
            </div>
          </Link>
          <div className="lg:col-span-5 flex flex-col gap-6">
            {rest.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group card card-hover flex flex-1 min-h-[200px] overflow-hidden rounded-lg">
                <div className="relative w-2/5 min-w-[140px]">
                  <Image src={p.imageHero} alt={p.name} fill className="object-cover" sizes="200px" />
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
        <div className="text-center mt-12">
          <Link href="/products" className="btn-outline-dark">
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
