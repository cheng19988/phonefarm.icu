import Link from "next/link";
import type { ReactNode } from "react";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: "navy" | "light";
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  variant = "navy",
  breadcrumbs,
  children,
}: Props) {
  const navy = variant === "navy";

  return (
    <section className={navy ? "page-intro-navy" : "page-intro-light"}>
      <div className="container-hero py-10 md:py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={`text-sm mb-4 flex flex-wrap gap-1 ${navy ? "page-intro-crumb" : "text-[var(--text-subtle)]"}`}>
            {breadcrumbs.map((item, i) => (
              <span key={`${item.label}-${i}`} className="flex items-center gap-1">
                {i > 0 && <span className="opacity-50">/</span>}
                {item.href ? (
                  <Link href={item.href} className={navy ? "hover:text-white transition-colors" : "hover:text-[var(--brand)]"}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={navy ? "text-white/90" : "text-[var(--text-muted)]"}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className={`eyebrow ${navy ? "text-[var(--accent)]" : ""}`}>{eyebrow}</p>}
        <h1 className={`page-intro-title ${navy ? "text-white" : "text-[var(--text)]"}`}>{title}</h1>
        {subtitle && (
          <p className={`page-intro-subtitle ${navy ? "text-slate-300" : "text-[var(--text-muted)]"}`}>{subtitle}</p>
        )}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
