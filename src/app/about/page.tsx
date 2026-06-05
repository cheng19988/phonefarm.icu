import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About PhoneFarm ICU — Guangzhou Manufacturer",
  description:
    "PhoneFarm ICU is a Guangzhou-based real-device phone farm hardware brand. Factory-direct boxes, custom solutions, and global delivery since 2017.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">About PhoneFarm ICU</h1>
        <p className="text-xl text-slate-300 mb-4 leading-relaxed">
          PhoneFarm ICU is a hardware manufacturer focused on real-device phone farm infrastructure — not cloud phones, not emulators.
        </p>
        <p className="text-slate-400 mb-6 leading-relaxed">
          From our workshop in <strong className="text-white">{SITE.location}</strong>, we design and assemble phone farm boxes, motherboard chassis, power and cooling modules, and rack-scale cabinets. Since <strong className="text-white">{SITE.since}</strong>, we have shipped to QA labs, mobile app teams, and operations groups in North America, Europe, and Southeast Asia.
        </p>

        <dl className="grid sm:grid-cols-2 gap-4 mb-10 text-sm">
          {[
            { label: "Headquarters", value: SITE.location },
            { label: "Established", value: String(SITE.since) },
            { label: "Core Products", value: "Phone farm boxes, motherboard boxes, infrastructure modules" },
            { label: "Typical Lead Time", value: "5–10 business days (in-stock SKUs)" },
            { label: "MOQ", value: "Single-unit samples available; bulk pricing from 5+ units" },
            { label: "Shipping", value: "DHL / FedEx express and sea freight worldwide" },
          ].map((row) => (
            <div key={row.label} className="card p-4">
              <dt className="text-slate-500 mb-1">{row.label}</dt>
              <dd className="text-white font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Physical Hardware Only", desc: "Every enclosure runs real smartphones or motherboards with genuine device fingerprints." },
            { title: "Production QC", desc: "Burn-in testing, cable routing checks, and thermal validation before each shipment leaves Guangzhou." },
            { title: "Custom Engineering", desc: "Node counts, chassis dimensions, and rack layouts tailored to your device models and density targets." },
            { title: "B2B Sales Process", desc: "Written quotes, spec sheets, and pre-sales engineering — not anonymous checkout-only flows." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="font-bold text-white mb-2">{item.title}</h2>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Our Guangzhou Facilities</h2>
        <p className="text-slate-400 mb-6">Office, front desk, meeting rooms, production workshop, and warehouse — real factory capacity ready for global delivery.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { src: IMAGES.company.office, label: "Office" },
            { src: IMAGES.company.frontdesk, label: "Front Desk" },
            { src: IMAGES.company.meeting, label: "Meeting Room" },
            { src: IMAGES.company.workshop, label: "Production Workshop" },
            { src: IMAGES.company.warehouse, label: "Warehouse & Shipping" },
            { src: IMAGES.phoneFarmBox.hero, label: "Assembly & Testing" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={img.src} alt={img.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                <span className="text-white text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <ContactCTA title="Partner With PhoneFarm ICU" />
      </div>
    </div>
  );
}
