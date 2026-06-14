"use client";

import Link from "next/link";
import { useState } from "react";
import { SHOP_MENU } from "@/lib/config";
import { localePath, type Locale } from "@/lib/i18n/config";
import { NAV_ZH } from "@/lib/i18n/zh-site";
import { IconChevronDown, IconRack } from "./icons";

function localizeHref(locale: Locale, href: string) {
  if (href.startsWith("/products") || href.startsWith("/packages") || href === "/phone-farm") {
    return localePath(locale, href);
  }
  return href;
}

export function ShopNavMobile({ variant = "light", locale = "en" }: { variant?: "light" | "dark"; locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const btnClass =
    variant === "dark"
      ? "header-nav-link-mobile inline-flex items-center gap-1.5 whitespace-nowrap"
      : "text-[var(--brand)] font-semibold whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5";

  return (
    <div className="relative shrink-0">
      <button type="button" onClick={() => setOpen((v) => !v)} className={btnClass} aria-expanded={open}>
        <IconRack size={14} className={variant === "dark" ? "text-[var(--header-gold)]" : undefined} />
        {locale === "zh" ? NAV_ZH.shop : "Shop"}
        <IconChevronDown size={13} className={`opacity-70 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 header-shop-panel z-50 px-4 py-4 max-h-[70vh] overflow-y-auto min-w-[280px]">
          {SHOP_MENU.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.14em] mb-2">{group.title}</p>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizeHref(locale, item.href)}
                      onClick={() => setOpen(false)}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
            <Link href={localePath(locale, "/contact")} onClick={() => setOpen(false)} className="header-cta-btn text-xs py-2 px-3">
              {locale === "zh" ? NAV_ZH.requestQuote : "Request Quote"}
            </Link>
            <Link href={localePath(locale, "/products")} onClick={() => setOpen(false)} className="header-signin-btn text-xs py-2 px-3">
              {locale === "zh" ? NAV_ZH.allProducts : "All Products"}
            </Link>
            <Link href={localePath(locale, "/packages")} onClick={() => setOpen(false)} className="header-signin-btn text-xs py-2 px-3">
              {locale === "zh" ? NAV_ZH.packages : "Packages"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
