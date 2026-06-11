"use client";

import { useCallback, useState } from "react";
import { CONTACT } from "@/lib/config";
import { IconMail, IconTelegram, IconWhatsApp } from "./icons";

const LINK_CHANNELS = [
  {
    label: "Telegram",
    detail: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    icon: IconTelegram,
    className: "floating-contact-telegram",
  },
  {
    label: "WhatsApp",
    detail: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    icon: IconWhatsApp,
    className: "floating-contact-whatsapp",
  },
] as const;

export function FloatingContact() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      window.prompt("Copy email address:", CONTACT.email);
    }
  }, []);

  return (
    <nav className="floating-contact-dock safe-area-pb" aria-label="Contact sales">
      <ul className="flex flex-col gap-3">
        {LINK_CHANNELS.map(({ label, detail, href, icon: Icon, className }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`floating-contact-btn ${className}`}
              aria-label={`${label} ${detail}`}
              title={`${label}: ${detail}`}
            >
              <Icon size={26} />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copyEmail}
            className={`floating-contact-btn floating-contact-email ${emailCopied ? "floating-contact-copied" : ""}`}
            aria-label={emailCopied ? "Email copied" : `Copy email ${CONTACT.email}`}
            title={emailCopied ? "Copied!" : CONTACT.email}
          >
            {emailCopied ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <IconMail size={26} />
            )}
          </button>
        </li>
      </ul>
      {emailCopied && (
        <p className="floating-contact-toast" role="status">
          Email copied
        </p>
      )}
    </nav>
  );
}
