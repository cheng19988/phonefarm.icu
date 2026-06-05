"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { StockBadge } from "./shared";

type ProductCardProps = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
};

export function ProductCard({ slug, name, shortDesc, priceUsd, stock, imageCard, category }: ProductCardProps) {
  return (
    <article className="card group flex flex-col">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden rounded-t-xl bg-slate-900">
        <Image
          src={imageCard}
          alt={`${name} — phone farm hardware`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <span className="absolute top-3 left-3 text-xs bg-slate-950/80 text-slate-300 px-2 py-1 rounded">{category}</span>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">{name}</h3>
        </Link>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1">{shortDesc}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-500">From <span className="text-lg font-bold text-white">${priceUsd.toLocaleString()}</span></span>
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/products/${slug}`} className="btn-outline text-center text-sm py-2">View Specs</Link>
          <Link href={`/contact?product=${slug}`} className="btn-primary text-center text-sm py-2">Request Quote</Link>
        </div>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="card p-4 group">
          <summary className="font-medium text-white cursor-pointer list-none flex justify-between items-center">
            {item.question}
            <span className="text-slate-500 group-open:rotate-45 transition-transform text-xl">+</span>
          </summary>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Primary B2B quote CTAs — used on product and package pages */
export function ProductQuoteButtons({ slug, productName }: { slug: string; productName: string }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Link href={`/contact?product=${slug}`} className="btn-primary">
          Request Quote for This Product
        </Link>
        <Link href={`/contact?product=${slug}&message=Compatibility+check+for+${encodeURIComponent(productName)}`} className="btn-secondary">
          Ask for Compatibility
        </Link>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
          WhatsApp Sales
        </a>
      </div>
      <p className="text-xs text-slate-500">
        Reference price shown. Final quote depends on device model, quantity, cooling, power layout, and shipping destination.
      </p>
    </div>
  );
}

/** Kept for backend order flow — not used on marketing pages */
export function BuyButtons({ slug, stock }: { slug: string; stock: number }) {
  const disabled = stock <= 0;
  return (
    <div className="flex flex-wrap gap-3 hidden" aria-hidden="true">
      <form action="/api/orders" method="POST">
        <input type="hidden" name="productSlug" value={slug} />
        <input type="hidden" name="action" value="buy" />
        <button type="submit" disabled={disabled}>Buy Now</button>
      </form>
      <form action="/api/orders" method="POST">
        <input type="hidden" name="productSlug" value={slug} />
        <input type="hidden" name="action" value="quote" />
        <button type="submit">Add to Order</button>
      </form>
    </div>
  );
}
