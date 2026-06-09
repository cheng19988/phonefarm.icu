import type { ReactNode } from "react";

type IconProps = { className?: string; size?: number };

function strokeProps({ className, size = 16 }: IconProps) {
  return {
    className: className ?? "shrink-0",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export function IconBadge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "neutral";
  className?: string;
}) {
  return (
    <span
      className={`header-icon-badge ${tone === "gold" ? "header-icon-badge-gold" : "header-icon-badge-neutral"} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function IconChevronDown({ className, size }: IconProps) {
  const p = strokeProps({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export function IconPhone({ className, size }: IconProps) {
  const p = strokeProps({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M6.5 3.5h3.2l1.4 3.6-2.2 1.6a10.5 10.5 0 0 0 4.8 4.8l1.6-2.2 3.6 1.4v3.2a1.8 1.8 0 0 1-1.8 1.8C8.9 17.5 6.5 15.1 6.5 12V6.3a2.8 2.8 0 0 1 2.8-2.8Z" />
    </svg>
  );
}

export function IconMail({ className, size }: IconProps) {
  const p = strokeProps({ className, size });
  return (
    <svg {...p} aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="M3 7.5 12 13l9-5.5" />
    </svg>
  );
}

export function IconWhatsApp({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className ?? "shrink-0"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.08h-.01a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.14.82.84-3.06-.19-.31a8.08 8.08 0 0 1-1.24-4.33c0-4.46 3.63-8.09 8.09-8.09s8.09 3.63 8.09 8.09-3.63 8.09-8.09 8.09z" />
      <path d="M16.53 14.13c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24s.96 2.6 1.09 2.78c.13.18 1.89 2.89 4.58 4.05.64.28 1.14.45 1.53.57.64.2 1.23.17 1.69.1.52-.08 1.58-.65 1.8-1.27.22-.62.22-1.15.16-1.27-.07-.11-.24-.18-.51-.32z" />
    </svg>
  );
}

export function IconTelegram({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className ?? "shrink-0"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export function IconShop({ className, size }: IconProps) {
  const p = strokeProps({ className, size });
  return (
    <svg {...p} aria-hidden>
      <path d="M4 9h16l-1.2 10H5.2L4 9Z" />
      <path d="M9 9V6.8a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

export function IconUser({ className, size }: IconProps) {
  const p = strokeProps({ className, size });
  return (
    <svg {...p} aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
    </svg>
  );
}

export function IconRack({ className, size }: IconProps) {
  const p = strokeProps({ className, size });
  return (
    <svg {...p} aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 8h8M8 12h8M8 16h8" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconGrid({ className, size }: IconProps) {
  return <IconRack className={className} size={size} />;
}
