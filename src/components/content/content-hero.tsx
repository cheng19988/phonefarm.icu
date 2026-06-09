import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function ContentHero({ eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="relative border-b border-[var(--border)] bg-gradient-to-br from-white via-blue-50/40 to-slate-100">
      <div className="container-hero py-12 md:py-16 lg:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-3">{eyebrow}</p>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4 max-w-3xl leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mb-6">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
