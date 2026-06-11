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
    priceLabel: "From $280",
    description: "Chassis shell or accessory kit for sample evaluation.",
    features: ["Empty box chassis or USB/power accessory", "Sample order from 1 unit", "USDT checkout after login", "Bulk quote via contact"],
    cta: "Shop Starter SKUs",
    href: "/products/empty-box-chassis",
  },
  {
    id: "professional",
    name: "Professional",
    priceLabel: "From $699",
    description: "Full rack deployment with power, cooling, and setup guidance.",
    features: ["20-node phone farm rack", "Power + fan cooling modules", "Buy online or request bulk quote", "5–10 day lead time (in stock)"],
    cta: "View Phone Farm Box",
    href: "/products/phone-farm-box",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLabel: "Custom quote",
    description: "Multi-rack, custom cabinet, OEM/ODM discussion, and bulk freight.",
    features: ["MOQ from 5+ units", "Custom rack cabinets", "Bulk deployment planning", "USDT or T/T on confirmation"],
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
