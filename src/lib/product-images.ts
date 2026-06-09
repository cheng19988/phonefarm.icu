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
    return [...new Set([...assets.gallery, assets.detail, assets.hero].filter(Boolean))];
  }
  return [...new Set([product.imageHero, product.imageDetail, product.imageCard].filter(Boolean))];
}
