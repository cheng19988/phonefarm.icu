"use client";

import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
};

/** Premium rack monogram — navy glass tile + gold rail */
export function BrandMark({ size = 40, className }: Props) {
  const uid = useId().replace(/:/g, "");
  const bg = `pf-bg-${uid}`;
  const gold = `pf-gold-${uid}`;
  const shine = `pf-shine-${uid}`;
  const slot = `pf-slot-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={bg} x1="6" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2a3d5c" />
          <stop offset="0.55" stopColor="#1a2840" />
          <stop offset="1" stopColor="#141e32" />
        </linearGradient>
        <linearGradient id={gold} x1="8" y1="33" x2="36" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d875" />
          <stop offset="0.5" stopColor="#d4af4a" />
          <stop offset="1" stopColor="#b8922e" />
        </linearGradient>
        <linearGradient id={shine} x1="22" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.22" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={slot} x1="10" y1="11" x2="10" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4a6fa5" />
          <stop offset="1" stopColor="#2d4a78" />
        </linearGradient>
        <filter id={`pf-glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="2" y="2" width="40" height="40" rx="11" fill={`url(#${bg})`} />
      <rect x="2" y="2" width="40" height="40" rx="11" fill={`url(#${shine})`} />
      <rect x="2.5" y="2.5" width="39" height="39" rx="10.5" stroke="rgba(212,175,90,0.35)" strokeWidth="1" />
      <rect x="2.5" y="2.5" width="39" height="39" rx="10.5" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

      {/* rack slots */}
      {[10, 18, 26].map((x, col) =>
        [11, 21].map((y, row) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={6}
            height={7.5}
            rx={1.6}
            fill={`url(#${slot})`}
            opacity={0.95 - col * 0.08 - row * 0.06}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.5"
          />
        )),
      )}

      {/* gold power rail */}
      <rect x="7" y="32.5" width="30" height="3" rx="1.5" fill={`url(#${gold})`} filter={`url(#pf-glow-${uid})`} />
      <rect x="9" y="33" width="10" height="1" rx="0.5" fill="white" opacity="0.35" />

      {/* status LED */}
      <circle cx="33" cy="9" r="2.2" fill="#f0d875" opacity="0.95" />
      <circle cx="33" cy="9" r="1" fill="white" opacity="0.5" />
    </svg>
  );
}
