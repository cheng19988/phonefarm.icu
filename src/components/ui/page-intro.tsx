import Link from "next/link";
import type { ReactNode } from "react";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, subtitle, breadcrumbs, children }: Props) {
  return (
    <section className="page-intro-light">
      <div className="container-hero py-8 md:py-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="text-sm mb-3 flex flex-wrap gap-1 text-[var(--text-subtle)]">
            {breadcrumbs.map((item, i) => (
              <span key={`${item.label}-${i}`} className="flex items-center gap-1">
                {i > 0 && <span className="opacity-50">/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[var(--brand)] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[var(--text-muted)]">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-intro-title">{title}</h1>
        {subtitle && <p className="page-intro-subtitle">{subtitle}</p>}
        {children && <div className="mt-5 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
