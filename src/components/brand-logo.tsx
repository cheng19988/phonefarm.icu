type BrandLogoProps = {
  compact?: boolean;
  showText?: boolean;
};

export function BrandLogo({ compact = false, showText = true }: BrandLogoProps) {
  const size = compact ? 32 : 36;
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
        <rect x="1" y="1" width="34" height="34" rx="6" className="stroke-slate-600" strokeWidth="1.5" fill="#0f172a" />
        <rect x="6" y="7" width="5" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="13" y="7" width="5" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="20" y="7" width="5" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="27" y="7" width="3" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="6" y="18" width="5" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="13" y="18" width="5" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="20" y="18" width="5" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <rect x="27" y="18" width="3" height="8" rx="1" className="fill-slate-700 stroke-slate-500" strokeWidth="0.75" />
        <line x1="4" y1="30" x2="32" y2="30" className="stroke-cyan-600" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="leading-tight">
          <span className="block font-bold text-white text-sm">PhoneFarm ICU</span>
          {!compact && (
            <span className="block text-[10px] text-slate-500 hidden sm:block">Phone Farm Hardware</span>
          )}
        </span>
      )}
    </span>
  );
}
