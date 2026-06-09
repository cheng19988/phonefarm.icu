import fs from "node:fs";
import path from "node:path";
import { getProductSeed } from "@/data/products";

const PUBLIC_PRODUCTS = path.join(process.cwd(), "public", "images", "products");

export type ProductAssetSet = {
  card: string;
  hero: string;
  detail: string;
  gallery: string[];
};

function listSlugAssets(slug: string): string[] {
  const dir = path.join(PUBLIC_PRODUCTS, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => `/images/products/${slug}/${f}`);
}

/**
 * Per-SKU assets from public/images/products/{slug}/.
 * Card and hero always match the same product line — no cross-category mixing.
 */
export function getProductAssets(slug: string): ProductAssetSet | null {
  const files = listSlugAssets(slug);
  if (files.length === 0) return null;

  const pick = (name: string) => files.find((f) => f.includes(`/${name}.`));
  const card = pick("card") ?? files.find((f) => f.includes("hero")) ?? files[0];
  const hero = pick("hero") ?? card;
  const detail = files.find((f) => f.includes("gallery-1")) ?? pick("detail") ?? hero;
  const galleryOnly = files.filter((f) => path.basename(f).startsWith("gallery-"));
  const uniqueGallery = [...new Set(galleryOnly.length > 0 ? [hero, ...galleryOnly] : [hero, detail])];

  return { card, hero, detail, gallery: uniqueGallery };
}

/** Runtime-safe for client: use seed paths only when no server fs */
export function getProductAssetsFromSeed(slug: string): ProductAssetSet {
  const seed = getProductSeed(slug);
  if (!seed) {
    return { card: "", hero: "", detail: "", gallery: [] };
  }
  return {
    card: seed.imageCard,
    hero: seed.imageHero,
    detail: seed.imageDetail,
    gallery: [seed.imageHero, seed.imageDetail, seed.imageCard].filter(Boolean),
  };
}
