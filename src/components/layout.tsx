import Link from "next/link";
import { CONTACT, FOOTER_NAV, HEADER_NAV, SITE } from "@/lib/config";
import { BrandLogo } from "./brand-logo";
import { IconUser } from "./icons";
import { ShopNavDropdown } from "./shop-nav";
import { ShopNavMobile } from "./shop-nav-mobile";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-hero">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-[4.5rem]">
          <Link href="/" className="shrink-0 min-w-0">
            <BrandLogo variant="dark" compact />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            <ShopNavDropdown variant="light" />
            {HEADER_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="header-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {session ? (
              <Link
                href={session.role === "admin" ? "/admin" : "/account/orders"}
                className="header-account-btn"
              >
                <IconUser size={16} />
                <span className="hidden sm:inline">Account</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="header-signin-btn hidden sm:inline-flex">
                  Sign In
                </Link>
                <Link href="/register" className="header-cta-btn">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="xl:hidden flex items-center gap-1 overflow-x-auto pb-3 scrollbar-none border-t border-[var(--border)] pt-2.5">
          <ShopNavMobile variant="light" />
          {HEADER_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link-mobile whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer mt-auto">
      <div className="container-hero py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-block mb-5">
            <BrandLogo variant="light" />
          </Link>
          <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">{SITE.intro}</p>
          <p className="text-xs text-slate-500 mb-4">
            {SITE.location} · Factory Direct · Est. {SITE.since}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
              Telegram {CONTACT.telegram}
            </a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
              WhatsApp {CONTACT.whatsapp}
            </a>
            <Link href="/contact#email" className="footer-link">{CONTACT.email}</Link>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="footer-heading">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/products" className="footer-link">All Products</Link></li>
            <li><Link href="/products/phone-farm-box" className="footer-link">Phone Farm Box</Link></li>
            <li><Link href="/products/motherboard-box" className="footer-link">Motherboard Box</Link></li>
            <li><Link href="/packages" className="footer-link">Packages</Link></li>
            <li><Link href="/pricing" className="footer-link">Pricing</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="footer-heading">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/phone-farm" className="footer-link">Phone Farm Guide</Link></li>
            <li><Link href="/docs/buying-guide" className="footer-link">How to Buy</Link></li>
            <li><Link href="/docs/usdt-payment-guide" className="footer-link">USDT Payment</Link></li>
            <li><Link href="/knowledge-base" className="footer-link">Knowledge Base</Link></li>
            <li><Link href="/for-ai" className="footer-link">AI Fact Sheet</Link></li>
            <li><Link href="/support" className="footer-link">Support</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="footer-heading">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="footer-link">About</Link></li>
            <li><Link href="/contact" className="footer-link">Contact Sales</Link></li>
            {FOOTER_NAV.filter((i) => !["/about", "/contact"].includes(i.href)).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="site-footer-bar py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </div>
    </footer>
  );
}
