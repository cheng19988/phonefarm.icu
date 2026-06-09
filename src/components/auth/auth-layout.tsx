import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  benefits: string[];
};

export function AuthLayout({ title, subtitle, children, benefits }: Props) {
  return (
    <section className="section section-light min-h-[80vh]">
      <div className="container-hero">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start max-w-5xl mx-auto">
          <div className="lg:pt-8">
            <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-3">PhoneFarm ICU Account</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 tracking-tight">{title}</h1>
            <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">{subtitle}</p>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3 text-[var(--text-muted)]">
                  <span className="text-[var(--brand)] font-bold shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>{children}</div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-12 text-sm">
          <Link href="/products" className="text-[var(--brand)] font-medium hover:underline">
            Browse Products
          </Link>
          <span className="text-[var(--text-subtle)]">·</span>
          <Link href="/contact" className="text-[var(--brand)] font-medium hover:underline">
            Contact Sales
          </Link>
          <span className="text-[var(--text-subtle)]">·</span>
          <Link href="/products" className="text-[var(--text-muted)] hover:text-[var(--brand)]">
            Back to Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
