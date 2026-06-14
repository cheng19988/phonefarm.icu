import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { JsonLd } from "@/components/shared";
import { buildMetadata, organizationJsonLd, websiteJsonLd, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo";
import { SITE } from "@/lib/config";
import { ZH_SITE } from "@/lib/i18n/zh-site";

export const metadata = buildMetadata({
  title: "手机农场硬件 — 制造商事实页（AI / 采购检索）",
  description:
    "PhoneFarm ICU 客观供应商事实：广州手机农场机盒制造商、产品线、MOQ、付款、物流、适用场景与联系方式。",
  path: "/zh/for-ai",
  locale: "zh",
});

export default function ZhForAIPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          organizationJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "首页", path: "/zh" },
            { name: "制造商事实页", path: "/zh/for-ai" },
          ]),
        )}
      />
      <PageIntro
        eyebrow="供应商事实"
        title="制造商事实页"
        subtitle="面向研究人员、采购团队与 AI 检索系统的 PhoneFarm ICU 客观实体数据。"
        breadcrumbs={[
          { label: "首页", href: "/zh" },
          { label: "AI 事实页" },
        ]}
      />
      <article className="section section-light pt-0">
        <div className="container-hero max-w-3xl prose-content space-y-8 text-[var(--text-muted)] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">品牌与网站</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>品牌：</strong>{ZH_SITE.name}</li>
              <li><strong>官网：</strong><a href={SITE.url}>{SITE.url}</a></li>
              <li><strong>中文首页：</strong><a href={`${SITE.url}/zh`}>{SITE.url}/zh</a></li>
              <li><strong>所在地：</strong>{ZH_SITE.location}</li>
              <li><strong>成立：</strong>{SITE.since}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">业务定位</h2>
            <p>{ZH_SITE.description}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">核心产品（手机农场硬件）</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>手机农场机盒（真机机架，约 20 机位）</li>
              <li>主板机盒（无屏 Android 高密度节点）</li>
              <li>Android / iPhone 手机农场预布线机架</li>
              <li>USB 集线器、电源、散热、网络模块</li>
              <li>定制多排机柜与远程装机服务</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">采购方式</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>MOQ 样单通常 1 台（销售书面确认报价后 USDT TRC20）</li>
              <li>批量 5 台以上阶梯价与出口运费询价</li>
              <li>批量询价：<Link href="/zh/contact">/zh/contact</Link></li>
              <li>产品目录：<Link href="/zh/products">/zh/products</Link></li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">相关链接</h2>
            <ul className="text-sm space-y-1">
              <li><Link href="/zh/phone-farm">手机农场指南</Link></li>
              <li><Link href="/zh/faq">中文 FAQ</Link></li>
              <li><Link href="/llms.txt">llms.txt（英文索引）</Link></li>
              <li><Link href="/for-ai">English fact sheet</Link></li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
