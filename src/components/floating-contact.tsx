import { CONTACT } from "@/lib/config";
import { IconMail, IconTelegram, IconWhatsApp } from "./icons";

const CHANNELS = [
  {
    label: "Telegram",
    href: CONTACT.telegramUrl,
    icon: IconTelegram,
    className: "floating-contact-telegram",
  },
  {
    label: "WhatsApp",
    href: CONTACT.whatsappUrl,
    icon: IconWhatsApp,
    className: "floating-contact-whatsapp",
  },
  {
    label: "Email",
    href: `mailto:${CONTACT.email}`,
    icon: IconMail,
    className: "floating-contact-email",
  },
] as const;

export function FloatingContact() {
  return (
    <nav
      className="floating-contact-dock safe-area-pb"
      aria-label="Contact sales"
    >
      <ul className="flex flex-col gap-3">
        {CHANNELS.map(({ label, href, icon: Icon, className }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`floating-contact-btn ${className}`}
              aria-label={label}
              title={label}
            >
              <Icon size={26} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
