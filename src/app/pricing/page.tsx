import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { PRICING_TIERS, getCatalogPriceTable } from "@/data/pricing";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Pricing — Phone Farm Hardware Plans",
  description:
    "PhoneFarm ICU pricing: starter kits from $428, professional 20-node boxes, enterprise bulk and custom cabinets. USD catalog prices and USDT checkout.",
  path: "/pricing",
});

export default function PricingPage() {
  const catalog = getCatalogPriceTable();

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Pricing Plans</h1>
        <p className="section-subtitle max-w-3xl">
          {SITE.name} lists factory-direct hardware prices in USD. Compare tiers below or browse the full catalog with live stock and Buy Now / Get Quote.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PRICING_TIERS.map((tier) => (
            <div key={tier.id} className={`card p-8 flex flex-col ${tier.id === "professional" ? "border-cyan-600" : ""}`}>
              <h2 className="text-xl font-bold text-white">{tier.name}</h2>
              <p className="text-3xl font-bold text-cyan-400 my-4">{tier.priceLabel}</p>
              <p className="text-slate-400 text-sm mb-6">{tier.description}</p>
              <ul className="space-y-2 text-sm text-slate-300 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <Link href={tier.href} className={tier.id === "enterprise" ? "btn-secondary text-center" : "btn-primary text-center"}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Full Catalog Price List</h2>
        <p className="text-slate-400 text-sm mb-6">All SKUs — click for specs, stock, and purchase options.</p>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-400">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (USD)</th>
                <th className="p-4">Stock</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((row) => (
                <tr key={row.slug} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                  <td className="p-4 text-white font-medium">{row.name}</td>
                  <td className="p-4 text-slate-400">{row.category}</td>
                  <td className="p-4 text-cyan-400">${row.priceUsd.toFixed(2)}</td>
                  <td className="p-4 text-slate-400">{row.stock}</td>
                  <td className="p-4">
                    <Link href={`/products/${row.slug}`} className="text-cyan-400 hover:text-white">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16">
          <ContactCTA title="Need Enterprise or Bulk Pricing?" />
        </div>
      </div>
    </div>
  );
}
