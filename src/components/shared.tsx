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

export function ContactBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${compact ? "text-xs" : "text-sm"}`}>
      <a href={`tel:${CONTACT.phone}`} className="text-slate-300 hover:text-white transition-colors">
        {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
        WhatsApp
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
        Telegram
      </a>
      <a href={`mailto:${CONTACT.email}`} className="text-slate-300 hover:text-white transition-colors">
        {CONTACT.email}
      </a>
    </div>
  );
}

export function ContactCTA({ title = "Request a Quote" }: { title?: string }) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
        Our {SITE.location} team handles hardware quotes, compatibility checks, and shipping estimates. Typical reply within one business day.
      </p>
      <ContactBar />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="btn-primary">
          Request a Quote
        </Link>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          WhatsApp Inquiry
        </a>
        <Link href="/contact" className="btn-outline">
          Contact Sales
        </Link>
      </div>
    </section>
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-slate-950/95 border-t border-slate-800 backdrop-blur-sm">
      <div className="grid grid-cols-4 divide-x divide-slate-800">
        <a href={`tel:${CONTACT.phone}`} className="flex flex-col items-center py-3 text-xs text-slate-300 hover:text-white">
          Call
        </a>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-slate-300 hover:text-white">
          WhatsApp
        </a>
        <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-slate-300 hover:text-white">
          Telegram
        </a>
        <a href="/contact" className="flex flex-col items-center py-3 text-xs text-slate-300 hover:text-white">
          Quote
        </a>
      </div>
    </div>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Out of Stock</span>;
  if (stock <= 5) return <span className="badge-yellow">Low Stock ({stock})</span>;
  return <span className="badge-green">In Stock ({stock})</span>;
}
