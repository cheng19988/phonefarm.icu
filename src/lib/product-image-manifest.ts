import fs from "node:fs";
import path from "node:path";

export type ProductImageEntry = {
  file: string;
  label: string;
  url: string;
  role?: string;
};

export function getProductImageManifest(slug: string): ProductImageEntry[] {
  const manifestPath = path.join(process.cwd(), "public", "images", "products", slug, "manifest.json");
  if (!fs.existsSync(manifestPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8")) as ProductImageEntry[];
  } catch {
    return [];
  }
}

export function getGalleryCaptions(slug: string): Record<string, string> {
  const entries = getProductImageManifest(slug);
  const map: Record<string, string> = {};
  for (const e of entries) {
    if (e.role === "card") continue;
    map[e.url] = e.label;
  }
  return map;
}

export function getReferenceModelsFromManifest(slug: string): string[] {
  return getProductImageManifest(slug)
    .filter((e) => e.role === "gallery" || e.role === "hero")
    .map((e) => e.label)
    .filter((l) => l.length > 3 && !/product photo|chassis structure/i.test(l))
    .slice(0, 12);
}
