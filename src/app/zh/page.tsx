import Link from "next/link";
import { FeaturedProducts } from "@/components/home/featured-products";
import { TrustStrip } from "@/components/trust-strip";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/seo";
import { listCatalogProducts } from "@/lib/catalog";
import { ZH_SITE } from "@/lib/i18n/zh-site";
import { zhProduct } from "@/lib/i18n/zh-products";

export const metadata = buildMetadata({
  title: ZH_SITE.headline,
  description: ZH_SITE.description,
  path: "/zh",
  locale: "zh",
});

export default async function ZhHomePage() {
  const allProducts = await listCatalogProducts({ orderBy: "name" });
  const featured = allProducts.slice().sort((a, b) => a.priceUsd - b.priceUsd).slice(0, 3);
  const featuredZh = featured.map((p) => {
    const t = zhProduct(p.slug);
    return t ? { ...p, name: t.name, shortDesc: t.shortDesc } : p;
  });

  return (
    <>
      <section className="hero-banner relative overflow-hidden">
        <div className="container-hero relative z-10 py-16 md:py-24">
          <p className="eyebrow text-[var(--accent)] mb-4">广州工厂直供 · 自 2017 年</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--text)] max-w-4xl leading-tight tracking-tight mb-6">
            手机农场机柜与机盒硬件 — 厂家目录与批量询价
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mb-8">
            {ZH_SITE.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/zh/contact" className="btn-accent">批量询价</Link>
            <Link href="/zh/products" className="btn-secondary">浏览产品目录</Link>
            <Link href="/zh/phone-farm" className="btn-outline-dark">手机农场指南</Link>
          </div>
        </div>
      </section>

      <TrustStrip variant="light" />

      <section className="section section-light">
        <div className="container-hero max-w-4xl">
          <SectionHeader
            eyebrow="手机农场"
            title="什么是手机农场？"
            subtitle="手机农场（Phone Farm）是将多部真实手机集中安装在工业机架中的硬件系统，用于群控、多机测试与设备实验室扩容。"
          />
          <div className="prose-content text-[var(--text-muted)] space-y-4 leading-relaxed">
            <p>
              PhoneFarm ICU 生产<strong>手机农场机盒</strong>、<strong>主板机盒</strong>、USB/电源/散热/网络模块及定制机柜，面向全球出口。与云手机不同，我们提供买家自有的真机硬件机架。
            </p>
            <p>
              浏览 12 款硬件 SKU 的 USD 参考价目录，提交批量询价，或在销售书面确认配置后注册下样单（USDT 付款）。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/zh/phone-farm" className="btn-secondary">完整手机农场指南</Link>
            <Link href="/zh/faq" className="btn-outline-dark">常见问题</Link>
          </div>
        </div>
      </section>

      <FeaturedProducts products={featuredZh} locale="zh" />

      <section className="section-compact">
        <div className="container-hero max-w-3xl mx-auto">
          <div className="cta-band">
            <p className="eyebrow">下一步</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text)] mb-4 tracking-tight">
              准备部署手机农场硬件？
            </h2>
            <p className="text-[var(--text-muted)] text-base mb-8 leading-relaxed">
              向广州销售团队提交批量询价，浏览目录参考价，或注册后在确认报价后下样单。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/zh/contact" className="btn-accent">批量询价</Link>
              <Link href="/zh/products" className="btn-secondary">产品目录</Link>
              <Link href="/register" className="btn-outline-dark">注册账户</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
