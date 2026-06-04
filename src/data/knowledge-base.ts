export type KBArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
};

export const KB_CATEGORIES = [
  "Getting Started",
  "Phone Farm Box",
  "Motherboard Box",
  "Power & Cooling",
  "Network",
  "Remote Control",
  "Shipping & MOQ",
  "Troubleshooting",
] as const;

export const KB_ARTICLES: KBArticle[] = [
  {
    slug: "what-is-a-phone-farm",
    title: "What Is a Real-Device Phone Farm?",
    category: "Getting Started",
    excerpt: "Overview of phone farm hardware, use cases, and how PhoneFarm ICU catalogs factory-direct equipment.",
    body: [
      "A phone farm is a cluster of real smartphones or motherboard nodes operated from a central control station for testing, marketing, or multi-account workflows.",
      "PhoneFarm ICU focuses on physical hardware from Guangzhou — not cloud phones or emulators.",
      "Browse the product catalog for boxes, accessories, and deployment packages.",
    ],
  },
  {
    slug: "phone-farm-box-setup",
    title: "Phone Farm Box Setup Guide",
    category: "Phone Farm Box",
    excerpt: "Unboxing, power, USB topology, and first boot checklist for 20-node chassis.",
    body: [
      "Verify input voltage (110–220V) and install the included PSU.",
      "Connect the USB hub module and route OTG cables per slot map in the quick start guide.",
      "Run burn-in for 24 hours before production workloads.",
      "Configure remote control software after hardware QC passes.",
    ],
  },
  {
    slug: "motherboard-box-vs-phone-box",
    title: "Motherboard Box vs Phone Farm Box",
    category: "Motherboard Box",
    excerpt: "When to choose screenless motherboard arrays vs full phone enclosures.",
    body: [
      "Motherboard boxes remove displays and batteries for higher density and lower per-node cost.",
      "Phone farm boxes use complete phones — better for apps that require sensors and full device fingerprints.",
      "Both support ADB and common group control tools.",
    ],
  },
  {
    slug: "power-cooling-best-practices",
    title: "Power and Cooling Best Practices",
    category: "Power & Cooling",
    excerpt: "Avoid thermal throttling and PSU overload in 24/7 farms.",
    body: [
      "Keep ambient temperature below 35°C.",
      "Clean fan filters every 30 days.",
      "Use the rated PSU wattage for your node count — do not daisy-chain consumer adapters.",
    ],
  },
  {
    slug: "network-topology",
    title: "Network Topology for Phone Farms",
    category: "Network",
    excerpt: "Routers, proxies, and per-cluster network isolation.",
    body: [
      "Assign one router or VLAN segment per 20–40 devices for stable IP rotation.",
      "Use industrial switches for rack deployments.",
      "Document MAC and IP maps for support escalations.",
    ],
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Control and Group Control Setup",
    category: "Remote Control",
    excerpt: "Mirror devices, batch APK install, and group projects.",
    body: [
      "PhoneFarm ICU offers remote control setup as a catalog service.",
      "Enable ADB, authorize hosts, and group devices by client or campaign.",
      "We do not sell cloud automation SaaS — we support real-device control workflows.",
    ],
  },
  {
    slug: "shipping-moq-samples",
    title: "Shipping, MOQ, and Sample Orders",
    category: "Shipping & MOQ",
    excerpt: "Lead times, MOQ, and overseas delivery from Guangzhou.",
    body: [
      "In-stock SKUs typically ship in 3–5 business days via DHL/FedEx.",
      "Sample units available for evaluation before bulk orders.",
      "MOQ discounts from 5+ units — contact sales for enterprise quotes.",
    ],
  },
  {
    slug: "troubleshooting-usb-drops",
    title: "Troubleshooting USB Drops and Disconnects",
    category: "Troubleshooting",
    excerpt: "Fix unstable ADB connections in dense farms.",
    body: [
      "Replace worn USB cables and verify hub power injection.",
      "Reduce cable length; use powered industrial hubs.",
      "Check for thermal throttling on devices running 24/7.",
    ],
  },
];

export function getKBArticle(slug: string) {
  return KB_ARTICLES.find((a) => a.slug === slug);
}
