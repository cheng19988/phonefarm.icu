import Link from "next/link";
import { CONTACT, FOOTER_NAV, HEADER_NAV, SITE } from "@/lib/config";
import { BrandLogo } from "./brand-logo";
import { IconMail, IconPhone, IconTelegram, IconUser, IconWhatsApp } from "./icons";
import { ShopNavDropdown } from "./shop-nav";
import { ShopNavMobile } from "./shop-nav-mobile";
import { getSession } from "@/lib/auth";

function HeaderContactStrip() {
  const itemClass =
    "inline-flex items-center gap-1.5 text-slate-400 hover:text-[var(--accent)] transition-colors";

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1.5 text-[11px]">
      <a href={`tel:${CONTACT.phone}`} className={itemClass}>
        <IconPhone size={13} />
        {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={itemClass}>
        <IconWhatsApp size={13} />
        WhatsApp
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className={itemClass}>
        <IconTelegram size={13} />
        Telegram
      </a>
      <a href={`mailto:${CONTACT.email}`} className={`${itemClass} hidden xl:inline-flex`}>
        <IconMail size={13} />
        {CONTACT.email}
      </a>
    </div>
  );
}

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#060b18]/92 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
      <div className="hidden lg:block border-b border-white/[0.06] bg-[#080f1f]/80">
        <div className="container-hero py-2 flex justify-between items-center gap-6">
          <p className="text-[11px] text-slate-500 tracking-wide flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80" aria-hidden />
            {SITE.location} · Factory Direct · Est. {SITE.since}
          </p>
          <HeaderContactStrip />
        </div>
      </div>

      <div className="container-hero">
        <div className="flex items-center justify-between gap-4 h-[4.25rem] md:h-[4.75rem]">
          <Link href="/" className="shrink-0 min-w-0">
            <BrandLogo variant="light" />
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            <ShopNavDropdown variant="dark" />
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

        <nav className="xl:hidden flex items-center gap-1 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-none border-t border-white/[0.06] pt-2.5">
          <ShopNavMobile variant="dark" />
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
    <footer className="bg-[var(--dark-bg)] border-t border-white/10 mt-auto text-slate-400">
      <div className="container-hero py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-block mb-5">
            <BrandLogo variant="light" />
          </Link>
          <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">{SITE.intro}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <IconPhone size={15} />
              {CONTACT.phone}
            </a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <IconWhatsApp size={15} />
              WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <IconMail size={15} />
              {CONTACT.email}
            </a>
          </div>
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
