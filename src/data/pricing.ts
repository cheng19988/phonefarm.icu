import { PRODUCT_SEEDS } from "./products";

export type PricingTier = {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "From $428",
    description: "Single rack or accessory kit for sample evaluation.",
    features: ["1× phone farm rack or chassis", "USB hub or power accessory", "Sample order available", "Written quote on request"],
    cta: "Request Starter Quote",
    href: "/contact?product=phone-farm-box",
  },
  {
    id: "professional",
    name: "Professional",
    priceLabel: "From $699",
    description: "Full rack deployment with power, cooling, and setup guidance.",
    features: ["20-node phone farm rack", "Power + fan cooling modules", "Pre-sales configuration call", "5–10 day lead time (in stock)"],
    cta: "Request Professional Quote",
    href: "/contact?product=phone-farm-box",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLabel: "Custom quote",
    description: "Multi-rack, custom cabinet, OEM/ODM discussion, and bulk freight.",
    features: ["MOQ from 5+ units", "Custom rack cabinets", "Bulk deployment planning", "Invoice / T/T on confirmation"],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export function getCatalogPriceTable() {
  return PRODUCT_SEEDS.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    priceUsd: p.priceUsd,
    stock: p.stock,
  })).sort((a, b) => a.priceUsd - b.priceUsd);
}
