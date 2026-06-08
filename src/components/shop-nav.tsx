import Link from "next/link";
import { SHOP_MENU } from "@/lib/config";

export function ShopNavDropdown() {
  return (
    <div className="relative group">
      <Link
        href="/products"
        className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1"
      >
        Shop
        <span className="text-[10px] text-slate-500 group-hover:text-slate-300">▾</span>
      </Link>
      <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
        <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-8 min-w-[640px]">
          {SHOP_MENU.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-3">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-white block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 lg:col-span-4 pt-4 border-t border-slate-800 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary text-sm py-2 px-4">All Products</Link>
            <Link href="/packages" className="btn-secondary text-sm py-2 px-4">Packages</Link>
            <Link href="/pricing" className="btn-outline text-sm py-2 px-4">Pricing</Link>
            <Link href="/register" className="text-sm text-cyan-400 hover:text-white py-2 px-2">Sign Up →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
