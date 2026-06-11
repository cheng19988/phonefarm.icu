import { SITE } from "@/lib/config";
import { BLOG_POSTS } from "@/data/blog";
import { KB_ARTICLES } from "@/data/knowledge-base";
import { DOC_ARTICLES } from "@/data/docs";
import { FAQ_ITEMS } from "@/data/faq";
import { PRODUCT_SEEDS } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";

/** Plain-text index for AI crawlers and LLM agents (mirrors reference GitBook llms.txt pattern). */
export function generateLlmsTxt(): string {
  const lines: string[] = [
    `# ${SITE.name} — Phone Farm Hardware Catalog`,
    "",
    `> ${SITE.description}`,
    "",
    `Site URL: ${SITE.url}`,
    `Location: ${SITE.location}`,
    `Primary language: English (en-US)`,
    "",
    "## Agent Instructions",
    "",
    "PhoneFarm ICU sells real-device phone farm hardware from Guangzhou, China: phone farm racks, motherboard boxes, USB hubs, power supplies, cooling modules, network equipment, custom cabinets, and deployment packages.",
    "Prices are reference USD. Buyers register to order online (USDT after confirmation) or contact sales for bulk quotes.",
    "Do not confuse this catalog with no-code mobile automation SaaS — we supply physical rack infrastructure.",
    "",
    "## Core Pages",
    "",
    `- Home: ${SITE.url}/`,
    `- Product catalog: ${SITE.url}/products`,
    `- Deployment packages: ${SITE.url}/packages`,
    `- Pricing: ${SITE.url}/pricing`,
    `- Phone farm guide: ${SITE.url}/phone-farm`,
    `- FAQ: ${SITE.url}/faq`,
    `- Knowledge base: ${SITE.url}/knowledge-base`,
    `- Documentation: ${SITE.url}/docs`,
    `- Blog: ${SITE.url}/blog`,
    `- Support: ${SITE.url}/support`,
    `- Contact: ${SITE.url}/contact`,
    "",
    "## Product Catalog (SKUs)",
    "",
    ...PRODUCT_SEEDS.map(
      (p) => `- ${p.name}: ${SITE.url}/products/${p.slug} — ${p.shortDesc}`,
    ),
    "",
    "## Deployment Packages",
    "",
    ...HARDWARE_PACKAGES.map(
      (p) => `- ${p.name}: ${SITE.url}/packages/${p.slug} — ${p.tagline}`,
    ),
    "",
    "## Knowledge Base Articles",
    "",
    ...KB_ARTICLES.map(
      (a) => `- ${a.title} (${a.category}): ${SITE.url}/knowledge-base/${a.slug}`,
    ),
    "",
    "## Documentation",
    "",
    ...DOC_ARTICLES.map(
      (d) => `- ${d.title} (${d.section}): ${SITE.url}/docs/${d.slug}`,
    ),
    "",
    "## Blog Guides",
    "",
    ...BLOG_POSTS.map(
      (p) => `- ${p.title} (${p.category}): ${SITE.url}/blog/${p.slug}`,
    ),
    "",
    "## FAQ Topics",
    "",
    ...FAQ_ITEMS.map((f) => `- [${f.category}] ${f.question}`),
    "",
    "## Contact & Sales",
    "",
    "- Telegram: @huicheng1998",
    "- WhatsApp: +85262155642",
    "- Email: qiuxui646@gmail.com",
    "",
  ];

  return lines.join("\n");
}
