import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCatalogProduct } from "@/lib/catalog";
import { PRODUCT_SEEDS } from "@/data/products";
import { buildMetadata, productJsonLd, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { PriceTag } from "@/components/ui/price-tag";
import { ReferencePriceNote } from "@/components/ui/reference-price-note";
import { zhProduct } from "@/lib/i18n/zh-products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCT_SEEDS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  const t = zhProduct(slug);
  if (!product || !t) return {};
  return buildMetadata({
    title: `购买 ${t.name} — 手机农场硬件制造商`,
    description: t.description,
    path: `/zh/products/${slug}`,
    locale: "zh",
    image: product.imageHero,
  });
}

export default async function ZhProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  const t = zhProduct(slug);
  if (!product || !t) notFound();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          productJsonLd({
            name: t.name,
            description: t.description,
            slug,
            priceUsd: product.priceUsd,
            stock: product.stock,
            image: product.imageHero,
          }),
          breadcrumbJsonLd([
            { name: "首页", path: "/zh" },
            { name: "产品目录", path: "/zh/products" },
            { name: t.name, path: `/zh/products/${slug}` },
          ]),
        )}
      />
      <section className="section section-light pt-8">
        <div className="container-hero">
          <nav className="text-sm text-[var(--text-muted)] mb-6">
            <Link href="/zh" className="hover:text-[var(--brand)]">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/zh/products" className="hover:text-[var(--brand)]">产品目录</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">{t.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-white">
              <Image src={product.imageHero} alt={t.name} fill className="object-contain p-6" sizes="50vw" priority />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)] mb-2">{t.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">{t.name}</h1>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">{t.shortDesc}</p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">{t.description}</p>
              <div className="mb-6">
                <PriceTag priceUsd={product.priceUsd} />
                <ReferencePriceNote />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/zh/contact?product=${slug}`} className="btn-accent">批量询价</Link>
                <Link href="/zh/products" className="btn-secondary">返回目录</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
