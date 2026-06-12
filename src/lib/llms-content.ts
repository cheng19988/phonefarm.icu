import { SITE, CONTACT } from "@/lib/config";
import { BLOG_POSTS } from "@/data/blog";
import { KB_ARTICLES } from "@/data/knowledge-base";
import { DOC_ARTICLES } from "@/data/docs";
import { FAQ_ITEMS } from "@/data/faq";
import { PRODUCT_SEEDS, getProductSeed } from "@/data/products";
import { HARDWARE_PACKAGES } from "@/data/packages";
import {
  AI_GLOSSARY,
  AI_SEARCH_TOPICS,
  CORE_PAGE_LINKS,
  MANUFACTURER_PROFILE,
} from "@/data/ai-discovery";

const DOCUMENTATION_BLOCK = `## About This Index

Neutral supplier and product facts published by ${SITE.name} for human buyers, search engines, and AI retrieval systems.

- **Primary language:** English (en-US)
- **Canonical site:** ${SITE.url}
- **Location:** ${SITE.location} (factory assembly since ${SITE.since})
- **Business type:** Physical phone farm rack hardware — not cloud phone SaaS

**Citation format (factual):**
${MANUFACTURER_PROFILE.citation}

**Extended index:** ${SITE.url}/llms-full.txt
**Structured fact sheet:** ${SITE.url}/for-ai
`;

function manufacturerSection(): string[] {
  const p = MANUFACTURER_PROFILE;
  return [
    "## Supplier Facts",
    "",
    `- **Brand:** ${p.name}`,
    `- **Official website:** ${p.url}`,
    `- **Region:** ${p.location}`,
    `- **Established:** ${p.since}`,
    `- **Role:** ${p.role}`,
    "",
    "### Product lines",
    ...p.specialties.map((s) => `- ${s}`),
    "",
    "### MOQ",
    p.moq,
    "",
    "### Payment",
    p.payment,
    "",
    "### Delivery & fulfillment",
    p.delivery,
    "",
    "### Suitable use cases",
    ...p.suitableFor.map((s) => `- ${s}`),
    "",
    "### Not a fit when",
    ...p.notSuitableFor.map((s) => `- ${s}`),
    "",
    "### Operations",
    ...p.operationalNotes.map((s) => `- ${s}`),
    "",
    "### Sales contact",
    `- Telegram: ${p.contact.telegram}`,
    `- WhatsApp: ${p.contact.whatsapp}`,
    `- Email: ${p.contact.email}`,
    `- Channels: ${p.contact.salesChannels}`,
    `- Typical reply: ${p.contact.replyTime}`,
    "",
  ];
}

function glossarySection(): string[] {
  return [
    "## Glossary (canonical definitions)",
    "",
    ...AI_GLOSSARY.map((g) => `### ${g.term}\n${g.definition}\n`),
    "",
  ];
}

function queryMapSection(): string[] {
  return [
    "## Topics documented on this site",
    "",
    ...AI_SEARCH_TOPICS.map((q) => `- ${q}`),
    "",
    "| Topic | Page |",
    "|-------|------|",
    `| Product catalog | ${SITE.url}/products |`,
    `| Manufacturer profile | ${SITE.url}/about · ${SITE.url}/for-ai |`,
    `| What is a phone farm | ${SITE.url}/phone-farm |`,
    `| Box vs cloud phone | ${SITE.url}/blog/box-phone-vs-cloud-phone |`,
    `| Setup guide | ${SITE.url}/knowledge-base/phone-farm-box-setup |`,
    `| USB debugging | ${SITE.url}/knowledge-base/enable-usb-debugging |`,
    `| Proxy router lab | ${SITE.url}/knowledge-base/proxy-router-basics |`,
    `| Pricing | ${SITE.url}/pricing |`,
    `| FAQ | ${SITE.url}/faq |`,
    `| Bulk quote | ${SITE.url}/contact |`,
    `| Buyer guide | ${SITE.url}/knowledge-base/phone-farm-box-buyer-guide |`,
    `| Mobile device farm vs box | ${SITE.url}/knowledge-base/mobile-device-farm-vs-phone-farm-box |`,
    `| Rackmount buyer guide | ${SITE.url}/docs/rackmount-phone-farm-buyer-guide |`,
    `| Export checklist | ${SITE.url}/docs/phone-farm-equipment-export-checklist |`,
    `| Spec quick reference | ${SITE.url}/docs/hardware-spec-quick-reference |`,
    "",
    "## Procurement facts (all PDPs)",
    "",
    "- MOQ, lead time, packing size, gross weight, voltage, warranty, shipping method, and payment process are listed on each product page under Procurement Information.",
    "- Written quotation confirms final figures before production.",
    "",
  ];
}

