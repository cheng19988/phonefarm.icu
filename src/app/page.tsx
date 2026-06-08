import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { HomeLeadForm } from "@/components/home-lead-form";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { HARDWARE_PACKAGES } from "@/data/packages";
import { KB_ARTICLES } from "@/data/knowledge-base";
import { IMAGES } from "@/lib/images";
import { SITE, PRODUCT_CATEGORIES } from "@/lib/config";
import { listCatalogProducts, countCatalogProducts } from "@/lib/catalog";
import { PRICING_TIERS } from "@/data/pricing";

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

const TRUST_STATS = [
  { value: "Since 2017", label: "Guangzhou factory" },
  { value: "13+ SKUs", label: "Hardware catalog" },
  { value: "USDT", label: "Payment option" },
  { value: "Global", label: "Shipping available" },
];

const WHY_CHOOSE = [
  { title: "Factory-Direct Hardware", desc: "Real-device racks and boxes assembled in Guangzhou — not cloud phone rental." },
  { title: "Published Reference Prices", desc: "USD catalog pricing with Buy Now path — bulk quotes for enterprise scale." },
  { title: "Full Deployment Stack", desc: "Racks, motherboard boxes, USB hubs, power, cooling, and network modules." },
  { title: "USDT + Quote Flexibility", desc: "Checkout with USDT after confirmation or contact sales for custom projects." },
];

const USE_CASES = [
  { title: "Mobile QA Labs", desc: "Real Android and iPhone arrays for build validation and regression testing." },
  { title: "Device Management Ops", desc: "Centralized hardware for enterprise mobile fleet staging and provisioning." },
  { title: "Agency Device Banks", desc: "Dedicated rack rows for content preview and multi-account workflows." },
  { title: "SIM & Network Labs", desc: "Isolated clusters with network modules for carrier and profile testing." },
];

export default async function HomePage() {
  const [products, totalCount] = await Promise.all([
    listCatalogProducts({ orderBy: "priceUsd", take: 12 }),
    countCatalogProducts(),
  ]);
  const previewFaq = FAQ_ITEMS.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      {/* Full-screen hero */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center border-b border-slate-800 overflow-hidden">
        <Image
          src={IMAGES.homeHero}
          alt="Phone farm rack hardware catalog"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/40" />
        <div className="container-hero relative w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-cyan-400 font-medium mb-4 text-sm tracking-wide">
                {SITE.location} · Real-Device Hardware Since {SITE.since}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                {SITE.headline}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                {SITE.intro}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/register" className="btn-primary text-base px-8 py-3.5">
                  Sign Up — Start Ordering
                </Link>
                <Link href="/products" className="btn-secondary text-base px-8 py-3.5">
                  Browse Products
                </Link>
                <Link href="/contact" className="btn-outline text-base px-8 py-3.5">
                  Contact Sales
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TRUST_STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-white font-semibold text-sm">{s.value}</p>
                    <p className="text-slate-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block min-h-[420px] xl:min-h-[520px]">
              <div className="relative h-full min-h-[420px] xl:min-h-[520px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-cyan-950/30">
                <Image
                  src={IMAGES.phoneFarmBox.hero}
                  alt="Phone farm box hardware — main product"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-xl overflow-hidden border border-slate-700 shadow-xl hidden xl:block">
                <Image src={IMAGES.motherboardBox.card} alt="Motherboard box" fill className="object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-36 h-36 rounded-xl overflow-hidden border border-slate-700 shadow-xl hidden xl:block">
                <Image src={IMAGES.usbHub.card} alt="USB hub module" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product matrix */}
      <section className="section">
        <div className="container-hero">
          <h2 className="section-title">Hardware Product Matrix</h2>
          <p className="section-subtitle">Factory-direct categories for real-device phone farms — aligned with industry-standard rack and box deployments.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {MATRIX.map((item) => (
              <Link key={item.href} href={item.href} className="card overflow-hidden group hover:border-cyan-700/60 transition-colors">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="20vw" />
                </div>
                <p className="p-3 md:p-4 text-sm font-medium text-white text-center">{item.label}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-700 text-slate-400 hover:border-cyan-600 hover:text-white"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="section bg-slate-900/40 border-y border-slate-800">
        <div className="container-hero">
          <h2 className="section-title">Pricing</h2>
          <p className="section-subtitle">Reference tiers from sample order to enterprise deployment — buy online or request bulk quote.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.id} className="card p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-cyan-400 mb-3">{tier.priceLabel}</p>
                <p className="text-sm text-slate-400 mb-4 flex-1">{tier.description}</p>
                <ul className="space-y-2 mb-6 text-sm text-slate-400">
                  {tier.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
                <Link href={tier.href} className="btn-primary text-center">{tier.cta}</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="btn-outline">Full Price Table</Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container-hero">
          <h2 className="section-title">Deployment Packages</h2>
          <p className="section-subtitle">Pre-configured hardware bundles — buy online or request a bulk quote.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE_PACKAGES.map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="card p-5 hover:border-cyan-800 transition-colors flex flex-col">
                <h3 className="font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1">{pkg.tagline}</p>
                <p className="text-cyan-400 font-semibold">From ${pkg.fromPriceUsd}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="btn-outline">Compare All Packages</Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-slate-900/40 border-y border-slate-800">
        <div className="container-hero">
          <h2 className="section-title">Why PhoneFarm ICU</h2>
          <p className="section-subtitle">Guangzhou factory-direct hardware for real-device phone farms — shop, deploy, and scale.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section">
        <div className="container-hero">
          <h2 className="section-title">Use Cases</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-slate-800 hover:border-cyan-900 transition-colors">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop catalog */}
      <section className="section bg-slate-900/30" id="catalog">
        <div className="container-hero">
          <h2 className="section-title">Shop Catalog</h2>
          <p className="section-subtitle">
            {totalCount} SKUs with price, stock, Buy Now (USDT), and bulk quote options.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                shortDesc={p.shortDesc}
                priceUsd={p.priceUsd}
                stock={p.stock}
                imageCard={p.imageCard}
                category={p.category}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-primary px-8 py-3">Full Catalog</Link>
          </div>
        </div>
      </section>

      {/* KB + Support */}
      <section className="section bg-slate-900/40">
        <div className="container-hero grid md:grid-cols-2 gap-10">
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
            <h2 className="section-title">Support & Docs</h2>
            <p className="text-slate-400 text-sm mb-4">Deployment guides, rack layout specs, and order support.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/support" className="btn-primary">Support</Link>
              <Link href="/docs" className="btn-secondary">Docs</Link>
              <Link href="/pricing" className="btn-outline">Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Factory gallery */}
      <section className="section">
        <div className="container-hero">
          <h2 className="section-title">Guangzhou Factory & Facilities</h2>
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
        <div className="container-hero max-w-3xl">
          <h2 className="section-title text-center">FAQ</h2>
          <FAQAccordion items={previewFaq} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn-outline">All FAQ</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-hero">
          <ContactCTA title="Ready to Build Your Phone Farm?" />
        </div>
      </section>
    </>
  );
}
