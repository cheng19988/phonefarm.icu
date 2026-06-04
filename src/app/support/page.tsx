import Link from "next/link";
import { ContactCTA, ContactBar } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Support Center",
  description:
    "PhoneFarm ICU support: hardware troubleshooting, order help, overseas shipping, remote control setup, and sales contact from Guangzhou.",
  path: "/support",
});

export default function SupportPage() {
  const channels = [
    { title: "Sales and Quotes", desc: "Bulk orders, custom cabinets, MOQ, and package configuration.", href: "/contact" },
    { title: "Knowledge Base", desc: "Setup guides, power, cooling, network, and troubleshooting.", href: "/knowledge-base" },
    { title: "Documentation", desc: "Order flow, USDT payment fields, chassis specs, and integration notes.", href: "/docs" },
    { title: "FAQ", desc: "Phone farm hardware comparisons and common buyer questions.", href: "/faq" },
    { title: "Account and Orders", desc: "Track orders and payment status after login.", href: "/login" },
  ];

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Support Center</h1>
        <p className="section-subtitle max-w-3xl">
          {SITE.name} provides hardware support from our Guangzhou team — not cloud SaaS ticketing. Reach us directly for deployment help.
        </p>

        <div className="card p-6 mb-10">
          <h2 className="font-bold text-white mb-3">Contact Channels</h2>
          <ContactBar />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {channels.map((ch) => (
            <Link key={ch.href} href={ch.href} className="card p-6 hover:border-cyan-800 transition-colors">
              <h2 className="font-bold text-white mb-2">{ch.title}</h2>
              <p className="text-sm text-slate-400">{ch.desc}</p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-6">
            <h2 className="font-bold text-white mb-3">Hardware Support Scope</h2>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>✓ Phone farm box and motherboard box setup</li>
              <li>✓ Power, cooling, and USB hub issues</li>
              <li>✓ Network topology for multi-device farms</li>
              <li>✓ Remote control configuration service</li>
              <li>✓ RMA and warranty (12-month hardware)</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-bold text-white mb-3">Order Support</h2>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>✓ USDT TRC20 payment verification</li>
              <li>✓ Shipping and customs documentation</li>
              <li>✓ Sample units before bulk purchase</li>
              <li>✓ Enterprise MOQ and invoicing</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mb-8">
          Phone: {CONTACT.phone} · Telegram {CONTACT.telegram} · WhatsApp {CONTACT.whatsapp}
        </p>

        <ContactCTA title="Open a Support Request" />
      </div>
    </div>
  );
}
