export type KBArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
};

export const KB_CATEGORIES = [
  "Getting Started",
  "Phone Farm Rack",
  "Motherboard Box",
  "Power & Cooling",
  "Network",
  "Shipping & MOQ",
  "Quote & Support",
  "Troubleshooting",
] as const;

export const KB_ARTICLES: KBArticle[] = [
  {
    slug: "how-to-choose-phone-farm-rack",
    title: "How to Choose a Phone Farm Rack",
    category: "Getting Started",
    excerpt: "Decision guide for phone farm racks vs motherboard boxes vs custom cabinets.",
    body: [
      "Start with your device count and platform (Android, iPhone, or mixed).",
      "Phone farm racks suit teams that need full smartphones with sensors and displays.",
      "Motherboard boxes suit high-density Android labs where screens are not required.",
      "For 40+ devices, discuss custom cabinet layout with our sales team.",
      "Request a quote with your device models and shipping country for a specific recommendation.",
    ],
  },
  {
    slug: "phone-farm-box-setup",
    title: "Phone Farm Rack Setup Checklist",
    category: "Phone Farm Rack",
    excerpt: "Unboxing, power, USB topology, and first boot checklist.",
    body: [
      "Verify input voltage (110–220V) and install the included PSU.",
      "Connect the USB hub module and route cables per the slot map in the quick start guide.",
      "Run burn-in testing before production workloads.",
      "Configure your device management software after hardware QC passes.",
    ],
  },
  {
    slug: "motherboard-box-vs-phone-box",
    title: "Motherboard Box vs Phone Farm Rack",
    category: "Motherboard Box",
    excerpt: "When to choose screenless motherboard arrays vs full phone enclosures.",
    body: [
      "Motherboard boxes remove displays and batteries for higher density and lower per-node cost.",
      "Phone farm racks use complete phones — better for apps that require sensors and displays.",
      "Both support ADB and common device management tools.",
      "Contact sales if you are unsure which fits your QA or device lab workflow.",
    ],
  },
  {
    slug: "power-cooling-best-practices",
    title: "Cooling and Power Planning",
    category: "Power & Cooling",
    excerpt: "Avoid thermal issues and PSU overload in dense racks.",
    body: [
      "Keep ambient temperature below 35°C where possible.",
      "Clean fan filters on cooling racks every 30 days.",
      "Use the rated PSU wattage for your node count — avoid consumer-grade daisy-chaining.",
      "Share your room layout in a quote request for a power and cooling recommendation.",
    ],
  },
  {
    slug: "network-topology",
    title: "Network Topology for Device Racks",
    category: "Network",
    excerpt: "Routers, VLANs, and per-cluster network isolation.",
    body: [
      "Assign one router or VLAN segment per 20–40 devices for stable connectivity.",
      "Use industrial switches for multi-rack deployments.",
      "Document MAC and IP maps for support and maintenance.",
    ],
  },
  {
    slug: "shipping-moq-samples",
    title: "Shipping, Packing, and Sample Orders",
    category: "Shipping & MOQ",
    excerpt: "Lead times, MOQ, and overseas delivery from Guangzhou.",
    body: [
      "In-stock SKUs: 5–10 business days for assembly and QC before dispatch.",
      "Sample units available for evaluation before bulk orders.",
      "Bulk pricing from 5+ units — contact sales for enterprise quotes.",
      "All exports pass packing inspection before handoff to courier or sea freight.",
    ],
  },
  {
    slug: "how-to-request-quote",
    title: "How to Request a Hardware Quote",
    category: "Quote & Support",
    excerpt: "What information to include for a fast, accurate quotation.",
    body: [
      "Device quantity and models (Android/iPhone/motherboard).",
      "Target product line: phone farm rack, motherboard box, cooling rack, or custom cabinet.",
      "Shipping country and preferred freight method (express or sea).",
      "Use case: QA lab, device management, SIM testing, or enterprise ops.",
      "Submit via contact form, WhatsApp, or email. Typical reply within one business day.",
    ],
  },
  {
    slug: "after-sales-support",
    title: "After-Sales Support Process",
    category: "Quote & Support",
    excerpt: "Hardware maintenance, replacement parts, and remote diagnostics.",
    body: [
      "12-month hardware support on standard rack products.",
      "Replacement parts available for fans, PSUs, USB hubs, and cables.",
      "Remote diagnostics via WhatsApp or Telegram with photos and logs.",
      "For production farms, discuss maintenance schedule during quote confirmation.",
    ],
  },
  {
    slug: "troubleshooting-usb-drops",
    title: "Troubleshooting USB Drops and Disconnects",
    category: "Troubleshooting",
    excerpt: "Fix unstable ADB connections in dense racks.",
    body: [
      "Replace worn USB cables and verify hub power injection.",
      "Reduce cable length; use powered industrial hubs.",
      "Check for thermal throttling on devices in poorly ventilated racks.",
    ],
  },
];

export function getKBArticle(slug: string) {
  return KB_ARTICLES.find((a) => a.slug === slug);
}
