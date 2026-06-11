"use client";

import Link from "next/link";
import { useState } from "react";
import { SHOP_MENU } from "@/lib/config";
import { IconChevronDown, IconRack } from "./icons";

export function ShopNavMobile({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const btnClass =
    variant === "dark"
      ? "header-nav-link-mobile inline-flex items-center gap-1.5 whitespace-nowrap"
      : "text-[var(--brand)] font-semibold whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5";

  return (
    <div className="relative shrink-0">
      <button type="button" onClick={() => setOpen((v) => !v)} className={btnClass} aria-expanded={open}>
        <IconRack size={14} className={variant === "dark" ? "text-[var(--header-gold)]" : undefined} />
        Shop
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
                      href={item.href}
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
            <Link href="/products" onClick={() => setOpen(false)} className="header-cta-btn text-xs py-2 px-3">
              All Products
            </Link>
            <Link href="/packages" onClick={() => setOpen(false)} className="header-signin-btn text-xs py-2 px-3">
              Packages
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
