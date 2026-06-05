const TRUST_ITEMS = [
  "Guangzhou assembly & sourcing",
  "Hardware checked before shipment",
  "Packing inspection before export",
  "Configuration advice before quote",
  "Sample & bulk orders supported",
  "Remote rack layout support",
];

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`border-y border-slate-800 bg-slate-900/40 py-4 ${className}`}>
      <div className="container-wide flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-slate-500">
        {TRUST_ITEMS.map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
