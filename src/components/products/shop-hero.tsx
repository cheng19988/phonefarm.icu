import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";

type Props = {
  productCount: number;
};

export function ShopHero({ productCount }: Props) {
  return (
    <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-slate-100 border-b border-[var(--border)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(30,64,175,0.06),_transparent_60%)]" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <Image
          src={IMAGES.phoneFarmBox.hero}
          alt=""
          fill
          className="object-cover object-left opacity-30"
          sizes="50vw"
          priority
        />
      </div>
      <div className="container-hero relative py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[var(--brand)] mb-3 uppercase tracking-wide">
            PhoneFarm ICU Shop · {SITE.location}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[var(--text)] mb-4 leading-tight tracking-tight">
            Phone Farm Hardware Shop
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-8 leading-relaxed">
            Guangzhou factory direct · {productCount} SKUs with reference USD pricing · register to order online ·
            USDT payment after confirmation · bulk quote available for custom racks.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary text-base px-7 py-3">
              Sign Up to Order
            </Link>
            <Link href="/contact" className="btn-outline text-base px-7 py-3">
              Contact Sales
            </Link>
            <Link href="/packages" className="btn-secondary text-base px-7 py-3">
              View Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
