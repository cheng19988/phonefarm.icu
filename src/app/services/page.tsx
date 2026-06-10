import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { ContentHero } from "@/components/content/content-hero";
import { SERVICES } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hardware Services & Order Support",
  description:
    "Phone farm hardware configuration, rack layout planning, power and cooling advice, packing and export support, and bulk order coordination from Guangzhou.",
  path: "/services",
});

const SERVICE_FOCUS = [
  "Hardware configuration support - slot count, PSU, and hub sizing",
  "Rack layout planning for QA labs and device management teams",
  "Power and cooling advice for dense deployments",
  "Packing and export support for international freight",
  "Remote setup guidance for ADB and workstation layout",
  "Bulk order coordination and custom cabinet discussion",
];

export default function ServicesPage() {
  return (
    <>
      <ContentHero
        eyebrow="Order Support"
        title="Hardware Services"
        subtitle="Configuration, layout, packing, and bulk coordination - quoted per project alongside catalog hardware orders. Not software subscriptions or automation services."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn-accent px-7 py-3">Browse Hardware</Link>
          <Link href="/contact" className="btn-outline px-7 py-3">Request Service Quote</Link>
        </div>
      </ContentHero>

      <div className="section section-light pt-0">
        <div className="container-hero">
          <section className="mb-14 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 max-w-3xl">
            <h2 className="font-bold text-[var(--text)] mb-4">What We Support</h2>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              {SERVICE_FOCUS.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-[var(--brand)] shrink-0">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((svc) => (
              <article key={svc.slug} className="card card-hover overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-[var(--text)] mb-2">{svc.title}</h2>
                  <p className="text-[var(--text-muted)] text-sm mb-4 flex-1">{svc.description}</p>
                  <Link href={`/contact?service=${svc.slug}`} className="text-sm font-semibold text-[var(--brand)] hover:underline">
                    Request quote
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <ContactCTA title="Need Hardware + Setup Support?" />
          </div>
        </div>
      </div>
    </>
  );
}
