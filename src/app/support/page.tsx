import Link from "next/link";
import { ContactCTA, ContactBar } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Support — Hardware Help & Sales Contact",
  description:
    "PhoneFarm ICU support for phone farm rack hardware: troubleshooting, quote requests, shipping, and after-sales from Guangzhou.",
  path: "/support",
});

export default function SupportPage() {
  const channels = [
    { title: "Request a Quote", desc: "Bulk orders, custom racks, MOQ, and package configuration.", href: "/contact" },
    { title: "Knowledge Base", desc: "Rack selection, cooling, power planning, shipping, and quote process.", href: "/knowledge-base" },
    { title: "Documentation", desc: "Chassis specs, USB topology, and quote-to-order workflow.", href: "/docs" },
    { title: "FAQ", desc: "Hardware comparisons and common buyer questions.", href: "/faq" },
    { title: "After-Sales", desc: "Replacement parts, remote diagnostics, and maintenance guidance.", href: "/knowledge-base/after-sales-support" },
  ];

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Support Center</h1>
        <p className="text-slate-400 max-w-3xl mb-10">
          {SITE.name} provides hardware support from our Guangzhou team. For quotes and configuration questions, contact sales directly — we do not use a SaaS ticketing portal.
        </p>

        <div className="p-6 rounded-lg border border-slate-800 mb-10">
          <h2 className="font-bold text-white mb-3">Contact Channels</h2>
          <ContactBar />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {channels.map((ch) => (
            <Link key={ch.href} href={ch.href} className="p-5 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
              <h2 className="font-bold text-white mb-2">{ch.title}</h2>
              <p className="text-sm text-slate-400">{ch.desc}</p>
            </Link>
          ))}
        </div>

        <ContactCTA title="Need Help Choosing Hardware?" />
      </div>
    </div>
  );
}
