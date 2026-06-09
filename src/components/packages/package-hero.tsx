import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";

export function PackageHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-slate-100 border-b border-[var(--border)]">
      <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden lg:block opacity-25">
        <Image src={IMAGES.customCabinet.hero} alt="" fill className="object-cover object-left" sizes="40vw" priority />
      </div>
      <div className="container-hero relative py-14 lg:py-20">
        <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-3">Deployment Bundles</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4 max-w-2xl leading-tight">
          Hardware Packages
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mb-8 leading-relaxed">
          Starter, professional, enterprise, and custom rack bundles from {SITE.location}. Reference starting prices —
          order online or contact sales for bulk configuration and freight quotes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="#packages" className="btn-primary px-7 py-3">View Packages</Link>
          <Link href="/contact" className="btn-outline px-7 py-3">Contact Sales</Link>
          <Link href="/products" className="btn-secondary px-7 py-3">Browse Products</Link>
        </div>
      </div>
    </section>
  );
}
