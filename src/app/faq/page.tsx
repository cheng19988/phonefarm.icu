import Link from "next/link";
import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { ContentHero } from "@/components/content/content-hero";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ - Hardware, Shipping, Payment & Support",
  description:
    "Answers about phone farm boxes, motherboard boxes, ordering, USDT payment, shipping, warranty, and bulk quotes.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <ContentHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Hardware specs, ordering, payment, shipping, and after-sales - answers from our Guangzhou sales and engineering team."
      />
      <div className="section section-light pt-0">
        <div className="container-hero max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { label: "Shop", href: "/products" },
              { label: "Pricing", href: "/pricing" },
              { label: "Packages", href: "/packages" },
              { label: "Docs", href: "/docs" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--brand)] hover:text-[var(--brand)] bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {FAQ_CATEGORIES.map((cat) => {
            const items = FAQ_ITEMS.filter((i) => i.category === cat);
            if (!items.length) return null;
            return (
              <section key={cat} className="mb-12">
                <h2 className="text-xl font-bold text-[var(--text)] mb-5">{cat}</h2>
                <FAQAccordion items={items} />
              </section>
            );
          })}

          <ContactCTA title="Still Have Questions?" />
        </div>
      </div>
    </>
  );
}
