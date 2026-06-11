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
    <section className="section">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Factory Direct"
          title="From Workshop to Your Lab"
          subtitle="Every shipment passes assembly QC, packing checklist, and export documentation from our Guangzhou facility."
        />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-4">
          {FACTORY.map((img) => (
            <article key={img.label} className="card card-hover overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image src={img.src} alt={img.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <p className="font-semibold text-[var(--text)]">{img.label}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">{img.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
