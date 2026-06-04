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
    description: "Single box or entry kit for evaluation and small teams.",
    features: ["1× Phone Farm Box or starter chassis", "USB hub basics", "Email support", "USDT or quote checkout"],
    cta: "Browse Starter Products",
    href: "/products?sort=price-asc",
  },
  {
    id: "professional",
    name: "Professional",
    priceLabel: "From $699",
    description: "Full 20-node deployments with power, cooling, and setup support.",
    features: ["20-node phone farm box", "Power + cooling modules", "Remote control setup option", "3–5 day ship on in-stock SKUs"],
    cta: "View Professional Catalog",
    href: "/products",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLabel: "Custom quote",
    description: "Bulk boxes, custom cabinets, overseas delivery, dedicated support.",
    features: ["MOQ from 5+ units", "Custom rack cabinets", "Bulk deployment service", "1:1 project manager"],
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
