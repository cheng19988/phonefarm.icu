import Link from "next/link";
import { HARDWARE_PACKAGES } from "@/data/packages";

const ROWS: { key: keyof (typeof HARDWARE_PACKAGES)[0]["comparison"]; label: string }[] = [
  { key: "deviceQuantity", label: "Recommended device quantity" },
  { key: "mainHardware", label: "Main hardware included" },
  { key: "coolingLevel", label: "Cooling level" },
  { key: "powerLayout", label: "Power layout" },
  { key: "bestFor", label: "Best for" },
  { key: "supportLevel", label: "Support level" },
];

export function PackageComparisonTable() {
  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-x-auto bg-white shadow-sm">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)]">
            <th className="p-4 text-left text-[var(--text-subtle)] font-medium w-48">Compare</th>
            {HARDWARE_PACKAGES.map((pkg) => (
              <th key={pkg.slug} className="p-4 text-left">
                <Link href={`/packages/${pkg.slug}`} className="font-bold text-[var(--text)] hover:text-[var(--brand)]">
                  {pkg.name}
                </Link>
                <p className="text-[var(--accent)] font-semibold mt-1">From ${pkg.fromPriceUsd}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-[var(--surface-muted)]/40"}>
              <td className="p-4 text-[var(--text-subtle)] font-medium">{row.label}</td>
              {HARDWARE_PACKAGES.map((pkg) => (
                <td key={pkg.slug} className="p-4 text-[var(--text-muted)]">
                  {pkg.comparison[row.key]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-white border-t border-[var(--border)]">
            <td className="p-4 text-[var(--text-subtle)] font-medium">Starting price</td>
            {HARDWARE_PACKAGES.map((pkg) => (
              <td key={pkg.slug} className="p-4 font-bold text-[var(--accent)]">
                From ${pkg.fromPriceUsd} USD
              </td>
            ))}
          </tr>
          <tr className="bg-[var(--surface-muted)]/40">
            <td className="p-4 text-[var(--text-subtle)] font-medium">Order</td>
            {HARDWARE_PACKAGES.map((pkg) => (
              <td key={pkg.slug} className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Link href={`/packages/${pkg.slug}`} className="btn-secondary text-xs py-2 px-3">
                    View
                  </Link>
                  <Link href={`/contact?product=${pkg.slug}`} className="btn-outline-dark text-xs py-2 px-3">
                    Quote
                  </Link>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
