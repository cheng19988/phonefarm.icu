import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/ui/price-tag";
import type { HardwarePackage } from "@/data/packages";

export function PackageCard({ pkg, image }: { pkg: HardwarePackage; image?: string }) {
  const hero = image ?? pkg.image;
  const c = pkg.comparison;
  return (
    <article className="card card-hover flex flex-col h-full overflow-hidden">
      <Link href={`/packages/${pkg.slug}`} className="block relative aspect-[4/3] bg-slate-100">
        <Image src={hero} alt={`${pkg.name} hardware package`} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <Link href={`/packages/${pkg.slug}`}>
          <h2 className="text-xl font-bold text-[var(--text)] hover:text-[var(--brand)] mb-1">{pkg.name}</h2>
        </Link>
        <p className="text-sm text-[var(--text-muted)] mb-3">{pkg.tagline}</p>
        <p className="text-xs font-medium text-[var(--brand)] mb-4">{c.deviceQuantity}</p>
        <PriceTag priceUsd={pkg.fromPriceUsd} size="sm" label="USD from" />
        <ul className="text-sm text-[var(--text-muted)] space-y-1.5 my-4 flex-1">
          {pkg.includes.slice(0, 4).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--brand)] shrink-0">•</span>
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-subtle)] mb-4">
          <span>Cooling: {c.coolingLevel}</span>
          <span>Support: {c.supportLevel}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/packages/${pkg.slug}`} className="btn-secondary text-center text-sm py-2.5">
            View Package
          </Link>
          {pkg.productSlugs[0] ? (
            <form action="/api/orders" method="POST">
              <input type="hidden" name="productSlug" value={pkg.productSlugs[0]} />
              <input type="hidden" name="action" value="buy" />
              <button type="submit" className="btn-accent w-full text-sm py-2.5">Order Now</button>
            </form>
          ) : (
            <Link href={`/contact?product=${pkg.slug}`} className="btn-accent text-center text-sm py-2.5">
              Order Now
            </Link>
          )}
        </div>
        <Link href={`/contact?product=${pkg.slug}`} className="text-center text-sm text-[var(--brand)] font-medium mt-2 hover:underline">
          Request Quote →
        </Link>
      </div>
    </article>
  );
}
