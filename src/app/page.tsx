import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { HomeLeadForm } from "@/components/home-lead-form";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { PRICING_TIERS } from "@/data/pricing";
import { IMAGES } from "@/lib/images";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Manufacturer — Guangzhou",
  description:
    "PhoneFarm ICU supplies real-device phone farm racks, motherboard boxes, fan cooling racks, USB hubs, power supplies, and SIM bank hardware. Request a quote for bulk deployment from Guangzhou.",
  path: "/",
});

const TRUST_ITEMS = [
  { label: "Since 2017", detail: "Guangzhou hardware assembly" },
  { label: "MOQ from 1 unit", detail: "Sample & bulk orders" },
  { label: "5–10 day lead time", detail: "In-stock SKUs" },
  { label: "Global shipping", detail: "DHL / FedEx / sea freight" },
  { label: "Pre-shipment QC", detail: "Burn-in & packing check" },
  { label: "WhatsApp support", detail: CONTACT.whatsapp },
];

const PRODUCT_LINES = [
  {
    name: "Phone Farm Racks & Boxes",
    desc: "Industrial enclosures for real smartphones — centralized power, cooling, and USB routing.",
    href: "/products?category=Phone%20Farm%20Box",
    image: IMAGES.phoneFarmBox.card,
  },
  {
    name: "Motherboard Boxes",
    desc: "High-density screenless Android nodes for QA labs and device management teams.",
    href: "/products/motherboard-box",
    image: IMAGES.motherboardBox.card,
  },
  {
    name: "Cooling & Power",
    desc: "Fan cooling racks, PSU modules, and airflow kits for dense rack deployments.",
    href: "/products/cooling-solution",
    image: IMAGES.cooling.card,
  },
  {
    name: "USB Hub & Cables",
    desc: "Industrial USB hubs, data cables, and connectivity accessories for multi-device racks.",
    href: "/products/usb-hub",
    image: IMAGES.usbHub.card,
  },
  {
    name: "Network & SIM Bank",
    desc: "Routers, switches, and network modules for isolated device clusters.",
    href: "/products/network-equipment",
    image: IMAGES.network.card,
  },
  {
    name: "Custom Rack & Cabinet",
    desc: "Floor-standing or rackmount cabinets engineered to your node count and device models.",
    href: "/products/custom-cabinet",
    image: IMAGES.customCabinet.card,
  },
];

const WHY_US = [
  { title: "Real physical devices", desc: "Racks and boxes built for actual smartphones and motherboards — not cloud phones or emulators." },
  { title: "Guangzhou assembly", desc: "Hardware assembled, wired, and tested in our workshop before export packing." },
  { title: "Thermal & power planning", desc: "Cooling racks and PSU layouts matched to your device count and ambient conditions." },
  { title: "Bulk deployment support", desc: "Pre-sales configuration help for 5+ unit orders, custom racks, and overseas shipping." },
  { title: "After-sales hardware support", desc: "Replacement parts, remote diagnostics, and maintenance guidance for production farms." },
];

const USE_CASES = [
  { title: "Mobile app QA labs", desc: "Regression testing across OS versions on real hardware clusters." },
  { title: "Device management infrastructure", desc: "Centralized racks for fleet provisioning and firmware validation." },
  { title: "Social media agency hardware", desc: "Physical device banks for content testing and client account workflows." },
  { title: "SIM & device testing lab", desc: "Isolated racks for carrier profile, SIM bank, and connectivity testing." },
  { title: "Enterprise mobile ops", desc: "Rack-scale deployments with documented power, cooling, and network layout." },
];

const QUOTE_STEPS = [
  { step: "1", title: "Tell us device quantity", desc: "Share target node count, device models (Android/iPhone), and use case." },
  { step: "2", title: "Confirm rack / box solution", desc: "We recommend phone farm rack, motherboard box, or custom cabinet layout." },
  { step: "3", title: "Receive shipping quote", desc: "Final price includes configuration, accessories, and freight to your country." },
  { step: "4", title: "Production & delivery", desc: "Assembly, QC, packing inspection, then express or sea freight dispatch." },
];

