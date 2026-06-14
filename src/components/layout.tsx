import Link from "next/link";
import { CONTACT, FOOTER_NAV, HEADER_NAV, SITE } from "@/lib/config";
import { BrandLogo } from "./brand-logo";
import { IconUser } from "./icons";
import { ShopNavDropdown } from "./shop-nav";
import { ShopNavMobile } from "./shop-nav-mobile";
import { LanguageSwitcher } from "./language-switcher";
import { getRequestLocale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { NAV_ZH, ZH_SITE } from "@/lib/i18n/zh-site";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();
  const locale = await getRequestLocale();
  const isZh = locale === "zh";
  const homeHref = localePath(locale, "/");
  const contactHref = localePath(locale, "/contact");

  const navItems = isZh
    ? [
        { href: localePath("zh", "/phone-farm"), label: NAV_ZH.phoneFarm },
        { href: localePath("zh", "/packages"), label: NAV_ZH.packages },
        { href: localePath("zh", "/pricing"), label: NAV_ZH.pricing },
        { href: "/support", label: NAV_ZH.support },
        { href: "/knowledge-base", label: NAV_ZH.knowledgeBase },
        { href: "/docs", label: NAV_ZH.docs },
        { href: "/blog", label: NAV_ZH.blog },
        { href: localePath("zh", "/contact"), label: NAV_ZH.contact },
      ]
    : HEADER_NAV.map((item) => ({ href: item.href, label: item.label }));

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-hero">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-[4.5rem]">
          <Link href={homeHref} className="shrink-0 min-w-0">
            <BrandLogo variant="dark" compact />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            <ShopNavDropdown variant="light" locale={locale} />
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="header-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />
            {session ? (
              <Link
                href={session.role === "admin" ? "/admin" : "/account/orders"}
                className="header-account-btn"
              >
                <IconUser size={16} />
                <span className="hidden sm:inline">{isZh ? NAV_ZH.account : "Account"}</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="header-signin-btn hidden sm:inline-flex">
                  {isZh ? NAV_ZH.signIn : "Sign In"}
                </Link>
                <Link href={contactHref} className="header-cta-btn">
                  {isZh ? NAV_ZH.requestQuote : "Request Quote"}
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="xl:hidden flex items-center gap-1 overflow-x-auto pb-3 scrollbar-none border-t border-[var(--border)] pt-2.5">
          <ShopNavMobile variant="light" locale={locale} />
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link-mobile whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export async function Footer() {
  const locale = await getRequestLocale();
  const isZh = locale === "zh";
  const homeHref = localePath(locale, "/");
  const intro = isZh ? ZH_SITE.intro : SITE.intro;
  const location = isZh ? ZH_SITE.location : SITE.location;

  return (
    <footer className="site-footer mt-auto">
      <div className="container-hero py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Link href={homeHref} className="inline-block mb-5">
            <BrandLogo variant="light" />
          </Link>
          <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">{intro}</p>
          <p className="text-xs text-slate-500 mb-4">
            {location} · {isZh ? "工厂直供" : "Factory Direct"} · {isZh ? "始于" : "Est."} {SITE.since}
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
          <h3 className="footer-heading">{isZh ? "产品" : "Shop"}</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href={localePath(locale, "/products")} className="footer-link">{isZh ? NAV_ZH.allProducts : "All Products"}</Link></li>
            <li><Link href={localePath(locale, "/products/phone-farm-box")} className="footer-link">{isZh ? NAV_ZH.phoneFarmBox : "Phone Farm Box"}</Link></li>
            <li><Link href={localePath(locale, "/products/motherboard-box")} className="footer-link">{isZh ? NAV_ZH.motherboardBox : "Motherboard Box"}</Link></li>
            <li><Link href={localePath(locale, "/packages")} className="footer-link">{isZh ? NAV_ZH.packages : "Packages"}</Link></li>
            <li><Link href={localePath(locale, "/pricing")} className="footer-link">{isZh ? NAV_ZH.pricing : "Pricing"}</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="footer-heading">{isZh ? "资源" : "Resources"}</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href={localePath(locale, "/phone-farm")} className="footer-link">{isZh ? NAV_ZH.phoneFarmGuide : "Phone Farm Guide"}</Link></li>
            <li><Link href="/docs/buying-guide" className="footer-link">{isZh ? NAV_ZH.howToBuy : "How to Buy"}</Link></li>
            <li><Link href="/docs/usdt-payment-guide" className="footer-link">{isZh ? NAV_ZH.usdtPayment : "USDT Payment"}</Link></li>
            <li><Link href="/knowledge-base" className="footer-link">{isZh ? NAV_ZH.knowledgeBase : "Knowledge Base"}</Link></li>
            <li><Link href={localePath(locale, "/for-ai")} className="footer-link">{isZh ? NAV_ZH.aiFactSheet : "AI Fact Sheet"}</Link></li>
            <li><Link href="/support" className="footer-link">{isZh ? NAV_ZH.support : "Support"}</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="footer-heading">{isZh ? "公司" : "Company"}</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href={localePath(locale, "/about")} className="footer-link">{isZh ? NAV_ZH.about : "About"}</Link></li>
            <li><Link href={localePath(locale, "/contact")} className="footer-link">{isZh ? "联系销售" : "Contact Sales"}</Link></li>
            <li><Link href={localePath(locale, "/faq")} className="footer-link">{isZh ? NAV_ZH.faq : "FAQ"}</Link></li>
            {FOOTER_NAV.filter((i) => !["/about", "/contact", "/faq"].includes(i.href)).map((item) => (
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