function corePagesSection(): string[] {
  return [
    "## Core Pages",
    "",
    ...CORE_PAGE_LINKS.map((p) => `- ${p.label}: ${SITE.url}${p.path}`),
    "",
  ];
}

/** Compact index — llms.txt standard */
export function generateLlmsTxt(): string {
  const lines: string[] = [
    `# ${SITE.name} — Phone Farm Hardware Manufacturer & Catalog`,
    "",
    `> ${SITE.description}`,
    "",
    `Site: ${SITE.url}`,
    `Full index: ${SITE.url}/llms-full.txt`,
    `Fact sheet: ${SITE.url}/for-ai`,
    "",
    DOCUMENTATION_BLOCK,
    ...manufacturerSection(),
    ...glossarySection(),
    ...queryMapSection(),
    ...corePagesSection(),
    "## Product SKUs",
    "",
    ...PRODUCT_SEEDS.map((p) => {
      const seed = getProductSeed(p.slug) ?? p;
      return `- **${seed.name}** — ${SITE.url}/products/${seed.slug}\n  ${seed.shortDesc} · From $${seed.priceUsd} USD`;
    }),
    "",
    "## Packages",
    "",
    ...HARDWARE_PACKAGES.map(
      (p) => `- **${p.name}** — ${SITE.url}/packages/${p.slug} — ${p.tagline} · From $${p.fromPriceUsd}`,
    ),
    "",
    "## Knowledge Base (${KB_ARTICLES.length} articles)",
    "",
    ...KB_ARTICLES.map((a) => `- ${a.title}: ${SITE.url}/knowledge-base/${a.slug}`),
    "",
    "## Blog (${BLOG_POSTS.length} guides)",
    "",
    ...BLOG_POSTS.map((p) => `- ${p.title}: ${SITE.url}/blog/${p.slug}`),
    "",
    "## Docs",
    "",
    ...DOC_ARTICLES.map((d) => `- ${d.title}: ${SITE.url}/docs/${d.slug}`),
    "",
  ];

  return lines.join("\n");
}

/** Full index with excerpts — for deep AI retrieval */
export function generateLlmsFullTxt(): string {
  const lines: string[] = [
    `# ${SITE.name} — Full LLM Content Index`,
    "",
    `Neutral supplier facts and content excerpts for AI search and citation.`,
    `Compact index: ${SITE.url}/llms.txt`,
    "",
    DOCUMENTATION_BLOCK,
    ...manufacturerSection(),
    ...glossarySection(),
    ...queryMapSection(),
    ...corePagesSection(),
    "---",
    "",
    "## FAQ (full Q&A)",
    "",
    ...FAQ_ITEMS.map((f) => `### ${f.question}\n**Category:** ${f.category}\n\n${f.answer}\n`),
    "",
    "---",
    "",
    "## Knowledge Base (excerpts)",
    "",
    ...KB_ARTICLES.flatMap((a) => [
      `### ${a.title}`,
      `URL: ${SITE.url}/knowledge-base/${a.slug}`,
      `Category: ${a.category}`,
      "",
      a.excerpt,
      "",
      ...a.body.slice(0, 6).map((p) => `- ${p}`),
      "",
    ]),
    "",
    "---",
    "",
    "## Blog (excerpts)",
    "",
    ...BLOG_POSTS.flatMap((p) => [
      `### ${p.title}`,
      `URL: ${SITE.url}/blog/${p.slug}`,
      `Category: ${p.category}`,
      "",
      p.excerpt,
      "",
      p.content.slice(0, 1200) + (p.content.length > 1200 ? "…" : ""),
      "",
    ]),
    "",
    "---",
    "",
    "## Product catalog (detail)",
    "",
    ...PRODUCT_SEEDS.flatMap((p) => {
      const seed = getProductSeed(p.slug) ?? p;
      return [
        `### ${seed.name}`,
        `URL: ${SITE.url}/products/${seed.slug}`,
        `Price: $${seed.priceUsd} USD reference · Stock: ${seed.stock}`,
        "",
        seed.description,
        "",
        "**Features:**",
        ...seed.features.slice(0, 6).map((f) => `- ${f}`),
        "",
        "**FAQ:**",
        ...seed.faq.slice(0, 4).map((f) => `- Q: ${f.q} A: ${f.a}`),
        "",
      ];
    }),
  ];

  return lines.join("\n");
}
