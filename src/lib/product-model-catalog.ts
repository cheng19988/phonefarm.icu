import { getProductImageManifest } from "@/lib/product-image-manifest";
import { formatModelLabel } from "@/lib/product-model-parse";
import type { ReferenceModelCard } from "@/lib/product-gallery-curate";

const GUIDE_PRODUCT_SLUGS = [
  "phone-farm-box",
  "motherboard-box",
  "android-phone-farm",
  "real-device-phone-farm",
  "empty-box-chassis",
] as const;

function isModelEntry(label: string, hasModel: boolean): boolean {
  if (hasModel) return true;
  return /\bsamsung\b|note\s*\d|a908n|oneplus|pixel|nubia|flip|s8|s9|s10|s20|s21|real device/i.test(label);
}

/** All reference model images from synced material library — for guide / catalog pages */
export function getGuideReferenceModels(): ReferenceModelCard[] {
  const out: ReferenceModelCard[] = [];
  const seen = new Set<string>();

  for (const slug of GUIDE_PRODUCT_SLUGS) {
    for (const entry of getProductImageManifest(slug)) {
      if (entry.role === "card") continue;
      const label = formatModelLabel(entry.label);
      const key = label.toLowerCase();
      if (seen.has(key) || !isModelEntry(label, Boolean(entry.specs?.model))) continue;
      seen.add(key);
      out.push({ label, url: entry.url, specs: entry.specs });
    }
  }

  return out;
}
