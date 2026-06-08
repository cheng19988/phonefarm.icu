import Link from "next/link";
import { SHOP_FILTERS } from "@/lib/config";

type Props = {
  activeGroup?: string;
  activeCategory?: string;
};

function isActive(filter: (typeof SHOP_FILTERS)[number], activeGroup?: string, activeCategory?: string) {
  if (filter.key === "all") return !activeGroup && !activeCategory;
  if (filter.key === "packages") return false;
  return activeGroup === filter.key;
}

export function CategoryFilters({ activeGroup, activeCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {SHOP_FILTERS.map((filter) => {
        const active = isActive(filter, activeGroup, activeCategory);
        return (
          <Link
            key={filter.key}
            href={filter.href}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              active
                ? "border-[var(--brand)] text-white bg-[var(--brand)] shadow-sm"
                : "border-[var(--border-strong)] text-[var(--text-muted)] bg-white hover:border-[var(--brand)] hover:text-[var(--brand)]"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
      {activeCategory && (
        <span className="px-4 py-2 rounded-full text-sm font-medium border border-[var(--accent)] text-[var(--accent)] bg-orange-50">
          {activeCategory}
        </span>
      )}
    </div>
  );
}
