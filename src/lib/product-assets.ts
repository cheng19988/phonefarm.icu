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

function gallerySortKey(filename: string): number {
  const m = filename.match(/gallery-(\d+)/i);
  return m ? Number(m[1]) : 999;
}

function listSlugAssets(slug: string): string[] {
  const dir = path.join(PUBLIC_PRODUCTS, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort((a, b) => {
      const rank = (f: string) => {
        if (f.startsWith("hero.")) return 0;
        if (f.startsWith("card.")) return 1;
        return 2 + gallerySortKey(f);
      };
      const d = rank(a) - rank(b);
      return d !== 0 ? d : a.localeCompare(b);
    })
    .map((f) => `/images/products/${slug}/${f}`);
}

/**
 * Per-SKU assets from public/images/products/{slug}/.
 * Card and hero always match the same product line — no cross-category mixing.
 */
export function getProductAssets(slug: string): ProductAssetSet | null {
  const files = listSlugAssets(slug);
  if (files.length === 0) return null;

  const pick = (name: string) => files.find((f) => path.basename(f).startsWith(`${name}.`));
  const card = pick("card") ?? pick("hero") ?? files[0];
  const hero = pick("hero") ?? card;
  const galleryFiles = files.filter((f) => {
    const base = path.basename(f);
    return base.startsWith("gallery-") || base.startsWith("hero.");
  });
  const detail = galleryFiles.find((f) => f.includes("gallery-01")) ?? galleryFiles[0] ?? hero;
  const uniqueGallery = [...new Set([hero, ...galleryFiles.filter((f) => f !== hero)])];

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
