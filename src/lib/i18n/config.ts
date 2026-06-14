import { SITE } from "@/lib/config";

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Paths with a dedicated Chinese page (hreflang pair). */
export const LOCALIZED_PATHS = [
  "/",
  "/phone-farm",
  "/products",
  "/faq",
  "/contact",
  "/for-ai",
  "/about",
  "/packages",
  "/pricing",
] as const;

export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  return normalized === "/" ? "/zh" : `/zh${normalized}`;
}

export function stripLocalePrefix(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    const base = pathname === "/zh" ? "/" : pathname.slice(3) || "/";
    return { locale: "zh", path: base };
  }
  return { locale: "en", path: pathname || "/" };
}

export function hasLocalizedPair(path: string): boolean {
  const base = stripLocalePrefix(path).path;
  if ((LOCALIZED_PATHS as readonly string[]).includes(base)) return true;
  if (base.startsWith("/products/")) return true;
  return false;
}

export function switchLocaleHref(currentPathname: string, target: Locale): string {
  const { path } = stripLocalePrefix(currentPathname);
  if (target === "zh" && !hasLocalizedPair(path)) {
    return "/zh";
  }
  return localePath(target, path);
}

export function alternateLanguageUrls(path: string): Record<string, string> {
  const base = stripLocalePrefix(path).path;
  return {
    "en-US": `${SITE.url}${localePath("en", base)}`,
    "zh-CN": `${SITE.url}${localePath("zh", base)}`,
  };
}

export async function getRequestLocale(): Promise<Locale> {
  const { headers } = await import("next/headers");
  const h = await headers();
  return h.get("x-locale") === "zh" ? "zh" : "en";
}
