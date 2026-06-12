import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Canonical production host — apex and alternates 301 here. */
export const CANONICAL_HOST = "www.phonefarm.icu";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0].toLowerCase();
  const proto = request.headers.get("x-forwarded-proto");

  const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");

  if (request.nextUrl.pathname === "/blog/tiktok-shop-us-network-hardware") {
    const url = request.nextUrl.clone();
    url.pathname = "/blog/multi-region-mobile-commerce-network-hardware";
    return NextResponse.redirect(url, 301);
  }

  if (!isLocal && hostname !== CANONICAL_HOST) {
    const apexHosts = new Set(["phonefarm.icu"]);
    if (apexHosts.has(hostname) || hostname.endsWith(".vercel.app")) {
      const url = request.nextUrl.clone();
      url.protocol = "https:";
      url.host = CANONICAL_HOST;
      return NextResponse.redirect(url, 301);
    }
  }

  if (!isLocal && proto === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|.*\\.(?:png|jpg|jpeg|webp|svg|ico|txt|xml)$).*)"],
};
