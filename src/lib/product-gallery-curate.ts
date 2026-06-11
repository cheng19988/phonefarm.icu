import path from "node:path";
import { getProductImageManifest, type ProductImageEntry } from "@/lib/product-image-manifest";
import { formatModelLabel } from "@/lib/product-model-parse";

const ACCESSORY_SLUGS = new Set([
  "usb-hub",
  "power-supply-solution",
  "cooling-solution",
  "network-equipment",
  "remote-control-setup",
]);

const CHASSIS_ONLY_SLUGS = new Set(["iphone-phone-farm"]);

const CABINET_SLUGS = new Set(["empty-box-chassis", "custom-cabinet"]);

const MAX_MAIN_IMAGES: Record<string, number> = {
  "phone-farm-box": 20,
  "motherboard-box": 20,
  "android-phone-farm": 20,
  "iphone-phone-farm": 12,
  "real-device-phone-farm": 12,
  "empty-box-chassis": 12,
  "custom-cabinet": 12,
  default: 8,
};

const ACCESSORY_CAPTIONS: Record<string, string> = {
  "electronicscomponentsassembly": "USB hub assembly — rack mount module",
  "electronicscomponentslayout": "USB port layout — industrial hub PCB",
  "electronicscomponentsproductphoto": "Powered USB hub — product photo",
  "electronics-accessories": "USB hub and cable accessories",
  "electronicscomponents-device-showcase": "Device connectivity module showcase",
  "electronicsassemblylabworkbench": "Industrial PSU — lab bench reference",
  "electronicsassemblylab": "Power distribution module assembly",
  "electronicsassembly-detail": "Rack PSU module — detail view",
  "electronics-workbenchdetail": "Cooling fan module — rack airflow",
  "networkdevice-accessories": "Network switch / router accessories",
  "networkdevice-cablesaccessoriesshowcase": "Network cables and rack accessories",
  "computeraccessories-showcase": "Router and switch module showcase",
  "techaccessories-showcase": "Remote setup — workstation accessories",
};

function accessoryCaption(label: string): string {
  const tag = label.toLowerCase();
  for (const [key, caption] of Object.entries(ACCESSORY_CAPTIONS)) {
    if (tag.includes(key)) return caption;
  }
  return formatModelLabel(label);
}

function isModelSpecEntry(label: string): boolean {
  const l = label.toLowerCase();
  if (/structure diagram|structure of b/.test(l)) return false;
  return (
    /\d+\s*gb|\bs[0-9]{1,2}\b|note\s*\d|a908n|oneplus|nubia|flip|pixel|exynos|change\b|perangkat|real device unit/.test(l) &&
    !/chassis front|chassis rear|stacked product|compact rack|custom cabinet|cabinet/i.test(l)
  );
}

function isChassisPhoto(label: string): boolean {
  return /chassis|empty chassis|structure|cabinet|stacked|status led|psu bay|compact rack/i.test(label);
}

function isStructureDiagram(label: string): boolean {
  return /structure diagram|structure of b|structure —/i.test(label);
}

function isWrongCategoryPhoto(label: string, slug: string): boolean {
  const l = label.toLowerCase();
  if (slug === "custom-cabinet") {
    return /motherboard box|android phone farm|real device s8|s8 super|note-|flip|pixel|oneplus|a908n/.test(l);
  }
  if (slug === "phone-farm-box") {
    return /note-8-super|motherboard box/.test(l);
  }
  return false;
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

export type ReferenceModelCard = {
  label: string;
  url: string;
  specs?: ProductImageEntry["specs"];
};

export type CuratedGallery = {
  mainImages: string[];
  captions: Record<string, string>;
  referenceModels: ReferenceModelCard[];
  referenceLabels: string[];
};

export function curateProductGallery(slug: string): CuratedGallery | null {
  const manifest = getProductImageManifest(slug);
  if (manifest.length === 0) return null;

  const captions: Record<string, string> = {};
  for (const e of manifest) {
    if (e.role !== "card") captions[e.url] = ACCESSORY_SLUGS.has(slug) ? accessoryCaption(e.label) : formatModelLabel(e.label);
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
  const chassisOnly = CHASSIS_ONLY_SLUGS.has(slug);

  const pickHero = entries.find((e) => e.role === "hero" && !isWrongCategoryPhoto(e.label, slug));
  const chassisHero = entries.find(
    (e) => isChassisPhoto(e.label) && !isStructureDiagram(e.label) && !isWrongCategoryPhoto(e.label, slug),
  );
  const androidProductHero = entries.find(
    (e) => slug === "android-phone-farm" && /android phone farm/i.test(e.label) && !isModelSpecEntry(e.label),
  );
  const phoneFarmRackHero = entries.find(
    (e) =>
      slug === "phone-farm-box" &&
      /angled|front panel|compact rack|chassis front/i.test(e.label) &&
      !isModelSpecEntry(e.label),
  );
  let hero =
    androidProductHero ??
    phoneFarmRackHero ??
    (chassisOnly && chassisHero ? chassisHero : pickHero);
  if (hero) main.push(hero);

  for (const e of entries) {
    if (e.role === "hero" || main.some((m) => m.url === e.url)) continue;
    if (isWrongCategoryPhoto(e.label, slug)) continue;

    if (isStructureDiagram(e.label)) {
      reference.push(e);
      continue;
    }

    if (chassisOnly) {
      if (isChassisPhoto(e.label) && main.length < limit) main.push(e);
      continue;
    }

    if (slug === "real-device-phone-farm" && /real device|perangkat/i.test(e.label)) {
      if (main.length < limit) main.push(e);
      continue;
    }

    if (isModelSpecEntry(e.label)) {
      reference.push(e);
      const boardInMainGallery = slug === "phone-farm-box" || slug === "android-phone-farm" || slug === "iphone-phone-farm";
      if (main.length < limit && !boardInMainGallery) main.push(e);
      continue;
    }

    if (isChassisPhoto(e.label)) {
      if (CABINET_SLUGS.has(slug) || slug === "custom-cabinet") {
        if (main.length < limit) main.push(e);
      }
      continue;
    }

    if (main.length < limit) {
      main.push(e);
    }
  }

  const mainUrls = new Set(main.map((e) => e.url));
  const seenLabels = new Set<string>();
  const referenceModels = reference
    .map((e) => ({
      label: formatModelLabel(e.label),
      url: e.url,
      specs: e.specs,
    }))
    .filter((r) => {
      if (mainUrls.has(r.url)) return false;
      const key = r.label.toLowerCase();
      if (seenLabels.has(key)) return false;
      seenLabels.add(key);
      return r.label.length > 4;
    });

  // Also surface model-spec gallery shots that landed in main set
  for (const e of entries) {
    if (!isModelSpecEntry(e.label) || isWrongCategoryPhoto(e.label, slug)) continue;
    const label = formatModelLabel(e.label);
    const key = label.toLowerCase();
    if (seenLabels.has(key)) continue;
    seenLabels.add(key);
    referenceModels.push({ label, url: e.url, specs: e.specs });
  }

  return {
    mainImages: [...new Set(main.map((e) => e.url))].slice(0, limit),
    captions,
    referenceModels,
    referenceLabels: referenceModels.map((r) => r.label),
  };
}
