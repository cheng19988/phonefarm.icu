import { curateProductGallery } from "@/lib/product-gallery-curate";
import { getProductAssets } from "@/lib/product-assets";

type ProductImages = {
  imageHero: string;
  imageDetail: string;
  imageCard: string;
};

export type ProductGalleryData = {
  images: string[];
  captions: Record<string, string>;
  referenceModels: { label: string; url: string }[];
  referenceLabels: string[];
};

/** Curated PDP gallery — main product shots only, reference models listed separately */
export function buildProductGallery(slug: string, product: ProductImages): ProductGalleryData {
  const curated = curateProductGallery(slug);
  if (curated && curated.mainImages.length > 0) {
    return {
      images: curated.mainImages,
      captions: curated.captions,
      referenceModels: curated.referenceModels,
      referenceLabels: curated.referenceLabels,
    };
  }

  const assets = getProductAssets(slug);
  const fallback = assets
    ? [...new Set([assets.hero, assets.detail, ...assets.gallery.filter((g) => g !== assets.hero)].filter(Boolean))].slice(0, 6)
    : [...new Set([product.imageHero, product.imageDetail, product.imageCard].filter(Boolean))];

  return { images: fallback, captions: {}, referenceModels: [], referenceLabels: [] };
}

/** @deprecated use buildProductGallery */
export function buildGalleryImages(slug: string, product: ProductImages): string[] {
  return buildProductGallery(slug, product).images;
}
