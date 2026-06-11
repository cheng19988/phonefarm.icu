import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { SpecTable } from "@/components/products/spec-table";
import { ReferenceModelGallery } from "@/components/products/reference-model-gallery";
import { ContactCTA } from "@/components/shared";
import { getGuideReferenceModels } from "@/lib/product-model-catalog";
import { PHONE_FARM_SECTIONS } from "@/data/phone-farm-guide";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "What Is a Phone Farm? - Complete Hardware Guide",
  description:
    "Complete guide to phone farm racks and Box Phone Farm hardware: architecture, 20-slot chassis specs, reference models (S8, S10, A908N), power, cooling, USB/LAN, and how to order from PhoneFarm ICU Guangzhou.",
  path: "/phone-farm",
});

export default function PhoneFarmGuidePage() {
  const arch = PHONE_FARM_SECTIONS.find((s) => s.id === "architecture");
  const lines = PHONE_FARM_SECTIONS.find((s) => s.id === "product-lines");
  const models = PHONE_FARM_SECTIONS.find((s) => s.id === "reference-models");
  const specs = PHONE_FARM_SECTIONS.find((s) => s.id === "specs");
  const useCases = PHONE_FARM_SECTIONS.find((s) => s.id === "use-cases");
  const ordering = PHONE_FARM_SECTIONS.find((s) => s.id === "ordering");
  const intro = PHONE_FARM_SECTIONS.find((s) => s.id === "what-is");
  const guideModels = getGuideReferenceModels();

  return (
    <>
      <PageIntro
        eyebrow="Hardware Guide"
        title="What Is a Phone Farm?"
        subtitle={`Complete reference for Box Phone Farm racks, motherboard boxes, chassis specs, and deployment from ${SITE.name}, Guangzhou hardware manufacturer since ${SITE.since}.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Phone Farm Guide" },
        ]}
      >
        <Link href="/products" className="btn-accent">Shop Products</Link>
        <Link href="/products/phone-farm-box" className="btn-outline-dark">Phone Farm Box</Link>
      </PageIntro>

      <div className="section section-light pt-0">
        <div className="container-hero max-w-4xl space-y-16">
          {intro && (
            <section>
              {intro.paragraphs.map((p) => (
                <p key={p} className="text-[var(--text-muted)] leading-relaxed text-lg mb-4">
                  {p}
                </p>
              ))}
            </section>
          )}

          {arch && "bullets" in arch && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-5">{arch.title}</h2>
              {arch.paragraphs?.map((p) => (
                <p key={p} className="text-[var(--text-muted)] leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                {arch.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-[var(--text-muted)] p-4 rounded-xl border border-[var(--border)] bg-white"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {lines && "items" in lines && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-5">{lines.title}</h2>
              <div className="space-y-4">
                {lines.items.map((item) => (
                  <div
                    key={item.href}
                    className="p-5 rounded-2xl border border-[var(--border)] bg-white hover:border-[var(--brand)]/30 transition-colors"
                  >
                    <Link href={item.href} className="text-lg font-semibold text-[var(--text)] hover:text-[var(--brand)]">
                      {item.name} ?
                    </Link>
                    <p className="text-sm text-[var(--text-muted)] mt-2">{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {models && "table" in models && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-4">{models.title}</h2>
              {models.paragraphs?.map((p) => (
                <p key={p} className="text-[var(--text-muted)] mb-5">
                  {p}
                </p>
              ))}
              <SpecTable specs={models.table} title="Reference Platforms" />
            </section>
          )}

          {guideModels.length > 0 && (
            <ReferenceModelGallery
              title="Model Gallery from Factory Photos"
              intro="Reference device boards and rack configurations from our product photo library. RAM, storage, and port layout are confirmed in your quotation."
              models={guideModels}
            />
          )}

          {specs && "table" in specs && <SpecTable specs={specs.table} />}

          {useCases && "bullets" in useCases && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-5">{useCases.title}</h2>
              <ul className="space-y-3">
                {useCases.bullets.map((b) => (
                  <li key={b} className="text-[var(--text-muted)] border-l-4 border-[var(--brand)] pl-4">
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {ordering && (
            <section className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">{ordering.title}</h2>
              {ordering.paragraphs?.map((p) => (
                <p key={p} className="text-[var(--text-muted)] mb-4">
                  {p}
                </p>
              ))}
              {"links" in ordering && (
                <div className="flex flex-wrap gap-4">
                  {ordering.links.map((l) => (
                    <Link key={l.href} href={l.href} className="btn-outline-dark text-sm">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <div className="section section-light pt-0">
        <div className="container-hero">
          <ContactCTA title="Need a Phone Farm Quote?" />
        </div>
      </div>
    </>
  );
}
