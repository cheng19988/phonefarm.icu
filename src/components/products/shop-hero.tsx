import { PageHero } from "@/components/ui/page-hero";
import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";

type Props = { productCount: number };

export function ShopHero({ productCount }: Props) {
  return (
    <PageHero
      eyebrow={`${SITE.name} · ${SITE.location}`}
      title="Hardware Catalog"
      subtitle={`${productCount} factory-direct SKUs — phone farm racks, motherboard boxes, power, cooling, and connectivity modules. Reference USD pricing with online ordering.`}
      image={IMAGES.workshop}
      imageAlt="Phone farm hardware workshop"
      ctas={[
        { label: "Sign Up to Order", href: "/register", variant: "accent" },
        { label: "Contact Sales", href: "/contact", variant: "outline" },
      ]}
      compact
    />
  );
}
