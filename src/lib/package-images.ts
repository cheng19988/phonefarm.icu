import { getProductAssets } from "@/lib/product-assets";

/** Primary catalog SKU whose synced hero represents each deployment package */
const PACKAGE_HERO_SLUG: Record<string, string> = {
  "starter-box-bundle": "phone-farm-box",
  "motherboard-density-pack": "motherboard-box",
  "iphone-farm-suite": "iphone-phone-farm",
  "enterprise-rack-deployment": "custom-cabinet",
};

export function getPackageHeroImage(packageSlug: string, fallback = ""): string {
  const productSlug = PACKAGE_HERO_SLUG[packageSlug];
  if (!productSlug) return fallback;
  const assets = getProductAssets(productSlug);
  return assets?.hero ?? fallback;
}

/** Resolve synced product heroes for package cards — server-only (uses fs). */
export function packageImageFor(pkg: { slug: string; image: string }) {
  return getPackageHeroImage(pkg.slug, pkg.image);
}
