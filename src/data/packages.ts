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
  /** Pain points this bundle solves (reference package page pattern) */
  painPoints: string[];
  /** Included support & documentation bundle */
  giftBundle: string[];
  whyRealDevices: string;
  includes: string[];
  highlights: string[];
  fromPriceUsd: number;
  image: string;
  productSlugs: string[];
  faq: { q: string; a: string }[];
  comparison: PackageComparison;
};

const PACKAGE_FAQ_STANDARD = [
  {
    q: "Is there a device limit?",
    a: "Standard racks support up to 20 slots per unit. Final count depends on device dimensions — confirmed in your quote.",
  },
  {
    q: "Do you support enterprise deployment?",
    a: "Yes. Multi-rack and custom cabinet projects include engineering review. Contact sales with team size and timeline.",
  },
  {
    q: "What if I have problems after delivery?",
    a: "Dedicated sales support via WhatsApp, Telegram, and email. Remote diagnostics and spare parts available.",
  },
  {
    q: "Are paid hardware updates required?",
    a: "No recurring software license from PhoneFarm ICU. Standard hardware support covers chassis, fans, and PSU modules for 12 months.",
  },
] as const;

export const HARDWARE_PACKAGES: HardwarePackage[] = [
  {
    slug: "starter-box-bundle",
    name: "Starter Box Bundle",
    tagline: "First rack for evaluation teams and small QA labs",
    description:
      "Entry hardware bundle: phone farm rack chassis, USB hub module, power supply, and remote setup guidance. Suitable for teams validating real-device workflows before scaling.",
    painPoints: [
      "Scattered phone chargers and cable clutter on desks",
      "Unstable USB connections during QA runs",
      "No documented slot map for maintenance",
      "Unclear power budget before scaling beyond one rack",
      "Manual device checks without centralized rack layout",
    ],
    giftBundle: [
      "Quick-start deployment guide (A–Z hardware checklist)",
      "Slot wiring map and accessory checklist in carton",
      "Pre-sales configuration call included",
      "QC burn-in test report before export",
      "Optional Remote Control Setup for first-boot ADB walkthrough",
    ],
    whyRealDevices:
      "Real smartphones in a box phone farm provide authentic sensors, device fingerprints, and OS behavior — unlike cloud phones or browser-only automation. This bundle ships the physical rack layer tested in our Guangzhou workshop.",
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
      ...PACKAGE_FAQ_STANDARD,
    ],
  },
  {
    slug: "motherboard-density-pack",
    name: "Motherboard Density Pack",
    tagline: "Screenless Android nodes for high-density device labs",
    description:
      "Motherboard box with cooling, power, and network modules for teams that need more nodes per rack without full phone shells.",
    painPoints: [
      "Full phone shells waste rack space when displays are not needed",
      "High per-node cost with complete smartphones",
      "Network isolation unclear for multi-account labs",
      "Thermal hotspots without dedicated cooling module",
      "PSU undersized for dense charging load",
    ],
    giftBundle: [
      "Motherboard slot layout drawing",
      "Network topology one-pager for VLAN planning",
      "Cooling maintenance interval sticker",
      "Engineering review call for 5+ unit orders",
      "Written quote with PSU load calculation",
    ],
    whyRealDevices:
      "Motherboard boxes use real ARM boards — not emulators — for headless automation at higher density than full phone enclosures. Pair with network module when per-cluster IP isolation is required.",
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
      ...PACKAGE_FAQ_STANDARD,
    ],
  },
  {
    slug: "iphone-farm-suite",
    name: "iPhone Farm Suite",
    tagline: "Real iPhone arrays for iOS testing workflows",
    description:
      "iPhone farm rack with network equipment and deployment consultation for iOS QA, TestFlight validation, and device management teams.",
    painPoints: [
      "Mixed Lightning and USB-C generations in one lab",
      "No centralized charging bus for iPhone arrays",
      "macOS control station layout unclear",
      "iOS device trust re-authorization after OS updates",
      "Network segmentation for multi-team iOS labs",
    ],
    giftBundle: [
      "Generation-specific cable plan document",
      "iOS lab wiring diagram",
      "Pre-sales consultation for macOS control layout",
      "Chassis-only photo reference guide (devices BYO)",
      "Remote Control Setup option for first iOS detection pass",
    ],
    whyRealDevices:
      "Real iPhones in a ventilated rack provide authentic iOS behavior for TestFlight and build validation — chassis photos show slot layout; devices are customer-supplied and installed on-site.",
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
    faq: [
      { q: "How many iPhones per rack?", a: "Typically 10–20 depending on model and cable layout. Final count confirmed in quote." },
      { q: "Are iPhones included?", a: "No — rack chassis and cabling hardware only. You supply iPhones matched to the quoted layout." },
      ...PACKAGE_FAQ_STANDARD,
    ],
  },
  {
    slug: "enterprise-rack-deployment",
    name: "Enterprise Rack Deployment",
    tagline: "Custom cabinet and multi-rack bulk hardware",
    description:
      "Custom cabinet with multiple phone farm racks, full power and cooling infrastructure, and bulk deployment support for large device management operations.",
    painPoints: [
      "Stacking single racks without PDU or cable management",
      "Room power and HVAC not sized for 50+ charging nodes",
      "No phased shipment plan for international bulk",
      "Maintenance downtime without spare fan and cable inventory",
      "Unclear project quote for multi-rack ROI",
    ],
    giftBundle: [
      "Written layout drawing before production lock",
      "PDU and cooling load summary",
      "Packing inspection photos before export",
      "Dedicated project contact for multi-rack orders",
      "Phased shipment schedule option",
    ],
    whyRealDevices:
      "Enterprise device labs run 24/7 on real hardware. Custom cabinets integrate multiple box phone farm racks with ducted airflow and labeled cable trays — engineered per room, not a one-size shelf stack.",
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
    faq: [
      { q: "MOQ for enterprise?", a: "Custom quotes from 5+ racks. Contact sales with device count, site layout, and timeline." },
      ...PACKAGE_FAQ_STANDARD,
    ],
  },
];

export function getPackage(slug: string) {
  return HARDWARE_PACKAGES.find((p) => p.slug === slug);
}
