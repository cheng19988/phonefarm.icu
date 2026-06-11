import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}. How we collect, use, and protect your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: June 2026"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <div className="section section-light pt-0">
        <div className="container-hero max-w-3xl">

          <div className="prose-content space-y-8">
            <section>
              <h2>Information We Collect</h2>
              <p>
                When you create an account, place an order, or submit an inquiry, we collect your name, email, phone number, company (optional), country, and message details. For orders we store product selections and payment reference information. We do not store credit card data.
              </p>
            </section>
            <section>
              <h2>How We Use Information</h2>
              <p>
                We use your information to process hardware orders, confirm USDT payments with our sales team, respond to bulk quotes, and provide shipping and warranty support. We do not sell your personal data to third parties.
              </p>
            </section>
            <section>
              <h2>Orders &amp; Payment</h2>
              <p>
                Order records and USDT transaction references are stored securely. Payment status is updated by our sales team after confirmation.
              </p>
            </section>
            <section>
              <h2>Data Security</h2>
              <p>
                We use industry-standard measures to protect account and order data. Access to production systems is limited to authorized staff.
              </p>
            </section>
            <section>
              <h2>Contact</h2>
              <p>
                Privacy inquiries: <a href={`mailto:${CONTACT.email}`} className="text-[var(--brand)] hover:underline">{CONTACT.email}</a>.
                See also our <Link href="/terms" className="text-[var(--brand)] hover:underline">Terms of Use</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
