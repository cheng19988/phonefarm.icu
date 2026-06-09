type IconProps = { className?: string; size?: number };

function base({ className, size = 16 }: IconProps) {
  return { className: className ?? "shrink-0", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
}

export function IconChevronDown({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconPhone({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function IconMail({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconWhatsApp({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M12 2a10 10 0 00-8.9 14.6L2 22l5.5-1.1A10 10 0 1012 2z" />
      <path d="M8.5 9.5c.2-.5.8-.8 1.2-.7.3 0 .6 0 .9.1.2.1.4.5.5.7.1.3.1.6 0 .9-.2.5-.5 1-.7 1.4-.1.2-.1.4 0 .6.3.5.7 1 1.2 1.3.2.1.4.1.6 0 .5-.2 1-.5 1.4-.7.2-.1.4-.1.6 0 .3.2.6.5.8.8.2.4.1.8-.1 1.2-.4.7-1 1.3-1.7 1.7-.5.3-1 .4-1.5.3-.9-.2-1.8-.6-2.5-1.2-1.5-1.2-2.6-2.8-3.1-4.6-.2-.6-.1-1.2.2-1.7z" />
    </svg>
  );
}

export function IconTelegram({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M8 12l8-4-2.5 9-2-3.5-3.5-1.5z" />
    </svg>
  );
}

export function IconShop({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M3 9h18l-1.5 11H4.5L3 9z" />
      <path d="M8 9V6a4 4 0 018 0v3" />
    </svg>
  );
}

export function IconUser({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function IconGrid({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconMenu({ className, size }: IconProps) {
  const p = base({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
