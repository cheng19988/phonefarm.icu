import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { ZH_PHONE_FARM_SECTIONS } from "@/lib/i18n/zh-phone-farm";

export const metadata = buildMetadata({
  title: "什么是手机农场？— 手机农场机柜与机盒硬件指南",
  description:
    "手机农场、手机农场机盒、主板机盒、群控机架详解。架构、20 机位机箱规格、Android/iPhone 参考机型、配电散热与广州厂家采购方式。",
  path: "/zh/phone-farm",
  locale: "zh",
});

export default function ZhPhoneFarmPage() {
  const intro = ZH_PHONE_FARM_SECTIONS.find((s) => s.id === "what-is");
  const arch = ZH_PHONE_FARM_SECTIONS.find((s) => s.id === "architecture");
  const lines = ZH_PHONE_FARM_SECTIONS.find((s) => s.id === "product-lines");
  const useCases = ZH_PHONE_FARM_SECTIONS.find((s) => s.id === "use-cases");
  const ordering = ZH_PHONE_FARM_SECTIONS.find((s) => s.id === "ordering");

  return (
    <>
      <PageIntro
        eyebrow="硬件指南"
        title="什么是手机农场？"
        subtitle="手机农场机盒、主板机盒、机箱规格与部署参考 — PhoneFarm ICU 广州硬件制造商（自 2017 年）。"
        breadcrumbs={[
          { label: "首页", href: "/zh" },
          { label: "手机农场指南" },
        ]}
      >
        <Link href="/zh/contact" className="btn-accent">批量询价</Link>
        <Link href="/zh/products" className="btn-secondary">产品目录</Link>
        <Link href="/zh/products/phone-farm-box" className="btn-outline-dark">手机农场机盒</Link>
      </PageIntro>

      <div className="section section-light pt-0">
        <div className="container-hero max-w-4xl space-y-16">
          {intro && (
            <section>
              {intro.paragraphs.map((p) => (
                <p key={p} className="text-[var(--text-muted)] leading-relaxed text-lg mb-4">
                  {p}
                </p>
              ))}
            </section>
          )}

          {arch && "bullets" in arch && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-5">{arch.title}</h2>
              {arch.paragraphs?.map((p) => (
                <p key={p} className="text-[var(--text-muted)] leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                {arch.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-[var(--text-muted)] p-4 rounded-xl border border-[var(--border)] bg-white"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {lines && "items" in lines && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-5">{lines.title}</h2>
              <div className="space-y-4">
                {lines.items.map((item) => (
                  <div
                    key={item.href}
                    className="p-5 rounded-2xl border border-[var(--border)] bg-white hover:border-[var(--brand)]/30 transition-colors"
                  >
                    <Link href={item.href} className="text-lg font-semibold text-[var(--text)] hover:text-[var(--brand)]">
                      {item.name}
                    </Link>
                    <p className="text-sm text-[var(--text-muted)] mt-2">{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {useCases && "bullets" in useCases && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-5">{useCases.title}</h2>
              <ul className="space-y-3">
                {useCases.bullets.map((b) => (
                  <li key={b} className="text-[var(--text-muted)] border-l-4 border-[var(--brand)] pl-4">
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {ordering && (
            <section className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">{ordering.title}</h2>
              {ordering.paragraphs?.map((p) => (
                <p key={p} className="text-[var(--text-muted)] mb-4">
                  {p}
                </p>
              ))}
              {"links" in ordering && (
                <div className="flex flex-wrap gap-4">
                  {ordering.links.map((l) => (
                    <Link key={l.href} href={l.href} className="btn-outline-dark text-sm">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <div className="section section-light pt-0">
        <div className="container-hero">
          <ContactCTA title="需要手机农场报价？" />
        </div>
      </div>
    </>
  );
}
