import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/shared";
import { CONTACT } from "@/lib/config";
import { ContentHero } from "@/components/content/content-hero";
import { resolveProductInterest } from "@/lib/inquiry";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "联系销售 — 手机农场硬件批量询价",
  description:
    "提交手机农场机盒、主板机盒、机柜批量询价。注明设备型号、数量、平台（Android/iPhone）、连接方式与收货国家。",
  path: "/zh/contact",
  locale: "zh",
});

type ContactPageProps = {
  searchParams: Promise<{ product?: string; service?: string; message?: string; inquiry_error?: string }>;
};

export default async function ZhContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const productKey = params.product || params.service || "";
  const defaultProductInterest = productKey ? resolveProductInterest(productKey) : "";
  const defaultMessage = params.message?.trim() ?? "";
  const inquiryError = params.inquiry_error?.trim();

  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <ContentHero
        eyebrow="RFQ · 广州工厂"
        title="手机农场硬件批量询价"
        subtitle="多机柜、主板密度、配件与出口运费 — 销售团队将在 1–2 个工作日内回复书面报价。"
      />
      <div className="section section-light pt-0">
        <div className="container-hero max-w-5xl grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {inquiryError ? (
              <p className="mb-4 p-4 rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm" role="alert">
                {inquiryError}
              </p>
            ) : null}
            <InquiryForm
              defaultProductInterest={defaultProductInterest}
              defaultMessage={defaultMessage}
              sourcePage="/zh/contact"
            />
          </div>
          <aside className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-bold text-[var(--text)] mb-3">询价前请准备</h2>
              <ul className="text-sm text-[var(--text-muted)] space-y-2 list-disc pl-5">
                <li>产品 SKU 或套餐意向</li>
                <li>数量 / 节点数</li>
                <li>平台（Android、iPhone、主板）</li>
                <li>连接方式（USB/ADB 或 LAN）</li>
                <li>收货国家与预算（可选）</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-[var(--text)] mb-3">直接联系</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href={CONTACT.telegramUrl} className="text-[var(--brand)] hover:underline" target="_blank" rel="noopener noreferrer">
                    Telegram {CONTACT.telegram}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsappUrl} className="text-[var(--brand)] hover:underline" target="_blank" rel="noopener noreferrer">
                    WhatsApp {CONTACT.whatsapp}
                  </a>
                </li>
                <li>
                  <Link href="/contact#email" className="text-[var(--brand)] hover:underline">{CONTACT.email}</Link>
                </li>
              </ul>
            </div>
            <p className="text-xs text-[var(--text-subtle)]">
              表单亦可使用英文填写。English inquiry page:{" "}
              <Link href="/contact" className="text-[var(--brand)] hover:underline">/contact</Link>
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
