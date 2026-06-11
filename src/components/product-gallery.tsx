"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
  captions?: Record<string, string>;
};

export function ProductGallery({ images, alt, captions = {} }: Props) {
  const thumbs = [...new Set(images.filter(Boolean))];
  const [active, setActive] = useState(0);
  const current = thumbs[active] ?? thumbs[0];
  const caption = captions[current];

  if (!current) return null;

  const visibleThumbs = thumbs;

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[var(--border)] shadow-sm">
        <Image
          src={current}
          alt={caption ? `${alt} — ${caption}` : alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
        {thumbs.length > 1 && (
          <span className="absolute bottom-3 right-3 text-xs font-medium bg-[var(--dark-bg)]/75 text-white px-2.5 py-1 rounded-full">
            {active + 1} / {thumbs.length}
          </span>
        )}
      </div>

      {caption && (
        <p className="text-sm font-medium text-[var(--text)] leading-snug px-1">{caption}</p>
      )}

      {visibleThumbs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {visibleThumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              title={captions[src]}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                i === active
                  ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/15"
                  : "border-[var(--border)] hover:border-[var(--brand)]/40"
              }`}
            >
              <Image src={src} alt="" fill className="object-contain p-1.5 bg-white" sizes="80px" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
