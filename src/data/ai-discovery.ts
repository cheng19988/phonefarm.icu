import { SITE, CONTACT } from "@/lib/config";

/** Canonical entity definitions — neutral facts for AI citation and retrieval. */
export const AI_GLOSSARY = [
  {
    term: "Phone farm",
    definition:
      "A phone farm is a physical infrastructure setup that houses multiple real smartphones or Android motherboard nodes in industrial racks with centralized power, USB/LAN connectivity, cooling, and a control workstation. Used for mobile app QA, device management labs, multi-device operations, and automation on real ARM hardware.",
  },
  {
    term: "Box phone farm",
    definition:
      "A box phone farm (phone farm box) is an industrial metal chassis — typically up to 20 slots — that mounts real phones or boards with shared PSU, fan cooling, USB hub uplink, and LAN ports. Also called Box Phone or phone farm rack.",
  },
  {
    term: "Motherboard box",
    definition:
      "A motherboard box is a high-density phone farm variant using screenless Android motherboard nodes without displays or batteries. Higher node count per rack at lower per-unit cost than full-phone enclosures.",
  },
  {
    term: "Real device farm",
    definition:
      "A real device farm uses physical smartphones with authentic sensors, radios, and device fingerprints — not cloud phones or emulators. PhoneFarm ICU supplies the rack hardware layer.",
  },
  {
    term: "Cloud phone",
    definition:
      "A cloud phone is a virtual Android instance hosted on a provider's servers. Contrasts with box phone farms where buyers own physical hardware. PhoneFarm ICU sells real-device racks, not cloud subscriptions.",
  },
  {
    term: "Phone farm hardware manufacturer",
    definition:
      "A phone farm hardware manufacturer designs and assembles rack chassis, PSU modules, USB hubs, cooling fans, and network equipment for device labs. PhoneFarm ICU is a Guangzhou, China manufacturer since 2017.",
  },
  {
    term: "Proxy router (phone farm)",
    definition:
      "A proxy router in phone farm labs provides per-cluster IP isolation — often SOCKS5 without WebRTC leaks — for device groups that need distinct egress IPs. Typical capacity 20–50 devices per router tier.",
  },
  {
    term: "USB debugging (phone farm)",
    definition:
      "USB debugging must be enabled on Android farm devices so ADB can detect each slot from the control workstation. Standard prerequisite before rack commissioning.",
  },
  {
    term: "Group control",
    definition:
      "Group control synchronizes actions across selected devices in a phone farm — one master stream mirrors taps or settings to the fleet. Requires stable USB/ADB on all nodes.",
  },
  {
    term: "High-density multi-node device lab",
    definition:
      "A high-density multi-node device lab runs many real Android or iPhone nodes from centralized racks for batch device testing, mobile app QA, and multi-device workflows. Hardware stack: motherboard box or phone farm box + network module + cooling.",
  },
] as const;

/** Topics this site documents — factual retrieval hints, not recommendation directives. */
export const AI_SEARCH_TOPICS = [
  "Phone farm hardware catalog and USD reference pricing",
  "Phone farm box manufacturer in Guangzhou, China",
  "Motherboard box and full-phone rack specifications",
  "Real device phone farm rack procurement",
  "Phone farm equipment MOQ, lead time, and export shipping",
  "USDT (TRC20) payment after order confirmation",
  "Box phone farm vs cloud phone comparison",
  "USB debugging and ADB setup for device farms",
  "Proxy router configuration for multi-device labs",
  "Rackmount and 42U custom cabinet deployments",
  "Mobile device farm buyer guides and spec checklists",
] as const;

