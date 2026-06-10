import { PageIntro } from "@/components/ui/page-intro";
import { SITE } from "@/lib/config";

export function PackageHero() {
  return (
    <PageIntro
      eyebrow="Deployment Bundles"
      title="Hardware Packages"
      subtitle={`Pre-configured rack and accessory bundles from ${SITE.location}. Compare tiers below or browse individual SKUs in the catalog.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Packages" },
      ]}
    />
  );
}
