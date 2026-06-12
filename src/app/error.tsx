"use client";

import Link from "next/link";
import { CONTACT } from "@/lib/config";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="section section-light">
      <div className="container-hero max-w-2xl text-center">
        <div className="card p-10">
          <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Something Went Wrong</h1>
          <p className="text-[var(--text-muted)] mb-6">
            This page could not load. Please try again or contact our Guangzhou sales team directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button type="button" onClick={reset} className="btn-primary">
              Try Again
            </button>
            <Link href="/" className="btn-secondary">
              Home
            </Link>
            <Link href="/contact" className="btn-outline-dark">
              Contact Sales
            </Link>
          </div>
          <p className="text-sm text-[var(--text-subtle)]">
            WhatsApp {CONTACT.whatsapp} · Telegram {CONTACT.telegram}
          </p>
        </div>
      </div>
    </div>
  );
}
