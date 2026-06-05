import { IMAGES } from "@/lib/images";

export type PackageComparison = {
  deviceQuantity: string;
  mainHardware: string;
  coolingLevel: string;
  powerLayout: string;
  bestFor: string;
  supportLevel: string;
};

export type HardwarePackage = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  highlights: string[];
  fromPriceUsd: number;
  image: string;
  productSlugs: string[];
  faq: { q: string; a: string }[];
  comparison: PackageComparison;
};

export const HARDWARE_PACKAGES: HardwarePackage[] = [
  {
    slug: "starter-box-bundle",
    name: "Starter Box Bundle",
    tagline: "First rack for evaluation teams and small QA labs",
    description:
      "Entry hardware bundle: phone farm rack chassis, USB hub module, power supply, and remote setup guidance. Suitable for teams validating real-device workflows before scaling.",
    includes: ["Phone Farm Box (20-node rack)", "USB Hub module", "Power supply kit", "Setup documentation", "QC test report"],
    highlights: ["Sample order from 1 unit", "Real smartphones or boards — not cloud", "Ships in 5–10 business days", "Pre-sales configuration call included"],
    fromPriceUsd: 899,
    image: IMAGES.phoneFarmBox.hero,
    productSlugs: ["phone-farm-box", "usb-hub", "power-supply-solution", "remote-control-setup"],
    comparison: {
      deviceQuantity: "Up to 20 devices",
      mainHardware: "Phone farm rack + USB hub + PSU",
      coolingLevel: "Standard active fans",
      powerLayout: "Single centralized PSU",
      bestFor: "QA labs, first deployment",
      supportLevel: "Email + WhatsApp pre-sales",
    },
    faq: [
      { q: "Is control software included?", a: "We provide hardware setup guidance. You may use your own ADB-compatible device management tools." },
      { q: "Can I upgrade later?", a: "Yes. Add motherboard boxes, cooling modules, or custom cabinets as you scale." },
    ],
  },
  {
    slug: "motherboard-density-pack",
    name: "Motherboard Density Pack",
    tagline: "Screenless Android nodes for high-density device labs",
    description:
      "Motherboard box with cooling, power, and network modules for teams that need more nodes per rack without full phone shells.",
    includes: ["Motherboard Box 20-node", "Cooling module", "Power supply", "Network router module"],
    highlights: ["Screenless motherboard nodes", "Centralized PSU and fan cooling", "Ideal for app testing labs", "Bulk pricing from 5+ units"],
    fromPriceUsd: 1899,
    image: IMAGES.motherboardBox.hero,
    productSlugs: ["motherboard-box", "cooling-solution", "power-supply-solution", "network-equipment"],
    comparison: {
      deviceQuantity: "Up to 20 motherboard nodes",
      mainHardware: "Motherboard box + cooling + network",
      coolingLevel: "Enhanced multi-fan airflow",
      powerLayout: "Industrial PSU per rack",
      bestFor: "Android QA, device management labs",
      supportLevel: "Pre-sales engineering + setup guide",
    },
    faq: [
      { q: "SIM bank compatibility?", a: "Depends on motherboard model. Share your SIM and carrier requirements for a compatibility check." },
    ],
  },
  {
    slug: "iphone-farm-suite",
    name: "iPhone Farm Suite",
    tagline: "Real iPhone arrays for iOS testing workflows",
    description:
      "iPhone farm rack with network equipment and deployment consultation for iOS QA, TestFlight validation, and device management teams.",
    includes: ["iPhone farm enclosure", "Network equipment", "Power routing", "Setup consultation"],
    highlights: ["Real Apple device hardware", "macOS control station compatible", "Overseas shipping available", "Dedicated pre-sales call"],
    fromPriceUsd: 1599,
    image: IMAGES.iphoneFarm.hero,
    productSlugs: ["iphone-phone-farm", "network-equipment", "remote-control-setup"],
    comparison: {
      deviceQuantity: "10–20 iPhones per rack",
      mainHardware: "iPhone farm rack + network module",
      coolingLevel: "Active cooling for iOS cluster",
      powerLayout: "Centralized charging bus",
      bestFor: "iOS QA labs, device management",
      supportLevel: "Pre-sales + remote setup guidance",
    },
    faq: [{ q: "How many iPhones per rack?", a: "Typically 10–20 depending on model and cable layout. Final count confirmed in quote." }],
  },
  {
    slug: "enterprise-rack-deployment",
    name: "Enterprise Rack Deployment",
    tagline: "Custom cabinet and multi-rack bulk hardware",
    description:
      "Custom cabinet with multiple phone farm racks, full power and cooling infrastructure, and bulk deployment support for large device management operations.",
    includes: ["Custom cabinet", "Multiple phone farm racks", "Full power & cooling", "Bulk deployment planning"],
    highlights: ["42U rack options available", "Written project quote", "Packing inspection before export", "B2B invoice on request"],
    fromPriceUsd: 8500,
    image: IMAGES.customCabinet.hero,
    productSlugs: ["custom-cabinet", "phone-farm-box", "power-supply-solution", "cooling-solution", "network-equipment"],
    comparison: {
      deviceQuantity: "40–100+ devices",
      mainHardware: "Custom cabinet + multi-rack layout",
      coolingLevel: "Rack-level ducted cooling",
      powerLayout: "Redundant PDU distribution",
      bestFor: "Enterprise device ops, large labs",
      supportLevel: "Dedicated quote + deployment planning",
    },
    faq: [{ q: "MOQ for enterprise?", a: "Custom quotes from 5+ racks. Contact sales with device count, site layout, and timeline." }],
  },
];

export function getPackage(slug: string) {
  return HARDWARE_PACKAGES.find((p) => p.slug === slug);
}
