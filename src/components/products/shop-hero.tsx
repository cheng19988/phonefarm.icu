import { PageIntro } from "@/components/ui/page-intro";
import { SITE } from "@/lib/config";

type Props = { productCount: number };

export function ShopHero({ productCount }: Props) {
  return (
    <PageIntro
      eyebrow={`${SITE.name} · Catalog`}
      title="Hardware Catalog"
      subtitle={`${productCount} factory-direct SKUs — phone farm racks, motherboard boxes, power, cooling, and connectivity. Reference USD pricing with online ordering.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop" },
      ]}
    />
  );
}
