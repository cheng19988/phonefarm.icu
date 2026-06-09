import { PAYMENT } from "@/lib/config";
import { getProductSeed } from "@/data/products";

/** All monetary values in this app are USD dollars (not cents). */
export function roundUsd(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Canonical product USD price — PRODUCT_SEEDS is source of truth when defined. */
export function canonicalProductPriceUsd(slug: string, dbPriceUsd?: number | null): number {
  const seed = getProductSeed(slug);
  if (seed) return seed.priceUsd;
  if (dbPriceUsd != null && Number.isFinite(dbPriceUsd)) return roundUsd(dbPriceUsd);
  throw new Error(`Unknown product price for slug: ${slug}`);
}

export function lineTotalUsd(unitPrice: number, quantity: number): number {
  return roundUsd(unitPrice * quantity);
}

export function formatUsd(amount: number): string {
  const n = roundUsd(amount);
  const hasCents = Math.round(n * 100) % 100 !== 0;
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatUsdt(amount: number): string {
  return roundUsd(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** USDT amount equals order USD total (1:1), with platform minimum. */
export function usdToUsdt(usd: number): number {
  return Math.max(PAYMENT.minAmount, roundUsd(usd));
}
