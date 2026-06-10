import type { ReactNode } from "react";
import { PageIntro, type BreadcrumbItem } from "@/components/ui/page-intro";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

/** @deprecated prefer PageIntro directly — kept for content pages */
export function ContentHero({ eyebrow, title, subtitle, breadcrumbs, children }: Props) {
  return (
    <PageIntro eyebrow={eyebrow} title={title} subtitle={subtitle} breadcrumbs={breadcrumbs}>
      {children}
    </PageIntro>
  );
}
