type BrandLogoProps = {
  compact?: boolean;
  showText?: boolean;
  variant?: "light" | "dark";
};

export function BrandLogo({ compact = false, showText = true, variant = "dark" }: BrandLogoProps) {
  const size = compact ? 32 : 40;
  const textMain = variant === "light" ? "text-white" : "text-[var(--text)]";
  const textSub = variant === "light" ? "text-slate-400" : "text-[var(--text-subtle)]";

  return (
    <span className="flex items-center gap-3 shrink-0">
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="34" height="34" rx="6" fill="#0f1c3f" stroke="#c9a227" strokeWidth="1" />
        <rect x="6" y="7" width="5" height="8" rx="1" fill="#2a4070" />
        <rect x="13" y="7" width="5" height="8" rx="1" fill="#2a4070" />
        <rect x="20" y="7" width="5" height="8" rx="1" fill="#2a4070" />
        <rect x="27" y="7" width="3" height="8" rx="1" fill="#3d5a8a" />
        <rect x="6" y="18" width="5" height="8" rx="1" fill="#2a4070" />
        <rect x="13" y="18" width="5" height="8" rx="1" fill="#2a4070" />
        <rect x="20" y="18" width="5" height="8" rx="1" fill="#2a4070" />
        <rect x="27" y="18" width="3" height="8" rx="1" fill="#3d5a8a" />
        <line x1="4" y1="30" x2="32" y2="30" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="leading-tight">
          <span className={`block font-semibold ${textMain} text-sm tracking-tight`}>PhoneFarm ICU</span>
          {!compact && (
            <span className={`block text-[10px] ${textSub} hidden sm:block tracking-wide`}>Guangzhou Factory Direct</span>
          )}
        </span>
      )}
    </span>
  );
}
