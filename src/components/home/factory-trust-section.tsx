import Image from "next/image";
import { IMAGES } from "@/lib/images";

const FACTORY_IMAGES = [
  { src: IMAGES.company.workshop, label: "Assembly Workshop", desc: "Rack wiring & burn-in" },
  { src: IMAGES.company.warehouse, label: "Export Warehouse", desc: "Packing & dispatch" },
  { src: IMAGES.company.office, label: "Guangzhou Office", desc: "Sales & project support" },
  { src: IMAGES.company.meeting, label: "QC Review", desc: "Pre-shipment inspection" },
  { src: IMAGES.company.frontdesk, label: "Customer Support", desc: "Order & after-sales" },
];

export function FactoryTrustSection() {
  return (
    <section className="section section-dark">
      <div className="container-hero">
        <p className="text-sm font-semibold text-blue-300 uppercase tracking-wide mb-2">Factory Direct</p>
        <h2 className="section-title">QC · Packing · Shipping</h2>
        <p className="section-subtitle text-slate-300">
          Every export shipment passes workshop QC, packing inspection, and accessory checklist before handoff to courier or sea freight.
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
          {FACTORY_IMAGES.map((img) => (
            <div
              key={img.label}
              className="relative shrink-0 w-[min(85vw,420px)] aspect-[16/10] rounded-2xl overflow-hidden snap-start ring-1 ring-white/10"
            >
              <Image src={img.src} alt={img.label} fill className="object-cover" sizes="420px" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-lg">{img.label}</p>
                <p className="text-slate-300 text-sm">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
