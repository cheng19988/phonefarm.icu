import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata } from "@/lib/seo";
import { ZH_SITE } from "@/lib/i18n/zh-site";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "关于我们 — 广州手机农场机盒制造商",
  description:
    "PhoneFarm ICU 自 2017 年起在广州生产手机农场机盒、主板机盒与配套模块，工厂直供全球设备实验室。",
  path: "/zh/about",
  locale: "zh",
});

export default function ZhAboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="关于 PhoneFarm ICU"
        title="广州手机农场硬件制造商"
        subtitle={ZH_SITE.intro}
        breadcrumbs={[
          { label: "首页", href: "/zh" },
          { label: "关于我们" },
        ]}
      >
        <Link href="/zh/contact" className="btn-accent">批量询价</Link>
        <Link href="/zh/products" className="btn-secondary">产品目录</Link>
      </PageIntro>
      <div className="section section-light pt-0">
        <div className="container-hero max-w-3xl space-y-6 text-[var(--text-muted)] leading-relaxed">
          <p>
            PhoneFarm ICU 专注于<strong>手机农场</strong>物理硬件 — 机架、机盒、配电、散热与 USB/LAN 走线，
            而非云手机 SaaS。我们为 QA 实验室、群控运维团队与出口项目提供可扩展的真机基础设施。
          </p>
          <p>
            工厂位于{ZH_SITE.location}，自 {SITE.since} 年服务全球客户。产品目录含 12 款硬件 SKU，
            支持样单采购（销售确认后 USDT）与批量 RFQ。
          </p>
          <p>
            联系：{" "}
            <a href={CONTACT.telegramUrl} className="text-[var(--brand)] hover:underline" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            {" · "}
            <a href={CONTACT.whatsappUrl} className="text-[var(--brand)] hover:underline" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            {" · "}
            <Link href="/zh/contact" className="text-[var(--brand)] hover:underline">询价表单</Link>
          </p>
        </div>
      </div>
    </>
  );
}
