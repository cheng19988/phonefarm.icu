import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name} website, product purchases, and USDT payment policies.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <div className="section section-light">
        <div className="container-hero max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6">Terms of Use</h1>
          <p className="text-[var(--text-subtle)] mb-10">Last updated: June 2026</p>

          <div className="prose-content space-y-8">
            <section>
              <h2>Products &amp; Orders</h2>
              <p>
                Products listed on {SITE.name} are real-device phone farm hardware assembled in Guangzhou, China. Prices are reference USD amounts. Orders are subject to stock availability and sales confirmation for custom configurations.
              </p>
            </section>
            <section>
              <h2>Accounts</h2>
              <p>
                You may register an account to place orders and view order history. You are responsible for keeping login credentials secure.
              </p>
            </section>
            <section>
              <h2>Payment</h2>
              <p>
                USDT on Tron TRC20 network is available after order confirmation. Minimum payment and payment window are shown on your order page. Sales team confirms payment and updates order status. Wire transfer (T/T) may be available for enterprise bulk orders.
              </p>
            </section>
            <section>
              <h2>Shipping</h2>
              <p>
                International shipping is available from Guangzhou. Delivery times vary by method. Import duties and taxes are typically the buyer&apos;s responsibility unless agreed otherwise in a bulk quote.
              </p>
            </section>
            <section>
              <h2>Inquiries &amp; Quotes</h2>
              <p>
                Contact form submissions are quotation requests, not binding orders. Written quotes are issued before production for bulk and custom projects.
              </p>
            </section>
            <section>
              <h2>Warranty</h2>
              <p>
                Hardware carries warranty support on chassis, fans, and PSU modules as described per product. Misuse, unauthorized modifications, and buyer-supplied devices are excluded.
              </p>
            </section>
            <section>
              <h2>Contact</h2>
              <p>
                Questions about these terms: <a href={`mailto:${CONTACT.email}`} className="text-[var(--brand)] hover:underline">{CONTACT.email}</a>.
                See our <Link href="/privacy" className="text-[var(--brand)] hover:underline">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
