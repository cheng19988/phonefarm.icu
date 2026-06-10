import path from "node:path";
import { getProductImageManifest, type ProductImageEntry } from "@/lib/product-image-manifest";

const ACCESSORY_SLUGS = new Set([
  "usb-hub",
  "power-supply-solution",
  "cooling-solution",
  "network-equipment",
  "remote-control-setup",
]);

const MAX_MAIN_IMAGES: Record<string, number> = {
  "phone-farm-box": 6,
  "motherboard-box": 5,
  "android-phone-farm": 5,
  "iphone-phone-farm": 5,
  "real-device-phone-farm": 5,
  "empty-box-chassis": 6,
  "custom-cabinet": 8,
  default: 4,
};

/** Human-readable model label from asset filename metadata */
export function formatModelLabel(label: string): string {
  let s = label.trim();
  if (/^\d{4} \d{2} \d{2}/.test(s)) return "Factory product photo";
  s = s
    .replace(/\bS8 S8\b/gi, "Samsung S8")
    .replace(/\bS9 S9\b/gi, "Samsung S9")
    .replace(/\b(\d+)\s+(\d+)GB\b/gi, "$1GB+$2GB")
    .replace(/\bUSB LAN OTG\b/gi, "USB · LAN · OTG")
    .replace(/\bUSB Port LAN OTG\b/gi, "USB · LAN · OTG")
    .replace(/\s+/g, " ");
  return s;
}

function isModelSpecEntry(label: string): boolean {
  const l = label.toLowerCase();
  if (/structure diagram|factory product photo/.test(l)) return false;
  return (
    /\d+\s*gb|\bs[0-9]{1,2}\b|note\s*\d|a908n|oneplus|nubia|flip|pixel|exynos|change\b/.test(l) &&
    !/chassis front|chassis rear|stacked product/.test(l)
  );
}

function isChassisPhoto(label: string): boolean {
  return /chassis|empty chassis|structure|cabinet|stacked|status led|psu bay|compact rack/i.test(label);
}

function webpBase(url: string): string {
  const name = path.basename(url);
  return name
    .replace(/^gallery-\d+-/i, "")
    .replace(/\.(webp|png|jpg|jpeg)$/i, "")
    .replace(/-(hero|detail|card)(_|\.)/i, "-")
    .slice(0, 48);
}

function maxMain(slug: string) {
  return MAX_MAIN_IMAGES[slug] ?? MAX_MAIN_IMAGES.default;
}

export type CuratedGallery = {
  mainImages: string[];
  captions: Record<string, string>;
  referenceModels: { label: string; url: string }[];
  referenceLabels: string[];
};

export function curateProductGallery(slug: string): CuratedGallery | null {
  const manifest = getProductImageManifest(slug);
  if (manifest.length === 0) return null;

  const captions: Record<string, string> = {};
  for (const e of manifest) {
    if (e.role !== "card") captions[e.url] = formatModelLabel(e.label);
  }

  const entries = manifest.filter((e) => e.role !== "card");
  const limit = maxMain(slug);

  if (ACCESSORY_SLUGS.has(slug)) {
    const seen = new Set<string>();
    const main: ProductImageEntry[] = [];
    for (const e of entries) {
      const base = webpBase(e.url);
      if (seen.has(base)) continue;
      seen.add(base);
      main.push(e);
      if (main.length >= limit) break;
    }
    return {
      mainImages: main.map((e) => e.url),
      captions,
      referenceModels: [],
      referenceLabels: [],
    };
  }

  const main: ProductImageEntry[] = [];
  const reference: ProductImageEntry[] = [];

  /** iOS rack SKU — material library has no iPhone boards; show chassis only */
  const iosRack = slug === "iphone-phone-farm";
  const chassisOnly = iosRack;

  const pickHero = entries.find((e) => e.role === "hero");
  const chassisHero = entries.find((e) => isChassisPhoto(e.label) && !/structure diagram/i.test(e.label));
  const hero = chassisOnly && chassisHero ? chassisHero : pickHero;
  if (hero) main.push(hero);

  for (const e of entries) {
    if (e.role === "hero" || main.some((m) => m.url === e.url)) continue;

    if (chassisOnly) {
      if (isChassisPhoto(e.label) && main.length < limit) main.push(e);
      continue;
    }

    if (isModelSpecEntry(e.label)) {
      reference.push(e);
      if (main.length < limit) main.push(e);
      continue;
    }

    if (isChassisPhoto(e.label)) {
      if (slug === "empty-box-chassis" || slug === "custom-cabinet") {
        if (main.length < limit) main.push(e);
      }
      continue;
    }

    if (main.length < limit && !/factory product photo/i.test(formatModelLabel(e.label))) {
      main.push(e);
    }
  }

  const mainUrls = new Set(main.map((e) => e.url));
  const seenLabels = new Set<string>();
  const referenceModels = reference
    .map((e) => ({ label: formatModelLabel(e.label), url: e.url }))
    .filter((r) => {
      if (mainUrls.has(r.url)) return false;
      const key = r.label.toLowerCase();
      if (seenLabels.has(key)) return false;
      seenLabels.add(key);
      return r.label.length > 4 && !/factory product photo/i.test(r.label);
    })
    .slice(0, 12);

  return {
    mainImages: [...new Set(main.map((e) => e.url))].slice(0, limit),
    captions,
    referenceModels,
    referenceLabels: referenceModels.map((r) => r.label),
  };
}
