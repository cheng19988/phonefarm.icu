import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { canonicalProductPriceUsd } from "@/lib/pricing";
import { PRODUCT_SEEDS, getProductSeed, type ProductSeed } from "@/data/products";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  features: string;
  specs: string;
  scenarios: string;
  accessories: string;
  delivery: string;
  maintenance: string;
  faq: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  imageHero: string;
  imageDetail: string;
  published: boolean;
};

function withCanonicalPrice<T extends CatalogProduct>(product: T): T {
  return { ...product, priceUsd: canonicalProductPriceUsd(product.slug, product.priceUsd) };
}

function seedToCatalog(seed: ProductSeed): CatalogProduct {
  return withCanonicalPrice({
    id: `seed-${seed.slug}`,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    shortDesc: seed.shortDesc,
    description: seed.description,
    features: JSON.stringify(seed.features),
    specs: JSON.stringify(seed.specs),
    scenarios: JSON.stringify(seed.scenarios),
    accessories: JSON.stringify(seed.accessories),
    delivery: JSON.stringify(seed.delivery),
    maintenance: JSON.stringify(seed.maintenance),
    faq: JSON.stringify(seed.faq),
    priceUsd: seed.priceUsd,
    stock: seed.stock,
    imageCard: seed.imageCard,
    imageHero: seed.imageHero,
    imageDetail: seed.imageDetail,
    published: true,
  });
}

const FALLBACK_CATALOG = PRODUCT_SEEDS.map(seedToCatalog);

function filterFallback(options?: {
  category?: string;
  orderBy?: "priceUsd" | "name";
  sort?: "asc" | "desc";
  take?: number;
}): CatalogProduct[] {
  let list = [...FALLBACK_CATALOG];
  if (options?.category) list = list.filter((p) => p.category === options.category);
  const dir = options?.sort === "desc" ? -1 : 1;
  if (options?.orderBy === "priceUsd") list.sort((a, b) => (a.priceUsd - b.priceUsd) * dir);
  else list.sort((a, b) => a.name.localeCompare(b.name) * dir);
  if (options?.take) list = list.slice(0, options.take);
  return list;
}

export async function listCatalogProducts(options?: {
  category?: string;
  orderBy?: "priceUsd" | "name";
  sort?: "asc" | "desc";
  take?: number;
}): Promise<CatalogProduct[]> {
  try {
    const sortDir: Prisma.SortOrder = options?.sort === "desc" ? "desc" : "asc";
    const orderBy: Prisma.ProductOrderByWithRelationInput =
      options?.orderBy === "priceUsd" ? { priceUsd: sortDir } : { name: sortDir };

    const rows = await prisma.product.findMany({
      where: {
        published: true,
        ...(options?.category ? { category: options.category } : {}),
      },
      orderBy,
      ...(options?.take ? { take: options.take } : {}),
    });
    return rows.map(withCanonicalPrice);
  } catch {
    return filterFallback(options);
  }
}

export async function countCatalogProducts(): Promise<number> {
  try {
    return await prisma.product.count({ where: { published: true } });
  } catch {
    return FALLBACK_CATALOG.length;
  }
}

export async function getCatalogProduct(slug: string): Promise<CatalogProduct | null> {
  try {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (row) return withCanonicalPrice(row);
  } catch {
    /* use seed fallback */
  }
  const seed = getProductSeed(slug);
  return seed ? seedToCatalog(seed) : null;
}
