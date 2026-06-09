import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/ui/section-header";

const CATEGORIES = [
  {
    title: "Phone Farm Racks",
    desc: "Full-device racks for Android & mixed QA labs",
    href: "/products?group=racks",
    image: IMAGES.phoneFarmBox.hero,
  },
  {
    title: "Motherboard Systems",
    desc: "High-density screenless Android node chassis",
    href: "/products?group=motherboard",
    image: IMAGES.motherboardBox.hero,
  },
  {
    title: "Power & Connectivity",
    desc: "USB hubs, PSU, cooling, and network modules",
    href: "/products?group=power",
    image: IMAGES.usbHub.hero,
  },
];

export function CategoryGateway() {
  return (
    <section className="section section-light">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Product Lines"
          title="Engineered for Real-Device Operations"
          subtitle="Three core hardware families — each configured for your device model list and deployment scale."
        />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href} className="group relative aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden card-hover">
              <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)] via-[var(--dark-bg)]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{cat.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{cat.desc}</p>
                <span className="text-[var(--accent)] text-sm font-semibold tracking-wide">View line →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
