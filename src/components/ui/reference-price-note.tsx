import { REFERENCE_PRICE_NOTE } from "@/lib/pricing-copy";

export function ReferencePriceNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-[var(--text-subtle)] ${className}`}>{REFERENCE_PRICE_NOTE}</p>
  );
}
