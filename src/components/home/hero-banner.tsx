import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";

const HERO_STATS = [
  { value: "Since 2017", label: "Guangzhou factory" },
  { value: "13+ SKUs", label: "Hardware catalog" },
  { value: "USDT", label: "After order confirmation" },
  { value: "Global", label: "Export shipping" },
];

export function HeroBanner() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,64,175,0.08),_transparent_55%)]" />
      <div className="container-hero relative w-full py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
          <div className="z-10">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] mb-5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              {SITE.location} · Factory Direct Since {SITE.since}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold text-[var(--text)] leading-[1.08] mb-6 tracking-tight">
              Phone Farm Racks &amp; Hardware — Direct from Guangzhou Factory
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] mb-8 leading-relaxed max-w-xl">
              Real-device phone farm boxes, motherboard racks, USB hubs, power and cooling modules.
              Browse reference prices, register to order, pay with USDT after confirmation, or contact sales for bulk quotes.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/products" className="btn-accent text-base px-8 py-3.5">
                Shop Now
              </Link>
              <Link href="/register" className="btn-primary text-base px-8 py-3.5">
                Sign Up
              </Link>
              <Link href="/contact" className="btn-outline text-base px-8 py-3.5">
                Contact Sales
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--border)]">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-[var(--text)] font-bold text-sm">{s.value}</p>
                  <p className="text-[var(--text-subtle)] text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[min(72vh,640px)]">
            <div className="relative h-full min-h-[360px] lg:min-h-[min(72vh,640px)] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 ring-1 ring-black/5">
              <Image
                src={IMAGES.phoneFarmBox.hero}
                alt="Phone farm box — flagship hardware"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -left-5 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white hidden md:block">
              <Image src={IMAGES.motherboardBox.card} alt="Motherboard box" fill className="object-cover" />
            </div>
            <div className="absolute -top-4 -right-4 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white hidden md:block">
              <Image src={IMAGES.usbHub.card} alt="USB hub module" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
