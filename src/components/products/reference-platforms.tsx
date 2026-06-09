import Image from "next/image";

type Model = { label: string; url: string };

type Props = {
  models: Model[];
  title?: string;
};

export function ReferencePlatforms({ models, title = "Supported Reference Platforms" }: Props) {
  if (models.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3">{title}</h2>
      <p className="text-sm text-[var(--text-muted)] mb-5 max-w-2xl">
        Factory reference boards and configurations available for this product line. Final slot layout is confirmed
        against your model list in the quote.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {models.map((m) => (
          <div
            key={m.url}
            className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--brand)]/25 transition-colors"
          >
            <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[var(--surface-muted)] border border-[var(--border)]">
              <Image src={m.url} alt="" fill className="object-contain p-1" sizes="56px" />
            </div>
            <p className="text-sm text-[var(--text)] leading-snug font-medium">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
