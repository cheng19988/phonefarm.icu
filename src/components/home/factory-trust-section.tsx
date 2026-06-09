import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/ui/section-header";

const FACTORY = [
  { src: IMAGES.company.workshop, label: "Assembly Workshop", desc: "Rack wiring, burn-in, and QC" },
  { src: IMAGES.company.warehouse, label: "Export Warehouse", desc: "Packing inspection before dispatch" },
  { src: IMAGES.company.meeting, label: "Engineering Review", desc: "Layout and compatibility checks" },
];

export function FactoryTrustSection() {
  return (
    <section className="section section-dark">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Factory Direct"
          title="From Workshop to Your Lab"
          subtitle="Every shipment passes assembly QC, packing checklist, and export documentation from our Guangzhou facility."
          dark
        />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-4">
          {FACTORY.map((img, i) => (
            <div
              key={img.label}
              className={`relative rounded-lg overflow-hidden ring-1 ring-white/10 ${i === 0 ? "md:row-span-1 aspect-[4/5] md:aspect-auto md:min-h-[480px]" : "aspect-[16/10]"}`}
            >
              <Image src={img.src} alt={img.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/95 via-[var(--dark-bg)]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white font-semibold text-lg md:text-xl">{img.label}</p>
                <p className="text-slate-400 text-sm mt-1">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
