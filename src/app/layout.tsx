import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { MobileContactBar } from "@/components/shared";
import { JsonLd } from "@/components/shared";
import { organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased pb-14 md:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileContactBar />
      </body>
    </html>
  );
}
