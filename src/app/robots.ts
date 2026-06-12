import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/** AI crawlers explicitly allowed — do not block GPT, Google AI, Claude, Perplexity, etc. */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "DeepSeek",
  "DeepSeekBot",
] as const;

const DISALLOW = [
  "/admin",
  "/account/",
  "/api/",
  "/login",
  "/register",
  "/orders/",
  "/inquiry-received",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: ["/", "/llms.txt", "/llms-full.txt", "/for-ai", "/knowledge-base/", "/blog/", "/products/", "/faq"],
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
