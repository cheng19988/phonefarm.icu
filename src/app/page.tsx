import { countCatalogProducts, listCatalogProducts } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { HomeLeadForm } from "@/components/home-lead-form";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { BLOG_POSTS } from "@/data/blog";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { KB_ARTICLES } from "@/data/knowledge-base";
import { IMAGES } from "@/lib/images";
import { SITE, PRODUCT_CATEGORIES } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: SITE.headline,
  description: SITE.description,
  path: "/",
});

const MATRIX = [
  { label: "Phone Farm Box", href: "/products/phone-farm-box", image: IMAGES.phoneFarmBox.card },
  { label: "Motherboard Box", href: "/products/motherboard-box", image: IMAGES.motherboardBox.card },
  { label: "Android Farm", href: "/products/android-phone-farm", image: IMAGES.androidFarm.card },
  { label: "iPhone Farm", href: "/products/iphone-phone-farm", image: IMAGES.iphoneFarm.card },
  { label: "USB Hub", href: "/products/usb-hub", image: IMAGES.usbHub.card },
  { label: "Power Supply", href: "/products/power-supply-solution", image: IMAGES.power.card },
  { label: "Cooling", href: "/products/cooling-solution", image: IMAGES.cooling.card },
  { label: "Network", href: "/products/network-equipment", image: IMAGES.network.card },
  { label: "Custom Cabinet", href: "/products/custom-cabinet", image: IMAGES.customCabinet.card },
  { label: "Remote Setup", href: "/products/remote-control-setup", image: IMAGES.remoteControl.card },
];

export default async function HomePage() {
  const [products, totalCount] = await Promise.all([
    listCatalogProducts({ orderBy: "priceUsd", sort: "asc", take: 12 }),
    countCatalogProducts(),
  ]);
  const previewFaq = FAQ_ITEMS.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image src={IMAGES.homeHero} alt="Phone farm hardware catalog" fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70" />
        <div className="container-wide relative py-20">
          <p className="text-cyan-400 font-medium mb-3">{SITE.location} | Since {SITE.since}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-6">
            {SITE.headline}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">{SITE.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">Browse Catalog</Link>
            <Link href="/pricing" className="btn-secondary text-lg px-8 py-3">See Pricing</Link>
            <Link href="/register" className="btn-outline text-lg px-8 py-3">Register</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Hardware Product Matrix</h2>
          <p className="section-subtitle">Factory-direct categories for real-device phone farms.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {MATRIX.map((item) => (
              <Link key={item.href} href={item.href} className="card overflow-hidden group hover:border-cyan-700 transition-colors">
                <div className="relative aspect-square">
                  <Image src={item.image} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="p-3 text-sm font-medium text-white text-center">{item.label}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-400 hover:border-cyan-600"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Deployment Packages</h2>
          <p className="section-subtitle">Hardware bundles for real-device farms.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE_PACKAGES.map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="card p-5 hover:border-cyan-800 transition-colors">
                <h3 className="font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{pkg.tagline}</p>
                <p className="text-cyan-400 font-semibold">From ${pkg.fromPriceUsd}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="btn-outline">All Packages</Link>
          </div>
        </div>
      </section>

      <section className="section" id="catalog">
        <div className="container-wide">
          <h2 className="section-title">Shop Catalog</h2>
          <p className="section-subtitle">{totalCount} SKUs with price, stock, Buy Now (USDT), Get Quote.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} slug={p.slug} name={p.name} shortDesc={p.shortDesc} priceUsd={p.priceUsd} stock={p.stock} imageCard={p.imageCard} category={p.category} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-primary">Full Catalog</Link>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="section-title">Knowledge Base</h2>
            <ul className="space-y-2 mt-4">
              {KB_ARTICLES.slice(0, 4).map((a) => (
                <li key={a.slug}>
                  <Link href={`/knowledge-base/${a.slug}`} className="text-cyan-400 hover:text-white text-sm">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/knowledge-base" className="btn-outline mt-4 inline-block">Knowledge Base</Link>
          </div>
          <div>
            <h2 className="section-title">Support and Docs</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/support" className="btn-primary">Support</Link>
              <Link href="/docs" className="btn-secondary">Docs</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Factory and Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { src: IMAGES.company.office, label: "Office" },
              { src: IMAGES.company.frontdesk, label: "Front Desk" },
              { src: IMAGES.company.meeting, label: "Meeting Room" },
              { src: IMAGES.company.workshop, label: "Workshop" },
              { src: IMAGES.company.warehouse, label: "Warehouse" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={img.src} alt={img.label} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                  <span className="text-white text-sm font-medium">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeLeadForm />

      <section className="section">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title text-center">FAQ</h2>
          <FAQAccordion items={previewFaq} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn-outline">All FAQ</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Ready to Build Your Phone Farm?" />
        </div>
      </section>
    </>
  );
}
