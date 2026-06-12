import type { Metadata } from "next";
import { SITE, CONTACT } from "./config";
import { AI_GLOSSARY, MANUFACTURER_PROFILE } from "@/data/ai-discovery";

type SEOInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex,
}: SEOInput): Metadata {
  const url = `${SITE.url}${path}`;
  const defaultOg = `${SITE.url}/images/hero_1600x900/phonefarm.icu-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-hero_1600x900.webp`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE.url}${image}`
    : defaultOg;
  const fullTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-US": url },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ["PhoneFarm ICU Phone Farm Hardware", "phonefarm.icu"],
    url: SITE.url,
    inLanguage: "en-US",
    foundingDate: String(SITE.since),
    logo: `${SITE.url}/images/card_800x800/phonefarm.icu-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp`,
    image: `${SITE.url}/images/hero_1600x900/phonefarm.icu-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-hero_1600x900.webp`,
    description: SITE.description,
    slogan: SITE.tagline,
    areaServed: "Worldwide",
    knowsAbout: AI_GLOSSARY.map((g) => g.term),
    makesOffer: MANUFACTURER_PROFILE.specialties.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: s },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: CONTACT.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Chinese"],
      },
      {
        "@type": "ContactPoint",
        telephone: CONTACT.whatsapp,
        contactType: "customer support",
        areaServed: "Worldwide",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-US",
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  category?: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: `${SITE.url}${article.path}`,
    inLanguage: "en-US",
    datePublished: article.datePublished ?? "2026-01-01",
    dateModified: article.datePublished ?? "2026-06-01",
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}${article.path}`,
    ...(article.category ? { articleSection: article.category } : {}),
  };
}

/** Combine multiple JSON-LD nodes for one script tag */
export function jsonLdGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((n) => {
      const { "@context": _c, ...rest } = n as Record<string, unknown> & { "@context"?: string };
      return rest;
    }),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  priceUsd: number;
  stock: number;
  image: string;
}) {
  const productUrl = `${SITE.url}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    url: productUrl,
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": `${SITE.url}/#organization` },
    category: "Phone Farm Hardware",
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "USD",
      price: product.priceUsd,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE.url}/#organization` },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  items?: { name: string; url: string }[];
}) {
  const pageUrl = `${SITE.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: pageUrl,
    isPartOf: { "@id": `${SITE.url}/#website` },
    ...(input.items?.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: input.items.length,
            itemListElement: input.items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              url: item.url,
            })),
          },
        }
      : {}),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Sales — Request a Phone Farm Hardware Quote",
    description:
      "Request bulk quotes, compatibility checks, shipping estimates, and order support for phone farm boxes and rack hardware from Guangzhou.",
    url: `${SITE.url}/contact`,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
  };
}
