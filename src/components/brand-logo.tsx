type BrandLogoProps = {
  compact?: boolean;
  showText?: boolean;
};

export function BrandLogo({ compact = false, showText = true }: BrandLogoProps) {
  const size = compact ? 32 : 38;
  return (
    <span className="flex items-center gap-2.5 shrink-0">
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="34" height="34" rx="8" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="6" y="7" width="5" height="8" rx="1" fill="#3b82f6" />
        <rect x="13" y="7" width="5" height="8" rx="1" fill="#3b82f6" />
        <rect x="20" y="7" width="5" height="8" rx="1" fill="#3b82f6" />
        <rect x="27" y="7" width="3" height="8" rx="1" fill="#60a5fa" />
        <rect x="6" y="18" width="5" height="8" rx="1" fill="#3b82f6" />
        <rect x="13" y="18" width="5" height="8" rx="1" fill="#3b82f6" />
        <rect x="20" y="18" width="5" height="8" rx="1" fill="#3b82f6" />
        <rect x="27" y="18" width="3" height="8" rx="1" fill="#60a5fa" />
        <line x1="4" y1="30" x2="32" y2="30" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="leading-tight">
          <span className="block font-bold text-[var(--text)] text-sm">PhoneFarm ICU</span>
          {!compact && (
            <span className="block text-[10px] text-[var(--text-subtle)] hidden sm:block">Guangzhou Factory Direct</span>
          )}
        </span>
      )}
    </span>
  );
}
