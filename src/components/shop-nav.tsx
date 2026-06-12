import Link from "next/link";
import { SHOP_MENU } from "@/lib/config";
import { IconChevronDown, IconRack } from "./icons";

export function ShopNavDropdown({ variant = "light" }: { variant?: "light" | "dark" }) {
  const linkClass =
    variant === "dark"
      ? "header-nav-link header-nav-link-shop inline-flex items-center gap-1.5"
      : "header-nav-link header-nav-link-shop inline-flex items-center gap-1.5";

  return (
    <div className="relative group">
      <Link href="/products" className={linkClass}>
        <IconRack size={15} className="text-[var(--accent)]" />
        Shop
        <IconChevronDown size={14} className="opacity-60 transition-transform group-hover:rotate-180 duration-300" />
      </Link>
      <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-50">
        <div className="header-shop-panel grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 min-w-[min(92vw,680px)] max-w-[92vw] p-6 lg:p-7">
          {SHOP_MENU.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.16em] mb-3">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 lg:col-span-4 pt-4 border-t border-[var(--border)] flex flex-wrap gap-2.5">
            <Link href="/contact" className="header-cta-btn text-sm py-2 px-4">
              Request Quote
            </Link>
            <Link href="/products" className="btn-secondary text-sm py-2 px-4">
              All Products
            </Link>
            <Link href="/packages" className="btn-secondary text-sm py-2 px-4">
              Packages
            </Link>
            <Link href="/pricing" className="btn-secondary text-sm py-2 px-4">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
