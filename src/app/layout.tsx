import type { Metadata } from "next";
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
    icon: "/icon.svg",
  },
  alternates: {
    canonical: SITE.url,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className="h-full">
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
