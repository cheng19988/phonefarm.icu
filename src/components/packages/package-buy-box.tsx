import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { PriceTag } from "@/components/ui/price-tag";
import { ReferencePriceNote } from "@/components/ui/reference-price-note";
import type { HardwarePackage } from "@/data/packages";

export function PackageBuyBox({ pkg }: { pkg: HardwarePackage }) {
  const c = pkg.comparison;
  const primarySlug = pkg.productSlugs[0];

  return (
    <div className="lg:sticky lg:top-28">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3 leading-tight">{pkg.name}</h2>
      <p className="text-base text-[var(--text-muted)] mb-6">{pkg.tagline}</p>

      <div className="p-5 rounded-2xl border border-[var(--border)] bg-white shadow-sm mb-6">
        <PriceTag priceUsd={pkg.fromPriceUsd} size="lg" label="USD reference from" />
        <ReferencePriceNote className="mt-2" />
        <p className="text-xs text-[var(--text-subtle)] mt-1">Bundle BOM and freight confirmed in a written quotation.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-6">
        <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
          <p className="text-[var(--text-subtle)] text-xs mb-1">Device quantity</p>
          <p className="font-medium text-[var(--text)]">{c.deviceQuantity}</p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
          <p className="text-[var(--text-subtle)] text-xs mb-1">Cooling</p>
          <p className="font-medium text-[var(--text)]">{c.coolingLevel}</p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--surface-muted)] col-span-2">
          <p className="text-[var(--text-subtle)] text-xs mb-1">Included hardware</p>
          <p className="font-medium text-[var(--text)]">{c.mainHardware}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <Link href={`/contact?product=${pkg.slug}`} className="btn-accent w-full py-3.5 text-base text-center block">
          Request Package Quote
        </Link>
        {primarySlug && (
          <p className="text-xs text-[var(--text-subtle)] text-center">
            Bundle pricing is confirmed by sales — individual SKUs such as{" "}
            <Link href={`/products/${primarySlug}`} className="text-[var(--brand)] hover:underline">
              {primarySlug.replace(/-/g, " ")}
            </Link>{" "}
            can be ordered separately from the shop.
          </p>
        )}
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark w-full text-sm py-3 text-center block">
          WhatsApp Sales
        </a>
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">
        USDT payment is available after order confirmation. Sales team will confirm payment and update the order status.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl border border-[var(--border)]">
          <p className="font-semibold text-[var(--text)] mb-1">Shipping</p>
          <p className="text-[var(--text-subtle)]">Global export from Guangzhou</p>
        </div>
        <div className="p-3 rounded-xl border border-[var(--border)]">
          <p className="font-semibold text-[var(--text)] mb-1">Support</p>
          <p className="text-[var(--text-subtle)]">{c.supportLevel}</p>
        </div>
      </div>
    </div>
  );
}
