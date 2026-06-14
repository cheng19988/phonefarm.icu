import { PageIntro } from "@/components/ui/page-intro";
import { SITE } from "@/lib/config";
import { localePath, type Locale } from "@/lib/i18n/config";

type Props = { productCount: number; locale?: Locale };

export function ShopHero({ productCount, locale = "en" }: Props) {
  const isZh = locale === "zh";
  return (
    <PageIntro
      eyebrow={isZh ? `${SITE.name} · 产品目录` : `${SITE.name} · Catalog`}
      title={isZh ? "手机农场硬件目录" : "Hardware Catalog"}
      subtitle={
        isZh
          ? `${productCount} 款广州工厂直供 SKU — 手机农场机架、主板机盒、电源、散热、USB 与网络模块。USD 参考价目录；付款前书面确认报价。`
          : `${productCount} Guangzhou factory-direct SKUs — phone farm racks, motherboard boxes, power, cooling, USB, and network modules. Reference USD catalog pricing; written quotation confirmed before payment.`
      }
      breadcrumbs={[
        { label: isZh ? "首页" : "Home", href: localePath(locale, "/") },
        { label: isZh ? "产品目录" : "Shop" },
      ]}
    />
  );
}
