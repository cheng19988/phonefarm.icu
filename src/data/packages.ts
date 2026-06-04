import { IMAGES } from "@/lib/images";

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
};

export const HARDWARE_PACKAGES: HardwarePackage[] = [
  {
    slug: "starter-box-bundle",
    name: "Starter Box Bundle",
    tagline: "Entry 20-node phone farm for creators and testers",
    description:
      "Complete starter deployment: Phone Farm Box chassis, USB hub module, power supply, and remote control setup guidance. Built for teams launching their first real-device matrix.",
    includes: ["Phone Farm Box (20-node)", "USB Hub module", "Power supply kit", "Remote control setup guide", "QC test report"],
    highlights: ["Factory-direct from Guangzhou", "Real devices — not cloud phones", "Ships in 3–5 business days", "Sample units available"],
    fromPriceUsd: 899,
    image: IMAGES.phoneFarmBox.hero,
    productSlugs: ["phone-farm-box", "usb-hub", "power-supply-solution", "remote-control-setup"],
    faq: [
      { q: "Is software included?", a: "We provide remote control setup support; you may use your preferred group control software compatible with ADB." },
      { q: "Can I upgrade later?", a: "Yes. Add motherboard boxes, network gear, or custom cabinets as you scale." },
    ],
  },
  {
    slug: "motherboard-density-pack",
    name: "Motherboard Density Pack",
    tagline: "High-density Android automation at lower per-node cost",
    description:
      "Motherboard Box plus cooling, power, and network accessories for large-scale Android farms without full phone shells.",
    includes: ["Motherboard Box 20-node", "Cooling module", "Power supply", "Network router module"],
    highlights: ["Screenless nodes", "Centralized PSU and cooling", "Ideal for QA and ad verification", "Enterprise MOQ discounts"],
    fromPriceUsd: 1899,
    image: IMAGES.motherboardBox.hero,
    productSlugs: ["motherboard-box", "cooling-solution", "power-supply-solution", "network-equipment"],
    faq: [
      { q: "SIM support?", a: "Depends on motherboard model; contact sales for compatible boards and SIM trays." },
    ],
  },
  {
    slug: "iphone-farm-suite",
    name: "iPhone Farm Suite",
    tagline: "Real iPhone arrays for iOS workflows",
    description:
      "iPhone Phone Farm hardware with network equipment and deployment support for TestFlight, multi-account, and iOS QA teams.",
    includes: ["iPhone farm enclosure", "Network equipment", "Power routing", "Setup consultation"],
    highlights: ["Real Apple hardware", "macOS control station compatible", "Overseas shipping", "1:1 technical support"],
    fromPriceUsd: 1599,
    image: IMAGES.iphoneFarm.hero,
    productSlugs: ["iphone-phone-farm", "network-equipment", "remote-control-setup"],
    faq: [{ q: "How many iPhones per rack?", a: "Typically 10–20 per unit depending on configuration." }],
  },
  {
    slug: "enterprise-rack-deployment",
    name: "Enterprise Rack Deployment",
    tagline: "Custom cabinet + bulk boxes for agencies",
    description:
      "Custom cabinet, multiple phone farm boxes, power/cooling/network at scale — with bulk deployment and overseas delivery support.",
    includes: ["Custom cabinet", "Multiple Phone Farm Boxes", "Full power & cooling", "Bulk deployment service"],
    highlights: ["42U rack options", "Dedicated project manager", "Remote ops support", "B2B invoicing / USDT"],
    fromPriceUsd: 8500,
    image: IMAGES.customCabinet.hero,
    productSlugs: ["custom-cabinet", "phone-farm-box", "power-supply-solution", "cooling-solution", "network-equipment"],
    faq: [{ q: "MOQ for enterprise?", a: "Custom quotes from 5+ units; contact sales with device quantity and timeline." }],
  },
];

export function getPackage(slug: string) {
  return HARDWARE_PACKAGES.find((p) => p.slug === slug);
}
