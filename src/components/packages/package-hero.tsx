import { PageHero } from "@/components/ui/page-hero";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export function PackageHero() {
  return (
    <PageHero
      eyebrow="Deployment Bundles"
      title="Hardware Packages"
      subtitle={`Pre-configured rack and accessory bundles from ${SITE.location}. Compare tiers, request quotes, or order individual SKUs from the catalog.`}
      image={IMAGES.phoneFarmBox.hero}
      imageAlt="Phone farm deployment package"
      ctas={[
        { label: "Compare Below", href: "#packages", variant: "accent" },
        { label: "Contact Sales", href: "/contact", variant: "outline" },
      ]}
      compact
    />
  );
}
