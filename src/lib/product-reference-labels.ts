import type { ProductSeed } from "@/data/products";

/** Parse reference model strings from seed specs into chip labels */
export function referenceLabelsFromSeed(seed: ProductSeed | undefined): string[] {
  if (!seed) return [];
  const raw =
    seed.specs["Reference models"] ??
    seed.specs["Reference model"] ??
    seed.specs["Reference platform"] ??
    seed.specs["Reference layout"];
  if (!raw) return [];
  return raw
    .split(/·|;|,/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && !/gallery shows|confirmed in quote/i.test(s));
}

export function mergeReferenceLabels(curated: string[], seed: ProductSeed | undefined, slug: string): string[] {
  const fromSeed = referenceLabelsFromSeed(seed);
  const merged = [...curated];
  const seen = new Set(curated.map((l) => l.toLowerCase()));

  for (const label of fromSeed) {
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(label);
  }

  if (slug === "iphone-phone-farm" && merged.length === 0) {
    return ["20-slot rack chassis", "Lightning / USB-C cable plan per quote"];
  }

  return merged.slice(0, 14);
}

export type ReferenceContext = "boards" | "chassis" | "accessory" | "project";

export function referenceContextForSlug(slug: string): ReferenceContext {
  if (CHASSIS_SLUGS.has(slug)) return "chassis";
  if (ACCESSORY_SLUGS.has(slug)) return "accessory";
  if (slug === "real-device-phone-farm") return "project";
  return "boards";
}

const CHASSIS_SLUGS = new Set(["iphone-phone-farm", "empty-box-chassis", "custom-cabinet"]);
const ACCESSORY_SLUGS = new Set([
  "usb-hub",
  "power-supply-solution",
  "cooling-solution",
  "network-equipment",
  "remote-control-setup",
]);

export const REFERENCE_SECTION_COPY: Record<ReferenceContext, { title: string; intro: string }> = {
  boards: {
    title: "Reference Configurations",
    intro: "Factory reference boards available for this product line. Final slot layout is confirmed against your model list in the quote.",
  },
  chassis: {
    title: "Chassis Reference",
    intro: "Photos show rack chassis layout and I/O panel. Devices are buyer-supplied unless stated otherwise in your quotation.",
  },
  accessory: {
    title: "Module Reference",
    intro: "Illustrative module photos — exact port count and wattage are confirmed in your quote line item.",
  },
  project: {
    title: "Deployment Reference",
    intro: "Reference hardware layouts for project-scale real-device labs. Rack count and room plan are scoped in the proposal.",
  },
};
