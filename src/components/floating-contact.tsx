"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/config";
import { IconMail, IconTelegram, IconWhatsApp } from "./icons";

const CHANNELS = [
  {
    label: "Telegram",
    value: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    icon: IconTelegram,
  },
  {
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    icon: IconWhatsApp,
  },
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: IconMail,
  },
] as const;

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3 safe-area-pb">
      {open && (
        <div
          className="w-[min(100vw-2rem,17rem)] rounded-xl border border-[var(--border)] bg-white shadow-lg overflow-hidden"
          role="dialog"
          aria-label="Contact sales"
        >
          <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-muted)]/60">
            <p className="text-sm font-semibold text-[var(--text)]">Contact Sales</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Telegram · WhatsApp · Email</p>
          </div>
          <ul className="p-2">
            {CHANNELS.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--surface-muted)] transition-colors group"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--brand)] group-hover:bg-[var(--accent-muted)]">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-[var(--text-subtle)]">{label}</span>
                    <span className="block text-sm font-medium text-[var(--text)] truncate">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-lg hover:bg-[var(--brand-hover)] transition-all hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <IconTelegram size={26} />
        )}
      </button>
    </div>
  );
}
