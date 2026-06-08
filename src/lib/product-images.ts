import { getProductSeed } from "@/data/products";
import { IMAGES } from "@/lib/images";

type ProductImages = {
  imageHero: string;
  imageDetail: string;
  imageCard: string;
  category: string;
};

const CATEGORY_FALLBACK: Record<string, string> = {
  "Phone Farm Box": IMAGES.phoneFarmBox.hero,
  "Motherboard Box": IMAGES.motherboardBox.hero,
  "Android Phone Farm": IMAGES.androidFarm.hero,
  "iPhone Phone Farm": IMAGES.iphoneFarm.hero,
  "Real Device Phone Farm": IMAGES.realDevice.hero,
  "Empty Box / Chassis": IMAGES.emptyBox.hero,
  "USB Hub": IMAGES.usbHub.hero,
  "Power Supply": IMAGES.power.hero,
  Cooling: IMAGES.cooling.hero,
  Network: IMAGES.network.hero,
  "Custom Cabinet": IMAGES.customCabinet.hero,
  "Remote Control": IMAGES.remoteControl.hero,
};

/** Future per-SKU paths — used only when files exist in public/images/products/{slug}/ */
export function productImagePaths(slug: string) {
  const base = `/images/products/${slug}`;
  return {
    hero: `${base}/hero.webp`,
    detail1: `${base}/detail-1.webp`,
    detail2: `${base}/detail-2.webp`,
    packing: `${base}/packing.webp`,
  };
}

/**
 * Build PDP gallery from catalog images + known fallbacks.
 * Does not reference non-existent custom paths (Next/Image would 404).
 */
export function buildGalleryImages(slug: string, product: ProductImages): string[] {
  const seed = getProductSeed(slug);
  const categoryFallback = CATEGORY_FALLBACK[product.category] ?? IMAGES.homeHero;

  const candidates = [
    product.imageHero,
    product.imageDetail,
    product.imageCard,
    seed?.imageHero,
    seed?.imageDetail,
    categoryFallback,
    IMAGES.company.warehouse,
    IMAGES.company.workshop,
    IMAGES.factory,
  ];

  return [...new Set(candidates.filter((src): src is string => Boolean(src)))].slice(0, 6);
}
