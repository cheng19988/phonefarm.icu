import Link from "next/link";
import { listCatalogProducts } from "@/lib/catalog";
import { ShopProductCard } from "@/components/products/product-card";
import { ContactCTA } from "@/components/shared";
import { ShopHero } from "@/components/products/shop-hero";
import { buildMetadata } from "@/lib/seo";
import { zhProduct } from "@/lib/i18n/zh-products";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "手机农场硬件目录 — 购买手机农场机盒与设备",
  description:
    "购买手机农场机盒、主板机盒、群控机架、USB 集线器、电源与散热模块。广州手机农场硬件制造商，USD 参考价，批量询价或 USDT 样单。",
  path: "/zh/products",
  locale: "zh",
});

export default async function ZhProductsPage() {
  const products = await listCatalogProducts({ orderBy: "name", sort: "asc" });

  return (
    <>
      <ShopHero productCount={products.length} locale="zh" />
      <div className="section section-light pt-0">
        <div className="container-hero">
          <p className="text-sm text-[var(--text-muted)] mb-8 max-w-3xl leading-relaxed">
            PhoneFarm ICU 手机农场硬件目录 — 12 款 SKU，含机架、主板机盒、配电、散热与网络模块。
            标价为 USD 参考价，最终报价由销售书面确认后付款。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((p) => {
              const t = zhProduct(p.slug);
              return (
                <ShopProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={t?.name ?? p.name}
                  shortDesc={t?.shortDesc ?? p.shortDesc}
                  priceUsd={p.priceUsd}
                  stock={p.stock}
                  imageCard={p.imageCard}
                  category={t?.category ?? p.category}
                  locale="zh"
                />
              );
            })}
          </div>
          <p className="text-center text-xs text-[var(--text-subtle)] mt-8">
            参考价 — 付款前由销售确认最终报价。
          </p>
          <div className="text-center mt-6">
            <Link href="/zh/phone-farm" className="text-[var(--brand)] text-sm font-medium hover:underline">
              阅读手机农场采购指南 →
            </Link>
          </div>
        </div>
      </div>
      <div className="section section-light pt-0">
        <div className="container-hero">
          <ContactCTA title="需要手机农场批量报价？" />
        </div>
      </div>
    </>
  );
}
