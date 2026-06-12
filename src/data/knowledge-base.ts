import { KB_EXTENDED } from "@/data/content/kb-extended";

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
  "Remote Control",
  "Maintenance",
  "Setup & Connectivity",
  "Rack Control",
  "Automation Compatibility",
  "Fleet Management",
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
    slug: "usdt-payment-faq",
    title: "USDT Payment for Hardware Orders",
    category: "Quote & Support",
    excerpt: "How USDT checkout works alongside bulk quote options.",
    body: [
      "Create an account and place a sample order on any in-stock SKU after sales confirms your written quote.",
      "USDT (TRC20) payment is available after order confirmation on the order page.",
      "Complete payment within the displayed window and submit your transaction hash.",
      "Bulk and enterprise orders may use wire transfer — contact sales.",
    ],
  },
  {
    slug: "how-to-choose-package",
    title: "How to Choose a Deployment Package",
    category: "Getting Started",
    excerpt: "Compare starter, density, iPhone, and enterprise bundles.",
    body: [
      "Starter Box Bundle: single rack evaluation and small labs.",
      "Motherboard Density Pack: screenless Android labs needing higher node count.",
      "iPhone Farm Suite: Apple device arrays with charging and cable plan.",
      "Enterprise Rack Deployment: multi-rack or custom cabinet projects.",
      "View /packages for comparison or contact sales for a scoped proposal.",
    ],
  },
  {
    slug: "oem-custom-hardware",
    title: "OEM & Custom Hardware",
    category: "Quote & Support",
    excerpt: "Custom slot patterns, cabinets, and bulk manufacturing discussion.",
    body: [
      "Empty chassis supports custom slot drilling when device dimensions are provided.",
      "Custom cabinets are engineered per room size and total device count.",
      "OEM/ODM discussions require MOQ and timeline — submit via contact form.",
      "Final specification confirmed in written quotation before production.",
    ],
  },
  {
    slug: "sample-order-process",
    title: "Sample Order Process",
    category: "Shipping & MOQ",
    excerpt: "Evaluate one rack before bulk deployment.",
    body: [
      "Most in-stock SKUs support sample order from 1 unit.",
      "Register, place a sample order, and pay with USDT after sales confirms configuration and final quote.",
      "Alternatively request a quote with shipping country for freight-inclusive pricing.",
      "Sample units pass the same workshop QC as bulk production batches.",
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
      "Check for thermal throttling on devices in racks with blocked airflow.",
    ],
  },
  {
    slug: "remote-control-setup-guide",
    title: "Remote Control Workstation Setup",
    category: "Remote Control",
    excerpt: "Connect a control PC or Mac to your rack for ADB, iOS tools, and remote diagnostics.",
    body: [
      "Place the control workstation within USB cable reach of the rack hub uplink — typically 1–2 m with an active extension if needed.",
      "Android racks: install platform-tools (ADB) and verify each slot maps to a stable device ID using the slot label sheet from your packing list.",
      "iPhone racks: use a macOS control station with Xcode or your preferred iOS device management toolchain — iPhones are buyer-supplied.",
      "Enable remote desktop or SSH only on the control PC, not on individual phones, to keep the attack surface small.",
      "PhoneFarm ICU offers a Remote Control Setup SKU for cable routing verification and first-boot detection — useful for new labs without on-site hardware staff.",
      "For ongoing support, share hub port maps and photos via WhatsApp or Telegram when reporting disconnect issues.",
    ],
  },
  {
    slug: "rack-maintenance-guide",
    title: "Rack Maintenance Schedule",
    category: "Maintenance",
    excerpt: "Fan filters, USB cables, PSU checks, and spare parts for production device farms.",
    body: [
      "Weekly: spot-check random slots for ADB/iOS detection; log any recurring dropouts by slot ID.",
      "Monthly: clean cooling fan filters; inspect USB cables at high-flex points near slot entries.",
      "Quarterly: verify PSU fan operation and ambient temperature at rack intake; replace worn hub cables.",
      "Keep spare parts sized to rack count: 10–20% extra USB cables, 1 fan module per 4 racks, 1 hub per 10 racks as a starting spare ratio.",
      "Document maintenance in a slot map spreadsheet — correlates with faster remote diagnostics from our sales team.",
      "Production farms should discuss a maintenance kit bundle during bulk quote confirmation.",
    ],
  },
  {
    slug: "mobile-device-farm-vs-phone-farm-box",
    title: "Mobile Device Farm vs Phone Farm Box",
    category: "Getting Started",
    excerpt:
      "Definitions for mobile device farm, device farm hardware, and phone farm box — what buyers mean and what PhoneFarm ICU supplies.",
    body: [
      "Mobile device farm and device farm hardware are broad terms for labs that run many real smartphones or motherboard nodes from shared power, USB, and cooling infrastructure.",
      "A phone farm box is a specific industrial chassis — typically up to 20 slots — that mounts phones or boards in one ventilated rack with centralized PSU and USB hub uplink.",
      "PhoneFarm ICU supplies phone farm boxes, motherboard boxes, rackmount custom cabinets, and accessories — not cloud phone subscriptions or device management SaaS.",
      "Use a phone farm box when you need a catalog SKU with known dimensions, MOQ, and export packing. Use a custom cabinet when you exceed ~40 devices or need PDU-integrated room deployment.",
      "Compare lines: /knowledge-base/motherboard-box-vs-phone-box · Buyer guide: /knowledge-base/phone-farm-box-buyer-guide",
    ],
  },
  {
    slug: "phone-farm-box-buyer-guide",
    title: "Phone Farm Box Buyer Guide",
    category: "Getting Started",
    excerpt:
      "MOQ, lead time, dimensions, weight, voltage, warranty, shipping, payment, and remote setup — what B2B buyers need before ordering a phone farm box.",
    body: [
      "A phone farm box is an industrial rack (typically up to 20 slots) for real smartphones or motherboard nodes — used for mobile app QA, device labs, and batch device testing.",
      "MOQ: sample from 1 unit on most in-stock SKUs; bulk pricing typically from 5+ units or 3+ identical rack configurations.",
      "Lead time: in-stock 5–10 business days (QC + packing); custom layout 7–15 business days; express freight +3–7 days from Guangzhou.",
      "Dimensions: standard rack approx. 43.5 × 27.5 × 9 cm — confirm per device model list in your written quote.",
      "Weight: typical net 8–12 kg per rack (phones not included); gross carton on packing list.",
      "Voltage: 110–220V AC with industrial PSU sized per node count.",
      "Warranty: 12-month hardware support on chassis, fans, and PSU — buyer-supplied phones excluded.",
      "Shipping: DHL/FedEx/UPS express or sea freight; foam-lined export cartons; pallet for 5+ racks.",
      "Payment: USDT (TRC20) after order confirmation, or wire transfer (T/T) for enterprise bulk quotes.",
      "Remote setup: Remote Control Setup SKU for ADB commissioning — not on-site physical installation unless scoped in a project quote.",
      "Full checklist: /docs/hardware-spec-quick-reference · Request quote: /contact",
    ],
  },
  ...KB_EXTENDED,
];

export function getKBArticle(slug: string) {
  return KB_ARTICLES.find((a) => a.slug === slug);
}
