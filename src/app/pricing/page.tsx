import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { PRICING_TIERS, getCatalogPriceTable } from "@/data/pricing";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Hardware Pricing & Quote Guide",
  description:
    "Reference USD prices for phone farm racks, motherboard boxes, cooling racks, and accessories. Request a written quote for bulk orders, OEM/ODM, and international shipping from Guangzhou.",
  path: "/pricing",
});

export default function PricingPage() {
  const catalog = getCatalogPriceTable();

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hardware Pricing Guide</h1>
        <p className="text-slate-400 max-w-3xl mb-4 leading-relaxed">
          {SITE.name} publishes reference USD prices to help you plan a deployment budget. These are starting prices — not final checkout amounts.
        </p>

        <div className="p-5 rounded-lg border border-slate-800 mb-12 max-w-3xl text-sm text-slate-400 space-y-2">
          <p><strong className="text-white">Reference pricing only.</strong> Final quote depends on quantity, configuration, accessories, shipping destination, and customization level.</p>
          <p>Bulk order and OEM/ODM quotation available on request.</p>
          <p>USDT or bank transfer can be discussed after quote confirmation — not as an instant online checkout flow.</p>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Deployment Scale Reference</h2>
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

        <h2 className="text-xl font-bold text-white mb-2">SKU Reference Price List</h2>
        <p className="text-slate-500 text-sm mb-6">Click any product for specifications. Contact sales for a written quote.</p>
        <div className="border border-slate-800 rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-500 bg-slate-900/50">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Ref. Price (USD)</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((row) => (
                <tr key={row.slug} className="border-b border-slate-800/50">
                  <td className="p-4 text-white font-medium">{row.name}</td>
                  <td className="p-4 text-slate-400">{row.category}</td>
                  <td className="p-4 text-slate-300">from ${row.priceUsd.toFixed(0)}</td>
                  <td className="p-4">
                    <Link href={`/contact?product=${row.slug}`} className="text-cyan-400 hover:text-white mr-3">Quote</Link>
                    <Link href={`/products/${row.slug}`} className="text-slate-500 hover:text-white">Specs</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          Questions? WhatsApp {CONTACT.whatsapp} · <Link href="/contact" className="text-cyan-400 hover:text-white">Contact form</Link>
        </p>

        <div className="mt-16">
          <ContactCTA title="Request a Written Hardware Quote" />
        </div>
      </div>
    </div>
  );
}
