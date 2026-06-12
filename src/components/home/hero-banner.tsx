import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";

const STATS = [
  { value: "2017", label: "Factory since" },
  { value: "12", label: "Hardware SKUs" },
  { value: "20+", label: "Devices per rack" },
  { value: "Global", label: "Export shipping" },
];

export function HeroBanner() {
  return (
    <section className="relative min-h-[78vh] flex items-end hero-cinematic hero-fade-bottom overflow-hidden">
      <Image
        src={IMAGES.factory}
        alt="Phone farm hardware assembly — Guangzhou factory"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="container-hero relative z-10 w-full pb-16 md:pb-24 pt-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[var(--accent)] mb-6">{SITE.location} · Real-Device Phone Farm Hardware</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-semibold text-white leading-[1.06] mb-6 tracking-tight">
              Industrial Phone Farm Racks — Built in Guangzhou
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              Factory-direct phone farm boxes, motherboard racks, power, cooling, and USB infrastructure for
              mobile app QA labs and device management teams. Export shipping · remote setup · USDT or bulk quote.
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/contact" className="btn-accent text-base px-8 py-3.5">
                Request a Quote
              </Link>
              <Link href="/products" className="btn-outline text-base px-8 py-3.5">
                Browse Catalog
              </Link>
              <Link href="/register" className="btn-outline text-base px-8 py-3.5">
                Register to Order
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/15">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-semibold text-white">{s.value}</p>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative aspect-[4/5] max-h-[520px] rounded-lg overflow-hidden ring-1 ring-white/20 shadow-2xl">
              <Image
                src={IMAGES.phoneFarmBox.hero}
                alt="Phone farm box — flagship product"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
