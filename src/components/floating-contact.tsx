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
  return (
    <aside
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[60] w-[min(100vw-1.5rem,18rem)] safe-area-pb"
      aria-label="Contact sales"
    >
      <div className="rounded-xl border border-[var(--border)] bg-white/95 backdrop-blur-md shadow-lg overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-[var(--border)] bg-[var(--surface-muted)]/70">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Contact Sales</p>
        </div>
        <ul className="p-1.5">
          {CHANNELS.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[var(--surface-muted)] transition-colors group"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--brand)] group-hover:bg-[var(--accent-muted)]">
                  <Icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] text-[var(--text-subtle)] leading-none mb-0.5">{label}</span>
                  <span className="block text-xs font-semibold text-[var(--text)] truncate">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
