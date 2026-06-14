import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Canonical production host — apex and alternates 301 here. */
export const CANONICAL_HOST = "www.phonefarm.icu";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0].toLowerCase();
  const proto = request.headers.get("x-forwarded-proto");

  const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");

  const blogRedirects: Record<string, string> = {
    "/blog/tiktok-shop-us-network-hardware": "/blog/multi-region-mobile-commerce-network-hardware",
    "/blog/phone-farming-getting-started": "/blog/phone-farm-hardware-buyer-roadmap",
    "/blog/phone-farm-mmo-hardware-overview": "/blog/high-density-multi-node-device-lab",
    "/blog/instagram-phone-farm-hardware": "/blog/multi-device-content-preview-labs",
  };
  const blogTarget = blogRedirects[request.nextUrl.pathname];
  if (blogTarget) {
    const url = request.nextUrl.clone();
    url.pathname = blogTarget;
    return NextResponse.redirect(url, 301);
  }

  if (request.nextUrl.pathname === "/ai") {
    const url = request.nextUrl.clone();
    url.pathname = "/for-ai";
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

  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  response.headers.set("x-locale", pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en");
  return response;
}

export const config = {
  matcher: [
    "/llms.txt",
    "/llms-full.txt",
    "/sitemap.xml",
    "/robots.txt",
    "/ai",
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|.*\\.(?:png|jpg|jpeg|webp|svg|ico)$).*)",
  ],
};
