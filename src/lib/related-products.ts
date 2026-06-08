import type { CatalogProduct } from "@/lib/catalog";

const RACK_CATEGORIES = new Set([
  "Phone Farm Box",
  "Android Phone Farm",
  "iPhone Phone Farm",
  "Real Device Phone Farm",
  "Motherboard Box",
  "Real Device Phone Farm",
  "Custom Cabinet",
]);

const ACCESSORY_CATEGORIES = new Set(["USB Hub", "Power Supply", "Cooling", "Network"]);

export type RelatedProductItem = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
};

export function pickRelatedProducts(
  slug: string,
  category: string,
  allProducts: CatalogProduct[],
  limit = 4,
): RelatedProductItem[] {
  const others = allProducts.filter((p) => p.slug !== slug);
  const isRack = RACK_CATEGORIES.has(category);
  const isAccessory = ACCESSORY_CATEGORIES.has(category);

  const score = (p: CatalogProduct): number => {
    let s = 0;
    if (p.category === category) s += 10;
    if (isRack && ACCESSORY_CATEGORIES.has(p.category)) s += 8;
    if (isAccessory && RACK_CATEGORIES.has(p.category)) s += 8;
    if (p.category === "USB Hub" || p.category === "Power Supply" || p.category === "Cooling") s += 2;
    return s;
  };

  return [...others]
    .sort((a, b) => score(b) - score(a) || a.priceUsd - b.priceUsd)
    .slice(0, limit)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      shortDesc: p.shortDesc,
      priceUsd: p.priceUsd,
      stock: p.stock,
      imageCard: p.imageCard,
      category: p.category,
    }));
}