export default function HomePage() {
  const previewFaq = FAQ_ITEMS.slice(0, 5);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      {/* Hero */}
      <section className="relative border-b border-slate-800 overflow-hidden">
        <Image
          src={IMAGES.homeHero}
          alt="Phone farm rack hardware assembled in Guangzhou workshop"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />
        <div className="container-wide relative py-20 md:py-28">
          <p className="text-slate-400 text-sm mb-4">{SITE.location} · Est. {SITE.since}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight mb-5">
            {SITE.headline}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">{SITE.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-6 py-3">Request a Quote</Link>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-3">WhatsApp Inquiry</a>
            <Link href="/contact" className="btn-outline px-6 py-3">Get Hardware Recommendation</Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-slate-800 bg-slate-900/40">
        <div className="container-wide py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <p className="text-white font-semibold text-sm">{item.label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product lines */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Core Hardware Product Lines</h2>
          <p className="text-slate-400 mb-10 max-w-2xl">
            Browse by equipment category — not individual SKU listings. Each line supports sample orders and bulk quotation.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_LINES.map((line) => (
              <Link key={line.name} href={line.href} className="flex gap-4 p-4 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
                <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden bg-slate-900">
                  <Image src={line.image} alt={line.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{line.name}</h3>
                  <p className="text-sm text-slate-400">{line.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/products" className="text-cyan-400 hover:text-white text-sm">View full hardware catalog →</Link>
          </p>
        </div>
      </section>

      {/* Recommended packages */}
      <section className="py-16 md:py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Recommended Hardware Setups</h2>
          <p className="text-slate-400 mb-10 max-w-2xl">
            Packages grouped by deployment scale. All prices are starting references — contact sales for a written quote.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.id} className={`p-6 rounded-lg border ${tier.id === "professional" ? "border-slate-500 bg-slate-900/50" : "border-slate-800"}`}>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{tier.name}</p>
                <p className="text-2xl font-bold text-white mb-2">{tier.priceLabel}</p>
                <p className="text-sm text-slate-400 mb-4">{tier.description}</p>
                <ul className="text-sm text-slate-400 space-y-1.5 mb-6">
                  {tier.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
                <Link href={tier.href} className="btn-primary w-full text-center text-sm py-2">{tier.cta}</Link>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HARDWARE_PACKAGES.map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="p-4 rounded-lg border border-slate-800 hover:border-slate-600">
                <p className="font-medium text-white text-sm">{pkg.name}</p>
                <p className="text-xs text-slate-500 mt-1">From ${pkg.fromPriceUsd} · {pkg.comparison.bestFor}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/packages" className="text-cyan-400 hover:text-white text-sm">Compare all packages →</Link>
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 md:py-20 border-t border-slate-800">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Why Buyers Choose PhoneFarm ICU</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="border-l-2 border-slate-700 pl-5">
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 md:py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Typical Deployment Scenarios</h2>
          <p className="text-slate-400 mb-10 max-w-2xl">Hardware used by QA teams, device labs, and infrastructure buyers — not consumer resale.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="p-5 rounded-lg border border-slate-800">
                <h3 className="font-medium text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-slate-400">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote process */}
      <section className="py-16 md:py-20 border-t border-slate-800">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">How to Request a Quote</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {QUOTE_STEPS.map((s) => (
              <div key={s.step}>
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-slate-600 text-slate-300 text-sm font-medium mb-3">{s.step}</span>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-6">Guangzhou Assembly & Packing</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { src: IMAGES.company.workshop, label: "Assembly workshop" },
              { src: IMAGES.company.warehouse, label: "Export packing" },
              { src: IMAGES.company.office, label: "Sales & engineering" },
              { src: IMAGES.company.meeting, label: "Pre-sales review" },
              { src: IMAGES.company.frontdesk, label: "Receiving & dispatch" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={`PhoneFarm ICU ${img.label}`} fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 px-2 py-1.5">
                  <span className="text-white text-xs">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeLeadForm />

      {/* FAQ */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Common Questions</h2>
          <FAQAccordion items={previewFaq} />
          <p className="text-center mt-6">
            <Link href="/faq" className="text-cyan-400 hover:text-white text-sm">All FAQ →</Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-wide">
          <ContactCTA title="Request a Quote for Your Phone Farm Hardware" />
        </div>
      </section>
    </>
  );
}
