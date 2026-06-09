import { getProductAssets } from "@/lib/product-assets";

type ProductImages = {
  imageHero: string;
  imageDetail: string;
  imageCard: string;
};

/**
 * PDP gallery — only this SKU's own images. No factory/warehouse/category mixing.
 */
export function buildGalleryImages(slug: string, product: ProductImages): string[] {
  const assets = getProductAssets(slug);
  if (assets) {
    const all = [...new Set([...assets.gallery, assets.hero, assets.detail])];
    return all.slice(0, 8);
  }
  return [...new Set([product.imageHero, product.imageDetail, product.imageCard].filter(Boolean))].slice(0, 6);
}
