import Link from "next/link";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { ContactCTA } from "@/components/shared";
import { PackageHero } from "@/components/packages/package-hero";
import { PackageCard } from "@/components/packages/package-card";
import { PackageComparisonTable } from "@/components/packages/comparison-table";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Hardware Deployment Packages — Compare & Order",
  description:
    "Compare PhoneFarm ICU hardware packages: starter rack, motherboard density, iPhone farm, and enterprise cabinet. Order online or request a bulk quote.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PackageHero />

      <div className="section section-light pt-0">
        <div className="container-hero">
          <section className="mb-20">
            <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Compare Bundles</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Package Comparison</h2>
            <PackageComparisonTable />
          </section>

          <section id="packages" className="mb-20">
            <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Shop Bundles</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Choose Your Package</h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {HARDWARE_PACKAGES.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          </section>

          <section className="mb-20 p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50">
            <h2 className="text-xl font-bold text-[var(--text)] mb-4">How to Choose a Package</h2>
            <div className="grid md:grid-cols-2 gap-6 text-[var(--text-muted)] text-sm leading-relaxed">
              <div>
                <p className="font-semibold text-[var(--text)] mb-2">Starter / sample order</p>
                <p>Choose Starter Box Bundle for first rack evaluation. Sample orders from 1 unit — ideal for QA teams validating real-device workflows before scaling.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text)] mb-2">Professional / density</p>
                <p>Motherboard Density Pack or iPhone Farm Suite for specialized labs. Share device models for slot and cable matching.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text)] mb-2">Enterprise / bulk</p>
                <p>Enterprise Rack Deployment for 40–100+ devices. MOQ and custom cabinet layouts quoted by sales — USDT or T/T on confirmation.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text)] mb-2">Custom mix</p>
                <p>Mix catalog SKUs into a tailored layout. <Link href="/products" className="text-[var(--brand)] hover:underline">Browse products</Link> or <Link href="/contact" className="text-[var(--brand)] hover:underline">contact sales</Link> for bundle engineering.</p>
              </div>
            </div>
          </section>

          <section className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">Sample Order &amp; Bulk Orders</h2>
            <p className="text-[var(--text-muted)] mb-6">
              Register to place hardware orders online from {SITE.location}. USDT payment is available after order confirmation.
              Bulk projects receive written quotes with freight and MOQ — sales team typically replies within one business day.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/register" className="btn-primary">Sign Up to Order</Link>
              <Link href="/contact" className="btn-outline">Contact Sales</Link>
            </div>
          </section>

          <ContactCTA title="Get Hardware Recommendation for Your Scale" />
        </div>
      </div>
    </>
  );
}
