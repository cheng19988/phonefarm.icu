import { formatUsd } from "@/lib/pricing";

type PriceTagProps = {
  priceUsd: number;
  label?: string;
  size?: "sm" | "md" | "lg";
};

export function PriceTag({ priceUsd, label = "USD", size = "md" }: PriceTagProps) {
  const sizeClass =
    size === "lg" ? "text-3xl md:text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={`font-bold text-[var(--accent)] ${sizeClass}`}>
        {formatUsd(priceUsd)}
      </span>
      <span className="text-sm font-medium text-[var(--text-subtle)]">{label}</span>
    </span>
  );
}
