"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { KBArticle } from "@/data/knowledge-base";

export function KBSearch({ articles }: { articles: KBArticle[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term) ||
        a.category.toLowerCase().includes(term) ||
        a.body.some((p) => p.toLowerCase().includes(term)),
    );
  }, [q, articles]);

  return (
    <div className="mb-10">
      <label className="form-label">Search knowledge base</label>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="e.g. motherboard, USB, shipping, cooling"
        className="form-input max-w-xl"
      />
      {q.trim() && (
        <ul className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <li className="text-[var(--text-subtle)] text-sm">No articles match your search.</li>
          ) : (
            filtered.map((a) => (
              <li key={a.slug}>
                <Link href={`/knowledge-base/${a.slug}`} className="text-[var(--brand)] hover:underline text-sm font-medium">
                  {a.title}
                </Link>
                <span className="text-[var(--text-subtle)] text-xs ml-2">{a.category}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
