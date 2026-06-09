type Props = {
  size?: number;
  className?: string;
};

/** Shared brand mark — rack icon on navy gradient with gold accent */
export function BrandMark({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="pf-bg" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f1c3f" />
          <stop offset="1" stopColor="#1e3568" />
        </linearGradient>
        <linearGradient id="pf-gold" x1="8" y1="30" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8c547" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id="pf-slot" x1="8" y1="10" x2="8" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3d5f9a" />
          <stop offset="1" stopColor="#2a4070" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#pf-bg)" />
      <rect x="1" y="1" width="38" height="38" rx="10" stroke="rgba(201,162,39,0.45)" strokeWidth="1" />
      <rect x="7" y="9" width="6" height="9" rx="1.5" fill="url(#pf-slot)" opacity="0.95" />
      <rect x="15" y="9" width="6" height="9" rx="1.5" fill="url(#pf-slot)" opacity="0.85" />
      <rect x="23" y="9" width="6" height="9" rx="1.5" fill="url(#pf-slot)" opacity="0.75" />
      <rect x="7" y="20" width="6" height="9" rx="1.5" fill="url(#pf-slot)" opacity="0.85" />
      <rect x="15" y="20" width="6" height="9" rx="1.5" fill="url(#pf-slot)" opacity="0.75" />
      <rect x="23" y="20" width="6" height="9" rx="1.5" fill="url(#pf-slot)" opacity="0.65" />
      <rect x="5" y="31" width="30" height="2.5" rx="1.25" fill="url(#pf-gold)" />
      <circle cx="32" cy="8" r="2" fill="#e8c547" opacity="0.9" />
    </svg>
  );
}
