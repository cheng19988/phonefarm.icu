import Image from "next/image";
import { ReactNode } from "react";
import { IMAGES } from "@/lib/images";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image?: string;
  children?: ReactNode;
};

export function ContentHero({
  eyebrow,
  title,
  subtitle,
  image = IMAGES.company.office,
  children,
}: Props) {
  return (
    <section className="relative min-h-[42vh] flex items-end hero-cinematic overflow-hidden">
      <Image src={image} alt="" fill className="object-cover object-center opacity-90" sizes="100vw" />
      <div className="container-hero relative z-10 w-full pb-12 md:pb-16 pt-28">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-[var(--accent)]">{eyebrow}</p>}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-white mb-4 leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
