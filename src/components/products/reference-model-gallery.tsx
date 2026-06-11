import Image from "next/image";
import type { ReferenceModelCard } from "@/lib/product-gallery-curate";
import type { ProductImageSpecs } from "@/lib/product-image-manifest";

function SpecLines({ specs }: { specs?: ProductImageSpecs }) {
  if (!specs) return null;
  const lines: string[] = [];
  if (specs.model) lines.push(`Model: ${specs.model}`);
  if (specs.variant) lines.push(`Variant: ${specs.variant}`);
  if (specs.ramGb && specs.storageGb) lines.push(`Memory: ${specs.ramGb}GB + ${specs.storageGb}GB`);
  else if (specs.storageGb) lines.push(`Storage: ${specs.storageGb}GB`);
  if (specs.ports?.length) lines.push(`Ports: ${specs.ports.join(" · ")}`);
  if (specs.boardType) lines.push(`Board: ${specs.boardType}`);
  if (lines.length === 0) return null;
  return (
    <ul className="mt-2 space-y-0.5 text-xs text-[var(--text-subtle)]">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

type Props = {
  title: string;
  intro: string;
  models: ReferenceModelCard[];
};

export function ReferenceModelGallery({ title, intro, models }: Props) {
  if (models.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-[var(--text)] mb-3">{title}</h2>
      <p className="text-sm text-[var(--text-muted)] mb-5">{intro}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {models.map((item) => (
          <article
            key={item.url}
            className="card overflow-hidden flex flex-col sm:flex-row sm:min-h-[140px]"
          >
            <div className="relative w-full sm:w-36 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[140px] bg-white">
              <Image
                src={item.url}
                alt={item.label}
                fill
                className="object-contain p-2"
                sizes="160px"
              />
            </div>
            <div className="p-4 flex flex-col justify-center min-w-0">
              <p className="font-semibold text-sm text-[var(--text)] leading-snug">{item.label}</p>
              <SpecLines specs={item.specs} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
