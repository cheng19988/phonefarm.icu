import type { ProductSeed } from "@/data/products";

export type ProcurementFact = { label: string; value: string };

const DEFAULTS = {
  leadTime:
    "In-stock SKUs: 5–10 business days (workshop QC + packing). Custom configuration: 7–15 business days.",
  packingSize:
    "Single-rack export carton approx. 50 × 35 × 25 cm (L × W × H) — confirmed on packing list",
  grossWeight: "Approx. 10–14 kg gross per single-rack carton (configuration-dependent)",
  voltage: "110–220V AC · region-specific power cable",
  warranty: "12-month hardware support on chassis, fans, and PSU modules (terms in quotation)",
  shipping: "DHL / FedEx / UPS express from Guangzhou; sea freight for bulk pallet orders",
  payment:
    "USDT (TRC20) after order confirmation on /orders, or wire transfer (T/T) for enterprise bulk quotes",
} as const;

function firstMatching(seed: ProductSeed, keys: string[]): string | undefined {
  for (const key of keys) {
    const v = seed.specs[key];
    if (v?.trim()) return v.trim();
  }
  return undefined;
}

function grossWeightFromSeed(seed: ProductSeed): string {
  const explicit = seed.specs["Gross weight"];
  if (explicit) return explicit;
  const net = seed.specs.Weight;
  if (net) {
    return net.includes("gross")
      ? net
      : `${net.replace(/\s*net\b/i, "")} · gross carton typically +2–3 kg on packing list`;
  }
  if (seed.category === "Remote Control") {
    return "N/A — digital service delivery";
  }
  if (seed.slug === "custom-cabinet") {
    return "Crated freight — weight on project packing list";
  }
  return DEFAULTS.grossWeight;
}

function packingSizeFromSeed(seed: ProductSeed): string {
  const explicit = seed.specs["Packing size"];
  if (explicit) return explicit;
  if (seed.category === "Remote Control") return "N/A — PDF guide / remote session";
  if (seed.slug === "custom-cabinet") return "Plywood crate — dimensions per engineering drawing";
  if (seed.packingNotes.some((n) => /pallet|crate/i.test(n))) {
    return "Pallet or multi-carton shipment — outer dimensions on packing list";
  }
  return DEFAULTS.packingSize;
}

function leadTimeFromSeed(seed: ProductSeed): string {
  const explicit = seed.specs["Lead time"];
  if (explicit) return explicit;
  if (seed.slug === "custom-cabinet") {
    return "Typically 2–4 weeks production after engineering sign-off";
  }
  if (seed.category === "Remote Control") {
    return "Scheduled within 3–5 business days after hardware delivery confirmation";
  }
  if (seed.stock <= 3) {
    return "7–15 business days — confirm current stock with sales";
  }
  return DEFAULTS.leadTime;
}

/** Structured B2B procurement facts for PDP and JSON-LD-friendly copy. */
export function buildProcurementFacts(seed: ProductSeed): ProcurementFact[] {
  return [
    { label: "MOQ", value: seed.moqNotes },
    { label: "Lead time", value: leadTimeFromSeed(seed) },
    { label: "Packing size (carton)", value: packingSizeFromSeed(seed) },
    { label: "Gross weight", value: grossWeightFromSeed(seed) },
    {
      label: "Voltage",
      value: firstMatching(seed, ["Power input", "Power", "Input"]) ?? DEFAULTS.voltage,
    },
    {
      label: "Warranty",
      value:
        seed.afterSales.find((s) => /month|support|warranty/i.test(s)) ?? DEFAULTS.warranty,
    },
    { label: "Shipping method", value: DEFAULTS.shipping },
    { label: "Payment process", value: DEFAULTS.payment },
  ];
}
