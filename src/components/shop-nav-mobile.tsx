"use client";

import Link from "next/link";
import { useState } from "react";
import { SHOP_MENU } from "@/lib/config";

export function ShopNavMobile({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const btnClass =
    variant === "dark"
      ? "text-white font-semibold whitespace-nowrap flex items-center gap-1"
      : "text-[var(--brand)] font-semibold whitespace-nowrap flex items-center gap-1";

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={btnClass}
        aria-expanded={open}
      >
        Shop
        <span className="text-[10px]">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-[var(--border)] shadow-lg z-50 px-4 py-4 max-h-[70vh] overflow-y-auto">
          {SHOP_MENU.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <p className="text-xs font-bold text-[var(--brand)] uppercase mb-2">{group.title}</p>
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
            <Link href="/products" onClick={() => setOpen(false)} className="btn-primary text-xs py-2 px-3">
              All Products
            </Link>
            <Link href="/packages" onClick={() => setOpen(false)} className="btn-secondary text-xs py-2 px-3">
              Packages
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
