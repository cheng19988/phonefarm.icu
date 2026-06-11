"use client";

import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge } from "@/components/shared";

type Props = {
  slug: string;
  name: string;
  category: string;
  productLine?: string | null;
  productLineHref?: string | null;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  model?: string;
  warrantySummary?: string;
  specHighlights?: string[];
  /** PDP uses PageIntro for title — buy box shows pricing/actions only */
  compact?: boolean;
};

export function BuyBox({
  slug,
  name,
  category,
  productLine,
  productLineHref,
  shortDesc,
  priceUsd,
  stock,
  model,
  warrantySummary = "12-month hardware support — term confirmed in quotation",
  specHighlights = [],
  compact = false,
}: Props) {
  const disabled = stock <= 0;

  return (
    <div className="lg:sticky lg:top-28">
      {!compact && (
        <>
          <p className="eyebrow text-[var(--accent)] mb-3">{category}</p>
          {productLine && (
            <p className="text-sm text-[var(--text-subtle)] mb-3">
              Product line:{" "}
              {productLineHref ? (
                <Link href={productLineHref} className="text-[var(--brand)] hover:underline">
                  {productLine}
                </Link>
              ) : (
                productLine
              )}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-[var(--text)] mb-4 leading-tight tracking-tight">{name}</h1>
        </>
      )}
      {compact && productLine && (
        <p className="text-sm text-[var(--text-subtle)] mb-4">
          Line:{" "}
          {productLineHref ? (
            <Link href={productLineHref} className="text-[var(--brand)] hover:underline">
              {productLine}
            </Link>
          ) : (
            productLine
          )}
        </p>
      )}
      {specHighlights[0] && (
        <p className="text-sm text-[var(--text-subtle)] mb-4">
          Reference: <span className="font-medium text-[var(--text-muted)]">{specHighlights[0]}</span>
        </p>
      )}
      {!compact && shortDesc && (
        <p className="text-base text-[var(--text-muted)] mb-4 leading-relaxed">{shortDesc}</p>
      )}

      {specHighlights.length > 1 && (
        <ul className="mb-5 space-y-1.5 text-sm text-[var(--text-muted)]">
          {specHighlights.slice(1, 4).map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-[var(--accent)]">·</span>
              {s}
            </li>
          ))}
        </ul>
      )}

      <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <PriceTag priceUsd={priceUsd} size="lg" label="USD reference" />
          <StockBadge stock={stock} />
        </div>
        <p className="text-xs text-[var(--text-subtle)]">
          Reference price — final amount confirmed at checkout. Bulk pricing via sales quote.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <form action="/api/orders" method="POST">
          <input type="hidden" name="productSlug" value={slug} />
          <input type="hidden" name="action" value="buy" />
          <button type="submit" disabled={disabled} className="btn-accent w-full text-base py-3.5 disabled:opacity-50">
            Buy Now
          </button>
        </form>
        <div className="grid grid-cols-2 gap-3">
          <form action="/api/orders" method="POST">
            <input type="hidden" name="productSlug" value={slug} />
            <input type="hidden" name="action" value="quote" />
            <button type="submit" className="btn-secondary w-full text-sm py-3">
              Add to Order
            </button>
          </form>
          <Link href={`/contact?product=${slug}`} className="btn-outline-light text-center text-sm py-3">
            Request Quote
          </Link>
        </div>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-light w-full text-sm py-3 text-center"
        >
          WhatsApp Sales
        </a>
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-6">
        <Link href="/login" className="text-[var(--brand)] font-medium hover:underline">
          Sign In
        </Link>
        {" or "}
        <Link href="/register" className="text-[var(--brand)] font-medium hover:underline">
          Sign Up
        </Link>
        {" to place orders and track payment."}
      </p>

      <div className="grid sm:grid-cols-3 gap-3 text-center text-xs border-t border-[var(--border)] pt-5">
        <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
          <p className="font-semibold text-[var(--text)] mb-1">Warranty</p>
          <p className="text-[var(--text-subtle)] line-clamp-2">{warrantySummary}</p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
          <p className="font-semibold text-[var(--text)] mb-1">Shipping</p>
          <p className="text-[var(--text-subtle)]">Global export from Guangzhou</p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
          <p className="font-semibold text-[var(--text)] mb-1">Payment</p>
          <p className="text-[var(--text-subtle)]">USDT after confirmation</p>
        </div>
      </div>

      <div className="mt-5 p-4 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)]">
        <p className="font-semibold text-[var(--text)] mb-1">Sales contact</p>
        <p>
          Telegram {CONTACT.telegram} · WhatsApp {CONTACT.whatsapp} · {CONTACT.email}
        </p>
      </div>
    </div>
  );
}
