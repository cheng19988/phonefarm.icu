import Image from "next/image";
import Link from "next/link";

type Cta = { label: string; href: string; variant?: "primary" | "accent" | "outline" };

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  ctas?: Cta[];
  compact?: boolean;
};

export function PageHero({ eyebrow, title, subtitle, image, imageAlt = "", ctas, compact }: Props) {
  const minH = compact ? "min-h-[40vh]" : "min-h-[52vh] md:min-h-[58vh]";

  return (
    <section className={`relative ${minH} flex items-end hero-cinematic overflow-hidden`}>
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
          priority
        />
      )}
      <div className="container-hero relative z-10 w-full pb-14 md:pb-20 pt-28 md:pt-32">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-[var(--accent)]">{eyebrow}</p>}
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-white leading-[1.1] tracking-tight mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">{subtitle}</p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {ctas.map((c) => {
                const cls =
                  c.variant === "accent"
                    ? "btn-accent"
                    : c.variant === "outline"
                      ? "btn-outline"
                      : "btn-primary bg-white text-[var(--brand)] hover:bg-slate-100";
                return (
                  <Link key={c.href} href={c.href} className={`${cls} text-base`}>
                    {c.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
