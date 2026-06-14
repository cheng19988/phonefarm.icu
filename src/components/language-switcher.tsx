"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocaleHref } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const href = switchLocaleHref(pathname, isZh ? "en" : "zh");

  return (
    <Link
      href={href}
      hrefLang={isZh ? "en" : "zh-CN"}
      className="header-lang-btn"
      aria-label={isZh ? "Switch to English" : "切换到中文"}
    >
      {isZh ? "EN" : "中文"}
    </Link>
  );
}
