import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, HARDWARE_PACKAGES } from "@/data/packages";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { SITE } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return HARDWARE_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: `${pkg.name} — Hardware Package`,
    description: pkg.description,
    path: `/packages/${slug}`,
    image: pkg.image,
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  return (
    <>
      <JsonLd
        data={faqJsonLd(pkg.faq.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <div className="section">
        <div className="container-wide max-w-4xl">
          <Link href="/packages" className="text-sm text-cyan-400 hover:text-white mb-4 inline-block">
            ← All Packages
          </Link>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image src={pkg.image} alt={pkg.name} fill className="object-cover" priority />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{pkg.name}</h1>
          <p className="text-cyan-400 text-lg mb-4">From ${pkg.fromPriceUsd} USD</p>
          <p className="text-slate-300 leading-relaxed mb-8">{pkg.description}</p>

          <h2 className="text-xl font-bold text-white mb-3">Included in Package</h2>
          <ul className="space-y-2 text-slate-400 mb-8">
            {pkg.includes.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-white mb-3">Why {SITE.name}</h2>
          <ul className="space-y-2 text-slate-400 mb-8">
            {pkg.highlights.map((h) => (
              <li key={h}>✓ {h}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-white mb-3">Catalog SKUs in This Bundle</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {pkg.productSlugs.map((s) => (
              <Link key={s} href={`/products/${s}`} className="px-3 py-1 rounded-full border border-slate-700 text-sm text-slate-300 hover:border-cyan-600">
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>

          {pkg.faq.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-white mb-4">FAQ</h2>
              <div className="space-y-4 mb-8">
                {pkg.faq.map((item) => (
                  <div key={item.q} className="card p-4">
                    <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                    <p className="text-slate-400 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/register" className="btn-primary">Register to Order</Link>
            <Link href="/contact" className="btn-secondary">Contact Sales</Link>
            <Link href="/pricing" className="btn-outline">See Pricing</Link>
          </div>

          <ContactCTA title="Discuss This Package with Sales" />
        </div>
      </div>
    </>
  );
}
