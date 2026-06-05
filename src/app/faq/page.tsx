import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ — Hardware, Shipping, Payment & Support",
  description:
    "Answers about phone farm boxes, motherboard boxes, real device vs cloud, customization, MOQ, samples, delivery, USDT payment, and contacting sales.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <div className="section">
        <div className="container-wide max-w-3xl">
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Hardware specs, ordering process, shipping, and after-sales — answers from our Guangzhou sales and engineering team.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { label: "Products", href: "/products" },
              { label: "Pricing", href: "/pricing" },
              { label: "Services", href: "/services" },
              { label: "Knowledge Base", href: "/knowledge-base" },
              { label: "Contact Sales", href: "/contact" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-400 hover:border-cyan-600 hover:text-cyan-400">
                {link.label}
              </a>
            ))}
          </div>
          <FAQAccordion items={FAQ_ITEMS} />
          <div className="mt-16">
            <ContactCTA title="Still Have Questions?" />
          </div>
        </div>
      </div>
    </>
  );
}
