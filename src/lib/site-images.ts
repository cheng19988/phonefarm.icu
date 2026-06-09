import { IMAGES } from "@/lib/images";

/**
 * Intended asset paths for future replacement.
 * Do not use directly in <Image> until files exist — use fallback helpers below.
 */
export const SITE_IMAGE_PATHS = {
  home: { hero: "/images/home/homepage-hero.webp" },
  factory: {
    assembly: "/images/factory/factory-assembly.webp",
    qc: "/images/factory/qc-testing.webp",
    packing: "/images/factory/packing-inspection.webp",
    export: "/images/factory/export-cartons.webp",
    warehouse: "/images/factory/warehouse.webp",
  },
  packages: {
    starter: "/images/packages/starter-package.webp",
    professional: "/images/packages/professional-package.webp",
    enterprise: "/images/packages/enterprise-package.webp",
  },
  product: (slug: string) => ({
    hero: `/images/products/${slug}/hero.webp`,
    detail1: `/images/products/${slug}/detail-1.webp`,
    detail2: `/images/products/${slug}/detail-2.webp`,
    packing: `/images/products/${slug}/packing.webp`,
  }),
} as const;

/** Safe fallbacks — always point to existing public assets */
export const FACTORY_IMAGES = {
  assembly: IMAGES.company.workshop,
  qc: IMAGES.company.meeting,
  packing: IMAGES.company.warehouse,
  export: IMAGES.company.warehouse,
  warehouse: IMAGES.company.warehouse,
  office: IMAGES.company.office,
} as const;
