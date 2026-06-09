import Link from "next/link";
import { ReactNode } from "react";
import { ContactCTA } from "@/components/shared";

type Props = {
  backHref: string;
  backLabel: string;
  category?: string;
  title: string;
  summary?: string;
  children: ReactNode;
  ctaTitle?: string;
};

export function ArticleLayout({
  backHref,
  backLabel,
  category,
  title,
  summary,
  children,
  ctaTitle = "Need Help With Your Order?",
}: Props) {
  return (
    <article className="section section-light pt-8">
      <div className="container-hero max-w-3xl">
        <Link href={backHref} className="text-sm text-[var(--brand)] font-medium hover:underline mb-6 inline-block">
          ← {backLabel}
        </Link>
        {category && (
          <p className="text-xs font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">{category}</p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 leading-tight">{title}</h1>
        {summary && <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">{summary}</p>}
        <div className="prose-content space-y-4">{children}</div>
        <div className="mt-12">
          <ContactCTA title={ctaTitle} />
        </div>
      </div>
    </article>
  );
}
