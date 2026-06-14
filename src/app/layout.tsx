import type { Metadata } from "next";
import { headers } from "next/headers";
import { Header, Footer } from "@/components/layout";
import { FloatingContact } from "@/components/floating-contact";
import { JsonLd } from "@/components/shared";
import { organizationJsonLd, websiteJsonLd, jsonLdGraph } from "@/lib/seo";
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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE.url,
    languages: {
      "en-US": SITE.url,
      "zh-CN": `${SITE.url}/zh`,
    },
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM Content Index" },
        { url: "/llms-full.txt", title: "LLM Full Content Index" },
      ],
    },
  },
  other: {
    "ai-content-index": `${SITE.url}/llms.txt`,
    "ai-full-index": `${SITE.url}/llms-full.txt`,
    "ai-fact-sheet": `${SITE.url}/for-ai`,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const localeHeader = (await headers()).get("x-locale");
  const htmlLang = localeHeader === "zh" ? "zh-CN" : "en-US";

  return (
    <html lang={htmlLang} className="h-full">
      <head>
        <link rel="alternate" type="text/plain" href={`${SITE.url}/llms.txt`} title="LLM Content Index" />
        <link rel="alternate" type="text/plain" href={`${SITE.url}/llms-full.txt`} title="LLM Full Content Index" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd data={jsonLdGraph(organizationJsonLd(), websiteJsonLd())} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
