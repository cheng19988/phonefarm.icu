import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About — Guangzhou Phone Farm Hardware Manufacturer",
  description:
    "PhoneFarm ICU assembles phone farm racks, motherboard boxes, and cooling infrastructure in Guangzhou. Hardware testing, packing inspection, and bulk quote support since 2017.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
    <TrustStrip />
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About PhoneFarm ICU</h1>
        <p className="text-lg text-slate-300 mb-4 leading-relaxed">
          PhoneFarm ICU is a Guangzhou-based team that designs, assembles, and exports real-device phone farm hardware — racks, motherboard boxes, fan cooling modules, USB hubs, power supplies, and custom cabinets.
        </p>
        <p className="text-slate-400 mb-8 leading-relaxed">
          We work with QA labs, mobile app teams, device management operations, and infrastructure buyers who need physical hardware — not cloud phones or software subscriptions. Since {SITE.since}, we have shipped to buyers in North America, Europe, and Southeast Asia.
        </p>

        <h2 className="text-xl font-bold text-white mb-4">How We Work</h2>
        <div className="space-y-4 mb-10 text-sm text-slate-400">
          <p><strong className="text-white">Guangzhou assembly and sourcing.</strong> Hardware is wired, assembled, and configured in our workshop — not drop-shipped from anonymous suppliers.</p>
          <p><strong className="text-white">Testing before shipment.</strong> Burn-in checks, cable routing review, and thermal spot-checks on each rack before export.</p>
          <p><strong className="text-white">Packing inspection.</strong> Export cartons are inspected for foam fit, accessory completeness, and shipping label accuracy.</p>
          <p><strong className="text-white">Remote pre-sales support.</strong> Share your device list and room layout — we help plan rack count, cooling, and power before you commit.</p>
          <p><strong className="text-white">Sample, bulk, and custom rack orders.</strong> Single-unit samples, 5+ unit bulk pricing, and custom cabinet discussions are all handled through written quotes.</p>
        </div>

        <dl className="grid sm:grid-cols-2 gap-4 mb-10 text-sm">
          {[
            { label: "Location", value: `${SITE.location} — assembly & export` },
            { label: "Established", value: String(SITE.since) },
            { label: "Product focus", value: "Phone farm racks, motherboard boxes, cooling, USB, power" },
            { label: "Lead time", value: "5–10 business days (in-stock SKUs)" },
            { label: "MOQ", value: "1 unit sample; bulk from 5+ units" },
            { label: "Shipping", value: "DHL / FedEx express; sea freight for bulk" },
          ].map((row) => (
            <div key={row.label} className="p-4 rounded-lg border border-slate-800">
              <dt className="text-slate-500 mb-1">{row.label}</dt>
              <dd className="text-white font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="text-xl font-bold text-white mb-6">Workshop & Packing</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {[
            { src: IMAGES.company.workshop, label: "Assembly workshop" },
            { src: IMAGES.company.warehouse, label: "Export packing" },
            { src: IMAGES.company.office, label: "Sales & engineering" },
            { src: IMAGES.company.meeting, label: "Pre-sales review" },
            { src: IMAGES.company.frontdesk, label: "Receiving & dispatch" },
            { src: IMAGES.phoneFarmBox.hero, label: "Rack testing" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src={img.src} alt={`PhoneFarm ICU ${img.label}`} fill className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 px-2 py-1.5">
                <span className="text-white text-xs">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <ContactCTA title="Request a Quote from Our Guangzhou Team" />
      </div>
    </div>
    </>
  );
}
