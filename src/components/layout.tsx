import Link from "next/link";
import { CONTACT, FOOTER_NAV, HEADER_NAV, SITE } from "@/lib/config";
import { BrandLogo } from "./brand-logo";
import { ContactBar } from "./shared";
import { ShopNavDropdown } from "./shop-nav";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
      <div className="hidden md:block bg-[var(--brand)] text-white">
        <div className="container-hero py-2 flex justify-between items-center text-xs">
          <span className="font-medium">{SITE.location} · Factory Direct Hardware Since {SITE.since}</span>
          <ContactBar compact variant="light" />
        </div>
      </div>
      <div className="container-hero py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <BrandLogo />
        </Link>
        <nav className="hidden xl:flex items-center gap-6">
          <ShopNavDropdown />
          {HEADER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {session ? (
            <Link
              href={session.role === "admin" ? "/admin" : "/account/orders"}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand)] py-2"
            >
              Account
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand)] py-2 px-2">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="xl:hidden container-hero pb-3 flex gap-4 overflow-x-auto text-sm border-t border-[var(--border)] pt-2">
        <Link href="/products" className="text-[var(--brand)] font-semibold whitespace-nowrap">Shop</Link>
        {HEADER_NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-[var(--text-muted)] hover:text-[var(--brand)] whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] border-t border-slate-800 mt-auto text-slate-300">
      <div className="container-hero py-14 grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="font-bold text-white text-xl mb-3">{SITE.name}</div>
          <p className="text-slate-400 text-sm mb-5 max-w-md leading-relaxed">{SITE.intro}</p>
          <ContactBar variant="dark" />
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/products" className="hover:text-white">All Products</Link></li>
            <li><Link href="/products/phone-farm-box" className="hover:text-white">Phone Farm Box</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-white">Motherboard Box</Link></li>
            <li><Link href="/products/usb-hub" className="hover:text-white">USB Hub</Link></li>
            <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Buying Guides</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/docs/buying-guide" className="hover:text-white">How to Buy</Link></li>
            <li><Link href="/docs/usdt-payment-guide" className="hover:text-white">USDT Payment</Link></li>
            <li><Link href="/docs/shipping-guide" className="hover:text-white">Shipping Guide</Link></li>
            <li><Link href="/docs/warranty-guide" className="hover:text-white">Warranty</Link></li>
            <li><Link href="/register" className="hover:text-white">Create Account</Link></li>
            <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Support & Company</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/support" className="hover:text-white">Support</Link></li>
            <li><Link href="/knowledge-base" className="hover:text-white">Knowledge Base</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Sales</Link></li>
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location} · {CONTACT.email}
      </div>
    </footer>
  );
}
