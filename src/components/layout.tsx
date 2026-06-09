import Link from "next/link";
import { CONTACT, FOOTER_NAV, HEADER_NAV, SITE } from "@/lib/config";
import { BrandLogo } from "./brand-logo";
import { ContactBar } from "./shared";
import { ShopNavDropdown } from "./shop-nav";
import { ShopNavMobile } from "./shop-nav-mobile";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 bg-[var(--dark-bg)]/95 backdrop-blur-md border-b border-white/10">
      <div className="hidden lg:block border-b border-white/5">
        <div className="container-hero py-2 flex justify-between items-center text-[11px] text-slate-400 tracking-wide">
          <span>
            {SITE.location} · Factory Direct Hardware · Est. {SITE.since}
          </span>
          <ContactBar compact variant="light" />
        </div>
      </div>
      <div className="container-hero py-4 flex items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <BrandLogo variant="light" />
        </Link>
        <nav className="hidden xl:flex items-center gap-8">
          <ShopNavDropdown variant="dark" />
          {HEADER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <Link href={session.role === "admin" ? "/admin" : "/account/orders"} className="text-sm text-slate-300 hover:text-white py-2">
              Account
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline text-sm text-slate-300 hover:text-white py-2 px-2">
                Sign In
              </Link>
              <Link href="/register" className="btn-accent text-sm py-2.5 px-5 whitespace-nowrap">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="xl:hidden relative container-hero pb-3 flex gap-5 overflow-x-auto text-sm border-t border-white/10 pt-3">
        <ShopNavMobile variant="dark" />
        {HEADER_NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-slate-400 hover:text-white whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] border-t border-white/10 mt-auto text-slate-400">
      <div className="container-hero py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="font-semibold text-white text-2xl mb-4 tracking-tight">{SITE.name}</div>
          <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">{SITE.intro}</p>
          <ContactBar variant="dark" />
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-5">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/products/phone-farm-box" className="hover:text-white transition-colors">Phone Farm Box</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-white transition-colors">Motherboard Box</Link></li>
            <li><Link href="/packages" className="hover:text-white transition-colors">Packages</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-5">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/phone-farm" className="hover:text-white transition-colors">Phone Farm Guide</Link></li>
            <li><Link href="/docs/buying-guide" className="hover:text-white transition-colors">How to Buy</Link></li>
            <li><Link href="/docs/usdt-payment-guide" className="hover:text-white transition-colors">USDT Payment</Link></li>
            <li><Link href="/knowledge-base" className="hover:text-white transition-colors">Knowledge Base</Link></li>
            <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-5">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
            {FOOTER_NAV.filter((i) => !["/about", "/contact"].includes(i.href)).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location} · {CONTACT.email}
      </div>
    </footer>
  );
}
