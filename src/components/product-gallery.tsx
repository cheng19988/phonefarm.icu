"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const thumbs = [...new Set(images.filter(Boolean))];
  const [active, setActive] = useState(0);
  const current = thumbs[active] ?? thumbs[0];

  if (!current) return null;

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-[var(--border)] shadow-lg shadow-blue-900/5">
        <Image
          src={current}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
      {thumbs.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 snap-x">
          {thumbs.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                i === active
                  ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/20"
                  : "border-[var(--border)] hover:border-[var(--brand)]/50"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
