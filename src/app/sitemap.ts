import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { BLOG_POSTS } from "@/data/blog";
import { PRODUCT_SEEDS } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { KB_ARTICLES } from "@/data/knowledge-base";
import { DOC_ARTICLES } from "@/data/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/products",
    "/phone-farm",
    "/packages",
    "/pricing",
    "/knowledge-base",
    "/support",
    "/docs",
    "/services",
    "/about",
    "/faq",
    "/contact",
    "/for-ai",
    "/blog",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.85,
  }));

  return [
    ...staticPages,
    ...PRODUCT_SEEDS.map((p) => ({
      url: `${SITE.url}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...HARDWARE_PACKAGES.map((p) => ({
      url: `${SITE.url}/packages/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...KB_ARTICLES.map((a) => ({
      url: `${SITE.url}/knowledge-base/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...DOC_ARTICLES.map((d) => ({
      url: `${SITE.url}/docs/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
