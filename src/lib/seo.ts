import type { Metadata } from "next";
import { SITE } from "./config";

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
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-US",
    logo: `${SITE.url}/images/card_800x800/phonefarm.icu-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "qiuxui646@gmail.com",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Chinese"],
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    url: `${SITE.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUsd,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE.name },
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
