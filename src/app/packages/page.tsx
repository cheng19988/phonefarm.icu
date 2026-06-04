import Image from "next/image";
import Link from "next/link";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Hardware Deployment Packages",
  description:
    "PhoneFarm ICU hardware bundles: starter box kits, motherboard density packs, iPhone farm suites, and enterprise rack deployments from Guangzhou.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Hardware Deployment Packages</h1>
        <p className="section-subtitle max-w-3xl">
          Pre-built hardware bundles from {SITE.name} — real-device phone farm boxes, accessories, and deployment support. Not software subscriptions; factory-direct equipment from {SITE.location}.
        </p>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-4">Why PhoneFarm ICU Hardware?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 border-cyan-800/50">
              <h3 className="font-bold text-cyan-400 mb-3">PhoneFarm ICU (Real Device Hardware)</h3>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>✓ Real smartphones and motherboard nodes</li>
                <li>✓ Factory-direct from Guangzhou since 2017</li>
                <li>✓ Full catalog: boxes, USB, power, cooling, network</li>
                <li>✓ Remote control setup support (not SaaS lock-in)</li>
                <li>✓ USDT checkout and B2B bulk quotes</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-slate-400 mb-3">Browser / Cloud Tools (Generic)</h3>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>✗ Not optimized for mobile-first platforms</li>
                <li>✗ Cloud phones lack real device fingerprints</li>
                <li>✗ No integrated hardware + rack deployment</li>
                <li>✗ Per-seat software fees without factory support</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {HARDWARE_PACKAGES.map((pkg) => (
            <article key={pkg.slug} className="card overflow-hidden flex flex-col">
              <div className="relative aspect-video">
                <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-cyan-400 uppercase tracking-wide mb-1">Package</p>
                <h2 className="text-xl font-bold text-white mb-2">{pkg.name}</h2>
                <p className="text-slate-400 text-sm mb-4">{pkg.tagline}</p>
                <p className="text-2xl font-bold text-cyan-400 mb-4">From ${pkg.fromPriceUsd}</p>
                <ul className="text-sm text-slate-400 space-y-1 mb-6 flex-1">
                  {pkg.includes.slice(0, 4).map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href={`/packages/${pkg.slug}`} className="btn-primary flex-1 text-center">
                    View Package
                  </Link>
                  <Link href="/contact" className="btn-secondary flex-1 text-center">
                    Get Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 card p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Custom Package Engineering</h2>
          <p className="text-slate-400 mb-6">Mix catalog SKUs into a tailored deployment — contact sales with quantity and timeline.</p>
          <p className="text-sm text-slate-500">
            WhatsApp {CONTACT.whatsapp} · Telegram {CONTACT.telegram} · {CONTACT.email}
          </p>
        </section>
      </div>
    </div>
  );
}