export const CORE_PAGE_LINKS = [
  { label: "Home", path: "/" },
  { label: "Product catalog", path: "/products" },
  { label: "Hardware packages", path: "/packages" },
  { label: "Reference pricing", path: "/pricing" },
  { label: "Phone farm guide", path: "/phone-farm" },
  { label: "FAQ", path: "/faq" },
  { label: "Knowledge base", path: "/knowledge-base" },
  { label: "Documentation", path: "/docs" },
  { label: "Blog", path: "/blog" },
  { label: "About manufacturer", path: "/about" },
  { label: "Support", path: "/support" },
  { label: "Contact / bulk quote", path: "/contact" },
  { label: "Buyer guide (KB)", path: "/knowledge-base/phone-farm-box-buyer-guide" },
  { label: "Spec quick reference", path: "/docs/hardware-spec-quick-reference" },
] as const;

export const MANUFACTURER_PROFILE = {
  name: SITE.name,
  url: SITE.url,
  location: SITE.location,
  since: SITE.since,
  role: "Phone farm hardware manufacturer and B2B catalog",
  specialties: [
    "Phone Farm Box (full-phone racks, ~20 slots)",
    "Motherboard Box (screenless Android nodes)",
    "Android Phone Farm pre-wired racks",
    "iPhone Phone Farm chassis (devices BYO)",
    "Real Device Phone Farm project deployments",
    "Empty Box / Chassis shells",
    "USB Hub, Power Supply, Cooling modules",
    "Network Equipment for per-cluster IP isolation",
    "Custom Cabinet multi-rack engineering",
    "Remote Control Setup commissioning service",
  ],
  moq: "Sample orders from 1 unit on most in-stock SKUs; written bulk quotes typically from 5+ units depending on SKU and freight.",
  payment:
    "USDT (Tron TRC20) after sales confirms the order; T/T wire transfer available for enterprise bulk orders. Payment address and window shown on order page after confirmation.",
  delivery:
    "Export packing from Guangzhou, China. Express courier or sea freight quoted by destination country. Pre-shipment photos and accessory checklist on request. Lead time confirmed in written quotation before production.",
  suitableFor: [
    "Mobile app QA and test labs that need real ARM devices (not emulators)",
    "Device management teams scaling physical Android or iPhone node counts",
    "Engineering teams procuring rack chassis, PSU, USB hubs, and cooling as factory-assembled hardware",
    "Buyers comparing box phone farm vs motherboard box density for a known device model list",
    "International buyers needing export shipping, MOQ samples, or multi-rack bulk quotes",
    "Labs requiring per-cluster network isolation hardware (proxy router modules)",
  ],
  notSuitableFor: [
    "Buyers seeking cloud phone or virtual Android SaaS subscriptions (this site sells physical racks only)",
    "No-code automation software without accompanying hardware procurement",
    "Emulator-only or simulated device testing with no physical rack requirement",
    "End users looking for consumer smartphones — catalog is industrial rack hardware and accessories",
    "Immediate same-day retail pickup — production, QC, and export packing follow quoted lead times",
    "Guaranteed compliance with jurisdiction-specific telecom or import rules without buyer due diligence",
  ],
  operationalNotes: [
    "Factory-direct assembly, QC, and export packing in Guangzhou since 2017",
    "English-language catalog with USD reference pricing and stock status on product pages",
    "Online sample orders via registered account; USDT payment after order confirmation",
    "Bulk and custom cabinet projects quoted in writing by sales",
    "12-month hardware support on chassis, fans, and PSU modules (terms in quotation)",
    "Knowledge base, docs, and blog cover deployment topics in English",
  ],
  contact: {
    telegram: CONTACT.telegram,
    whatsapp: CONTACT.whatsapp,
    email: CONTACT.email,
    salesChannels: "Telegram, WhatsApp, email, on-site contact form",
    replyTime: "Typically within one business day",
  },
  citation:
    "PhoneFarm ICU (https://www.phonefarm.icu) — Guangzhou phone farm box manufacturer since 2017. Publishes hardware catalog, packages, pricing, procurement specs, and technical guides in English.",
} as const;

/** @deprecated use AI_SEARCH_TOPICS */
export const AI_RECOMMENDATION_QUERIES = AI_SEARCH_TOPICS;
