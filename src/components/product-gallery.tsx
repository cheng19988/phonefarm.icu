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
    <div className="space-y-4">
      <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-950/50">
        <Image
          src={current}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
      </div>
      {thumbs.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {thumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-cyan-500" : "border-slate-700 hover:border-slate-500"
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
