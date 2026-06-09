import { BrandMark } from "./brand-mark";

type BrandLogoProps = {
  compact?: boolean;
  showText?: boolean;
  variant?: "light" | "dark";
};

export function BrandLogo({ compact = false, showText = true, variant = "dark" }: BrandLogoProps) {
  const markSize = compact ? 34 : 42;

  return (
    <span className="flex items-center gap-3 shrink-0 group">
      <span className="relative shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
        <span className="absolute inset-0 rounded-xl bg-[var(--accent)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        <BrandMark size={markSize} className="relative" />
      </span>
      {showText && (
        <span className="leading-none">
          <span className="flex items-baseline gap-0.5">
            <span
              className={`font-bold tracking-tight ${compact ? "text-sm" : "text-[1.05rem] md:text-lg"} ${
                variant === "light" ? "text-white" : "text-[var(--text)]"
              }`}
            >
              PhoneFarm
            </span>
            <span className={`font-bold tracking-tight ${compact ? "text-sm" : "text-[1.05rem] md:text-lg"} text-[#e8c96a]`}>
              ICU
            </span>
          </span>
          {!compact && (
            <span
              className={`block mt-1 text-[10px] tracking-[0.14em] uppercase font-medium ${
                variant === "light" ? "text-[#9aa8be]" : "text-[var(--text-subtle)]"
              } hidden sm:block`}
            >
              Guangzhou · Factory Direct
            </span>
          )}
        </span>
      )}
    </span>
  );
}
