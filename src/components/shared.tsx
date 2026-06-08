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
      <a href={`tel:${CONTACT.phone}`} className={`${linkClass} transition-colors`}>
        {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} transition-colors`}>
        WhatsApp
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} transition-colors`}>
        Telegram
      </a>
      <a href={`mailto:${CONTACT.email}`} className={`${linkClass} transition-colors`}>
        {CONTACT.email}
      </a>
    </div>
  );
}

export function ContactCTA({ title = "Ready to Build Your Phone Farm?" }: { title?: string }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 text-center shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3">{title}</h2>
      <p className="text-[var(--text-muted)] mb-6 max-w-2xl mx-auto">
        Shop the catalog, register to order. USDT payment is available after order confirmation.
        Sales team will confirm payment and update order status. Bulk quotes via {SITE.location} sales.
      </p>
      <ContactBar />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/products" className="btn-accent">Shop Now</Link>
        <Link href="/register" className="btn-primary">Sign Up</Link>
        <Link href="/contact" className="btn-outline">Contact Sales</Link>
      </div>
    </section>
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 border-t border-[var(--border)] backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 divide-x divide-[var(--border)]">
        <Link href="/products" className="flex flex-col items-center py-3 text-xs font-medium text-[var(--brand)]">
          Shop
        </Link>
        <Link href="/register" className="flex flex-col items-center py-3 text-xs text-[var(--text-muted)]">
          Sign Up
        </Link>
        <Link href="/login" className="flex flex-col items-center py-3 text-xs text-[var(--text-muted)]">
          Sign In
        </Link>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-[var(--text-muted)]">
          WhatsApp
        </a>
        <Link href="/contact" className="flex flex-col items-center py-3 text-xs text-[var(--text-muted)]">
          Sales
        </Link>
      </div>
    </div>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Out of Stock</span>;
  if (stock <= 5) return <span className="badge-yellow">Low Stock ({stock})</span>;
  return <span className="badge-green">In Stock ({stock})</span>;
}
