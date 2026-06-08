const TRUST_ITEMS = [
  "Guangzhou assembly & sourcing",
  "Hardware checked before shipment",
  "Packing inspection before export",
  "Configuration advice before quote",
  "Sample & bulk orders supported",
  "Remote rack layout support",
];

export function TrustStrip({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const light = variant === "light";
  return (
    <div
      className={`border-y py-3.5 ${
        light
          ? "border-[var(--border)] bg-[var(--surface-muted)]"
          : "border-slate-800 bg-slate-900/40"
      } ${className}`}
    >
      <div
        className={`container-hero flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs ${
          light ? "text-[var(--text-subtle)]" : "text-slate-500"
        }`}
      >
        {TRUST_ITEMS.map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${light ? "bg-[var(--brand)]" : "bg-slate-600"}`}
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
