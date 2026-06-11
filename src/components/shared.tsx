import Link from "next/link";
import { CONTACT, SITE } from "@/lib/config";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ContactBar({ compact = false, variant = "default" }: { compact?: boolean; variant?: "default" | "light" | "dark" }) {
  const linkClass =
    variant === "light"
      ? "text-blue-100 hover:text-white"
      : variant === "dark"
        ? "text-slate-400 hover:text-white"
        : "text-[var(--text-muted)] hover:text-[var(--brand)]";
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${compact ? "text-xs" : "text-sm"}`}>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} transition-colors`}>
        Telegram {CONTACT.telegram}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} transition-colors`}>
        WhatsApp {CONTACT.whatsapp}
      </a>
      <a href={`mailto:${CONTACT.email}`} className={`${linkClass} transition-colors`}>
        {CONTACT.email}
      </a>
    </div>
  );
}

export function ContactCTA({ title = "Ready to Build Your Phone Farm?" }: { title?: string }) {
  return (
    <section className="cta-band">
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text)] mb-4 tracking-tight">{title}</h2>
      <p className="text-[var(--text-muted)] mb-6 max-w-2xl mx-auto leading-relaxed">
        Shop the catalog, register to order. USDT payment after order confirmation.
        Bulk quotes via {SITE.location} sales — contact panel bottom-right: Telegram, WhatsApp, or email.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/products" className="btn-accent">Shop Catalog</Link>
        <Link href="/contact" className="btn-outline-dark">Contact Sales</Link>
      </div>
    </section>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Out of Stock</span>;
  if (stock <= 5) return <span className="badge-yellow">Low Stock ({stock})</span>;
  return <span className="badge-green">In Stock ({stock})</span>;
}
