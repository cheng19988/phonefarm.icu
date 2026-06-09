const ALLOWED_HOSTS = new Set([
  "phonefarm.icu",
  "www.phonefarm.icu",
  "localhost",
  "127.0.0.1",
]);

const DEFAULT_AUTH_REDIRECT = "/account/orders";

function isSafePath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//")) return false;
  if (path.includes("\\")) return false;
  if (path.startsWith("/api/")) return false;
  return true;
}

/**
 * Resolve a post-login/register destination from a redirect query value.
 * Accepts same-origin absolute URLs or relative paths; blocks open redirects.
 */
export function resolveSafeRedirect(
  raw: string | null | undefined,
  fallback = DEFAULT_AUTH_REDIRECT
): string {
  if (!raw?.trim()) return fallback;

  const value = raw.trim();

  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      if (!ALLOWED_HOSTS.has(host) && !host.endsWith(".localhost")) {
        return fallback;
      }
      const path = `${url.pathname}${url.search}${url.hash}`;
      return isSafePath(path) ? path : fallback;
    } catch {
      return fallback;
    }
  }

  if (value.startsWith("//")) return fallback;

  if (value.startsWith("/")) {
    return isSafePath(value) ? value : fallback;
  }

  return fallback;
}

/** Preserve redirect query when linking between auth pages. */
export function authHref(path: string, redirect: string | null | undefined): string {
  if (!redirect?.trim()) return path;
  return `${path}?redirect=${encodeURIComponent(redirect.trim())}`;
}
