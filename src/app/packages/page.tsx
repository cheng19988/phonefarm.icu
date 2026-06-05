import Image from "next/image";
import Link from "next/link";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Hardware Deployment Packages — Compare & Quote",
  description:
    "Compare PhoneFarm ICU hardware packages: starter rack, motherboard density, iPhone farm, and enterprise cabinet. Request a quote for your device quantity and shipping destination.",
  path: "/packages",
});

const COMPARE_ROWS: { key: keyof (typeof HARDWARE_PACKAGES)[0]["comparison"]; label: string }[] = [
  { key: "deviceQuantity", label: "Recommended device quantity" },
  { key: "mainHardware", label: "Main hardware included" },
  { key: "coolingLevel", label: "Cooling level" },
  { key: "powerLayout", label: "Power layout" },
  { key: "bestFor", label: "Best for" },
  { key: "supportLevel", label: "Support level" },
];

export default function PackagesPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hardware Deployment Packages</h1>
        <p className="text-slate-400 max-w-3xl mb-10 leading-relaxed">
          Pre-configured hardware bundles from {SITE.name} — phone farm racks, motherboard boxes, cooling, power, and network modules assembled in {SITE.location}. All prices are starting references. Request a quote for your exact device count and freight destination.
        </p>

        {/* Comparison table */}
        <h2 className="text-xl font-bold text-white mb-4">Package Comparison</h2>
        <div className="border border-slate-800 rounded-lg overflow-x-auto mb-16">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="p-4 text-left text-slate-500 w-48">Dimension</th>
                {HARDWARE_PACKAGES.map((pkg) => (
                  <th key={pkg.slug} className="p-4 text-left text-white font-medium">
                    <Link href={`/packages/${pkg.slug}`} className="hover:text-cyan-400">{pkg.name}</Link>
                    <p className="text-xs text-slate-500 font-normal mt-1">From ${pkg.fromPriceUsd}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.key} className="border-b border-slate-800/50">
                  <td className="p-4 text-slate-500">{row.label}</td>
                  {HARDWARE_PACKAGES.map((pkg) => (
                    <td key={pkg.slug} className="p-4 text-slate-300">{pkg.comparison[row.key]}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 text-slate-500">Quote</td>
                {HARDWARE_PACKAGES.map((pkg) => (
                  <td key={pkg.slug} className="p-4">
                    <Link href={`/contact?product=${pkg.slug}`} className="btn-primary text-xs py-1.5 px-3 inline-block">
                      Request Quote
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {HARDWARE_PACKAGES.map((pkg) => (
            <article key={pkg.slug} className="border border-slate-800 rounded-lg overflow-hidden flex flex-col">
              <div className="relative aspect-video">
                <Image src={pkg.image} alt={`${pkg.name} hardware package`} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-white mb-2">{pkg.name}</h2>
                <p className="text-slate-400 text-sm mb-3">{pkg.tagline}</p>
                <p className="text-white font-semibold mb-4">From ${pkg.fromPriceUsd} USD <span className="text-slate-500 font-normal text-sm">(reference)</span></p>
                <ul className="text-sm text-slate-400 space-y-1 mb-6 flex-1">
                  {pkg.includes.slice(0, 4).map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href={`/packages/${pkg.slug}`} className="btn-outline flex-1 text-center text-sm py-2">Package Details</Link>
                  <Link href={`/contact?product=${pkg.slug}`} className="btn-primary flex-1 text-center text-sm py-2">Request Quote</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 p-8 rounded-lg border border-slate-800 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Custom Package Engineering</h2>
          <p className="text-slate-400 mb-4">Mix catalog SKUs into a tailored rack layout — share device quantity, models, and shipping country.</p>
          <p className="text-sm text-slate-500 mb-6">
            WhatsApp {CONTACT.whatsapp} · Telegram {CONTACT.telegram} · {CONTACT.email}
          </p>
          <Link href="/contact" className="btn-primary">Contact Sales</Link>
        </section>

        <div className="mt-16">
          <ContactCTA title="Get Hardware Recommendation for Your Scale" />
        </div>
      </div>
    </div>
  );
}
