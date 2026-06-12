import { PageIntro } from "@/components/ui/page-intro";
import { SITE } from "@/lib/config";

type Props = { productCount: number };

export function ShopHero({ productCount }: Props) {
  return (
    <PageIntro
      eyebrow={`${SITE.name} · Catalog`}
      title="Hardware Catalog"
      subtitle={`${productCount} Guangzhou factory-direct SKUs — phone farm racks, motherboard boxes, power, cooling, USB, and network modules. Reference USD catalog pricing; written quotation confirmed before payment.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop" },
      ]}
    />
  );
}
