import Link from "next/link";
import { SHOP_MENU } from "@/lib/config";

export function ShopNavDropdown() {
  return (
    <div className="relative group">
      <Link
        href="/products"
        className="text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)] transition-colors flex items-center gap-1"
      >
        Shop
        <span className="text-[10px] opacity-60">▾</span>
      </Link>
      <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
        <div className="bg-white border border-[var(--border)] rounded-2xl shadow-xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-8 min-w-[min(90vw,640px)] max-w-[90vw]">
          {SHOP_MENU.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-bold text-[var(--brand)] uppercase tracking-wide mb-3">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 lg:col-span-4 pt-4 border-t border-[var(--border)] flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary text-sm py-2 px-4">All Products</Link>
            <Link href="/packages" className="btn-secondary text-sm py-2 px-4">Packages</Link>
            <Link href="/pricing" className="btn-outline text-sm py-2 px-4">Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
