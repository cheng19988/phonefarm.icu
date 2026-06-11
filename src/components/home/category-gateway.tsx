import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { getCategoryMatrixWithImages } from "@/lib/category-matrix";

export function CategoryGateway() {
  const categories = getCategoryMatrixWithImages();

  return (
    <section className="section">
      <div className="container-hero">
        <SectionHeader
          eyebrow="Product Lines"
          title="12 Hardware Categories"
          subtitle="Full phone farm catalog — racks, motherboard boxes, power, cooling, network, and deployment services."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 mt-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group card card-hover flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-white border-b border-[var(--border)]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 flex-1">{cat.desc}</p>
                <span className="text-xs text-[var(--accent)] font-semibold mt-2">View SKU</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products" className="btn-outline-dark text-sm">
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
