import Link from "next/link";
import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { ContentHero } from "@/components/content/content-hero";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo";
import { ZH_FAQ_CATEGORIES, ZH_FAQ_ITEMS } from "@/lib/i18n/zh-faq";

export const metadata = buildMetadata({
  title: "手机农场常见问题 — 硬件、物流、付款与支持",
  description:
    "手机农场机盒、主板机盒、采购流程、USDT 付款、出口物流、质保与批量询价常见问题解答。",
  path: "/zh/faq",
  locale: "zh",
});

const faqForSchema = ZH_FAQ_ITEMS.map((i) => ({ question: i.question, answer: i.answer }));

export default function ZhFAQPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbJsonLd([
            { name: "首页", path: "/zh" },
            { name: "常见问题", path: "/zh/faq" },
          ]),
          faqJsonLd(faqForSchema),
        )}
      />
      <ContentHero
        eyebrow="帮助中心"
        title="手机农场常见问题"
        subtitle="硬件规格、采购、付款、物流与售后 — 来自广州销售与工程团队的解答。"
      />
      <div className="section section-light pt-0">
        <div className="container-hero max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { label: "手机农场指南", href: "/zh/phone-farm" },
              { label: "产品目录", href: "/zh/products" },
              { label: "批量询价", href: "/zh/contact" },
              { label: "English FAQ", href: "/faq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--brand)] hover:text-[var(--brand)] bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {ZH_FAQ_CATEGORIES.map((cat) => {
            const items = ZH_FAQ_ITEMS.filter((i) => i.category === cat).map((i) => ({
              question: i.question,
              answer: i.answer,
            }));
            if (!items.length) return null;
            return (
              <section key={cat} className="mb-12">
                <h2 className="text-xl font-bold text-[var(--text)] mb-5">{cat}</h2>
                <FAQAccordion items={items} />
              </section>
            );
          })}

          <ContactCTA title="还有疑问？" />
        </div>
      </div>
    </>
  );
}
