import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { PRICING_TIERS, getCatalogPriceTable } from "@/data/pricing";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Hardware Pricing — Shop & Bulk Quotes",
  description:
    "USD prices for phone farm racks, motherboard boxes, cooling, and accessories. Buy online with USDT or contact sales for bulk orders from Guangzhou.",
  path: "/pricing",
});

export default function PricingPage() {
  const catalog = getCatalogPriceTable();

  return (
    <div className="section">
      <div className="container-hero">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hardware Pricing</h1>
        <p className="text-slate-400 max-w-3xl mb-4 leading-relaxed">
          {SITE.name} publishes USD catalog prices. Register to place orders — USDT payment available after order confirmation.
        </p>

        <div className="p-5 rounded-lg border border-slate-800 mb-12 max-w-3xl text-sm text-slate-400 space-y-2">
          <p><strong className="text-white">Shop online:</strong> Sign up, add products to order, pay with USDT (TRC20) within 30 minutes.</p>
          <p><strong className="text-white">Bulk orders:</strong> Contact sales for quantity discounts, OEM/ODM, and international freight quotes.</p>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Deployment Scale</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PRICING_TIERS.map((tier) => (
            <div key={tier.id} className={`p-6 rounded-lg border flex flex-col ${tier.id === "professional" ? "border-slate-500" : "border-slate-800"}`}>
              <h2 className="text-lg font-bold text-white">{tier.name}</h2>
              <p className="text-2xl font-bold text-white my-3">{tier.priceLabel}</p>
              <p className="text-slate-400 text-sm mb-4">{tier.description}</p>
              <ul className="space-y-1.5 text-sm text-slate-400 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
              <Link href={tier.href} className="btn-primary text-center text-sm py-2">
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mb-2">SKU Price List</h2>
        <p className="text-slate-500 text-sm mb-6">Buy online or open product page for full specifications.</p>
        <div className="border border-slate-800 rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-500 bg-slate-900/50">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (USD)</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((row) => (
                <tr key={row.slug} className="border-b border-slate-800/50">
                  <td className="p-4 text-white font-medium">{row.name}</td>
                  <td className="p-4 text-slate-400">{row.category}</td>
                  <td className="p-4 text-slate-300">${row.priceUsd.toFixed(0)}</td>
                  <td className="p-4 space-x-3">
                    <Link href={`/products/${row.slug}`} className="text-cyan-400 hover:text-white">Buy / Specs</Link>
                    <Link href={`/contact?product=${row.slug}`} className="text-slate-500 hover:text-white">Bulk Quote</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          Questions? WhatsApp {CONTACT.whatsapp} · <Link href="/register" className="text-cyan-400 hover:text-white">Sign up</Link> · <Link href="/contact" className="text-cyan-400 hover:text-white">Contact sales</Link>
        </p>

        <div className="mt-16">
          <ContactCTA title="Ready to Order or Need a Bulk Quote?" />
        </div>
      </div>
    </div>
  );
}
