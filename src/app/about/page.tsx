import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { TrustStrip } from "@/components/trust-strip";
import { ContentHero } from "@/components/content/content-hero";
import { buildMetadata } from "@/lib/seo";
import { FACTORY_IMAGES } from "@/lib/site-images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About — Guangzhou Phone Farm Hardware Manufacturer",
  description:
    "PhoneFarm ICU assembles phone farm racks, motherboard boxes, and cooling infrastructure in Guangzhou. Hardware testing, packing inspection, and bulk quote support since 2017.",
  path: "/about",
});

const WORKFLOW = [
  { step: "Sourcing", desc: "Components and chassis materials selected for rack-grade durability." },
  { step: "Assembly", desc: "Wiring, power bus, and USB routing assembled in Guangzhou workshop." },
  { step: "QC", desc: "Burn-in, cable continuity, and thermal spot-check before packing." },
  { step: "Packing", desc: "Accessory checklist, foam fit, and export carton inspection." },
  { step: "Shipping", desc: "Express or sea freight from Guangzhou — freight quoted by destination." },
];

const SUPPLY = [
  "Phone farm racks & boxes",
  "Motherboard boxes",
  "USB hubs & power supply",
  "Cooling modules",
  "Network equipment",
  "Hardware packages",
];

const WHY = [
  { title: "Factory direct", desc: "Guangzhou assembly — not reseller markup on anonymous drop-ship hardware." },
  { title: "Visible pricing", desc: "Reference USD catalog prices online — bulk and custom quoted in writing." },
  { title: "Order + quote paths", desc: "Register, Buy Now, or contact sales for bulk and custom racks." },
  { title: "USDT after confirmation", desc: "USDT payment available after order confirmation. Sales team confirms payment and updates order status." },
];

const FACTORY_GALLERY = [
  { src: FACTORY_IMAGES.assembly, label: "Assembly workshop" },
  { src: FACTORY_IMAGES.qc, label: "QC review" },
  { src: FACTORY_IMAGES.packing, label: "Export packing" },
  { src: FACTORY_IMAGES.warehouse, label: "Warehouse dispatch" },
  { src: FACTORY_IMAGES.office, label: "Sales & engineering" },
];

export default function AboutPage() {
  return (
    <>
      <ContentHero
        eyebrow="Guangzhou Factory Direct"
        title="Real-Device Phone Farm Hardware — Built in Guangzhou"
        subtitle={`${SITE.name} designs, assembles, and exports phone farm racks, motherboard boxes, and infrastructure modules for QA labs and device management teams since ${SITE.since}.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn-accent px-7 py-3">Browse Products</Link>
          <Link href="/register" className="btn-primary px-7 py-3">Sign Up to Order</Link>
          <Link href="/contact" className="btn-outline px-7 py-3">Contact Sales</Link>
        </div>
      </ContentHero>
      <TrustStrip variant="light" />

      <div className="section section-light">
        <div className="container-hero">
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Factory Facts</h2>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Location", value: `${SITE.location} — assembly & export` },
                { label: "Established", value: String(SITE.since) },
                { label: "Focus", value: "Phone farm racks, motherboard boxes, cooling, USB, power" },
                { label: "Lead time", value: "5–10 business days (in-stock SKUs)" },
                { label: "MOQ", value: "1 unit sample; bulk from 5+ units" },
                { label: "Shipping", value: "DHL / FedEx express; sea freight for bulk" },
              ].map((row) => (
                <div key={row.label} className="p-5 rounded-2xl border border-[var(--border)] bg-white">
                  <dt className="text-[var(--text-subtle)] text-sm mb-1">{row.label}</dt>
                  <dd className="text-[var(--text)] font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">What We Supply</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUPPLY.map((item) => (
                <div key={item} className="flex gap-3 p-4 rounded-xl bg-[var(--surface-muted)] text-[var(--text-muted)]">
                  <span className="text-[var(--brand)] font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Factory Workflow</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {WORKFLOW.map((w, i) => (
                <div key={w.step} className="shrink-0 w-[min(85vw,280px)] snap-start p-6 rounded-2xl border border-[var(--border)] bg-white">
                  <span className="text-[var(--accent)] font-bold text-lg">{i + 1}</span>
                  <h3 className="font-bold text-[var(--text)] mt-2 mb-2">{w.step}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{w.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Why Buyers Choose Us</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {WHY.map((w) => (
                <div key={w.title} className="p-6 rounded-2xl border border-[var(--border)] bg-white">
                  <h3 className="font-bold text-[var(--text)] mb-2">{w.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm">{w.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">Workshop &amp; Facilities</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {FACTORY_GALLERY.map((img) => (
                <div key={img.label} className="relative shrink-0 w-[min(85vw,420px)] aspect-[16/10] rounded-2xl overflow-hidden snap-start ring-1 ring-[var(--border)]">
                  <Image src={img.src} alt={`PhoneFarm ICU ${img.label}`} fill className="object-cover" sizes="420px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white font-semibold">{img.label}</p>
                </div>
              ))}
            </div>
          </section>

          <ContactCTA title="Request a Quote from Our Guangzhou Team" />
        </div>
      </div>
    </>
  );
}
