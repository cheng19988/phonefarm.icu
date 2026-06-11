export type DocArticle = {
  slug: string;
  title: string;
  section: string;
  summary: string;
  content: string[];
};

export const DOC_SECTIONS = [
  "Deployment",
  "Hardware Specs",
  "Quote & Orders",
  "Buying & Payment",
  "API & Integrations",
  "Setup & Connectivity",
] as const;

export const DOC_ARTICLES: DocArticle[] = [
  {
    slug: "catalog-overview",
    title: "Product Catalog Overview",
    section: "Deployment",
    summary: "How the PhoneFarm ICU catalog maps to deployment tiers.",
    content: [
      "Products are organized by category: phone farm racks, motherboard boxes, cooling, power, USB hubs, network modules, and custom cabinets.",
      "Use Packages for pre-built hardware bundles or pick individual SKUs from the Products catalog.",
      "All prices are reference USD amounts. Request a written quote before placing an order.",
    ],
  },
  {
    slug: "chassis-dimensions",
    title: "Chassis Dimensions and Rack Mounting",
    section: "Hardware Specs",
    summary: "Standard rack dimensions and custom cabinet notes.",
    content: [
      "Standard phone farm rack: approximately 43.5 × 27.5 × 9 cm (confirm in quote for your device model).",
      "Custom cabinets support 42U rackmount with integrated PDU and airflow ducts.",
      "Request dimension drawings via the contact form for data center planning.",
    ],
  },
  {
    slug: "usb-hub-topology",
    title: "USB Hub Topology",
    section: "Hardware Specs",
    summary: "Recommended USB routing for multi-device racks.",
    content: [
      "One powered industrial hub per 20 nodes is the typical starting layout.",
      "Separate data and charging paths where the chassis design allows.",
      "Label each port to device slot for maintenance and support.",
    ],
  },
  {
    slug: "quote-and-order-process",
    title: "Quote and Order Process",
    section: "Quote & Orders",
    summary: "How to move from inquiry to confirmed hardware order.",
    content: [
      "Step 1: Submit contact form or WhatsApp inquiry with device quantity and shipping country.",
      "Step 2: Sales team confirms rack/box configuration, accessories, and reference pricing.",
      "Step 3: Written quote issued including freight estimate and lead time.",
      "Step 4: After confirmation, production, QC, packing inspection, and dispatch.",
      "Payment terms (T/T or USDT) are agreed after quote acceptance for bulk orders.",
    ],
  },
  {
    slug: "buying-guide",
    title: "How to Buy Phone Farm Hardware",
    section: "Buying & Payment",
    summary: "Register, browse the shop, place an order, and complete USDT payment.",
    content: [
      "Step 1: Create an account at /register or sign in at /login.",
      "Step 2: Browse /products or /packages and click Buy Now on your chosen SKU.",
      "Step 3: Review the order on /orders/{id} — reference USD price is shown.",
      "Step 4: Pay with USDT (TRC20) within the payment window after order confirmation.",
      "For bulk orders, custom rack layouts, or OEM discussion, use Request Quote or Contact Sales — parallel to online checkout.",
      "Sample orders from 1 unit are available on most in-stock SKUs.",
    ],
  },
  {
    slug: "usdt-payment-guide",
    title: "USDT Payment Guide",
    section: "Buying & Payment",
    summary: "How USDT (TRC20) payment works after order confirmation.",
    content: [
      "USDT payment is available after order confirmation — not the only payment method.",
      "Network: Tron TRC20. Use the payment address shown on your order page only.",
      "Payment window: typically 30 minutes from order creation — complete transfer before expiry.",
      "Minimum amount and contract address are displayed on the order payment page.",
      "After transfer, submit your transaction hash on the order page for verification.",
      "Enterprise bulk orders may use wire transfer (T/T) instead — contact sales.",
    ],
  },
  {
    slug: "shipping-guide",
    title: "Shipping & Export Guide",
    section: "Buying & Payment",
    summary: "Packing, freight, MOQ, and lead times from Guangzhou.",
    content: [
      "In-stock SKUs: typically 5–10 business days for workshop QC and packing before dispatch.",
      "Export packing includes foam-lined cartons, accessory checklists, and packing inspection.",
      "Express courier and sea freight options — freight quoted by destination country.",
      "Import duties and customs are buyer responsibility unless agreed otherwise in bulk quote.",
      "Multi-rack projects may ship on pallet or in phased batches.",
      "Share shipping country and preferred method when ordering or requesting a quote.",
    ],
  },
  {
    slug: "warranty-guide",
    title: "Warranty & After-Sales",
    section: "Buying & Payment",
    summary: "Hardware support, replacement parts, and remote diagnostics.",
    content: [
      "Standard rack products: 12-month hardware support on chassis, fans, and PSU modules.",
      "Replacement parts available: fan modules, USB hubs, PSUs, and cables.",
      "Remote diagnostics via WhatsApp or Telegram with photos and logs.",
      "Warranty does not cover buyer-supplied phones, third-party software, or misuse.",
      "Production farms: discuss maintenance schedule and spare kit sizing during quote.",
    ],
  },
  {
    slug: "rack-configuration-guide",
    title: "Rack Configuration Guide",
    section: "Hardware Specs",
    summary: "Plan slot count, power, cooling, and USB topology for your lab.",
    content: [
      "Start with device model list — dimensions determine slot layout.",
      "One powered industrial USB hub per 10–20 nodes is a typical starting point.",
      "Size PSU against total charging load — avoid consumer-grade daisy-chaining.",
      "Add cooling modules when ambient exceeds 30°C or iPhone charging runs continuously.",
      "Document slot-to-ADB ID map for maintenance.",
    ],
  },
  {
    slug: "bulk-order-process",
    title: "Bulk Order Process",
    section: "Quote & Orders",
    summary: "MOQ, project quotes, and enterprise deployment planning.",
    content: [
      "Bulk pricing typically discussed from 3+ identical rack configurations or 5+ units.",
      "Enterprise projects: share room dimensions, power feed, and total device target.",
      "Written proposal includes layout, accessories, freight, and lead time.",
      "USDT or wire transfer on confirmation — phased shipment available for large orders.",
    ],
  },
  {
    slug: "order-api-placeholder",
    title: "Order & Payment API (Coming Soon)",
    section: "API & Integrations",
    summary: "Planned REST endpoints for programmatic order status and payment confirmation.",
    content: [
      "Status: not yet publicly available. This page documents the intended integration surface for enterprise buyers.",
      "Planned endpoints (subject to change): GET /api/v1/orders/{id} — order status and line items; POST /api/v1/orders/{id}/payment — submit USDT transaction hash for verification.",
      "Authentication will use API keys issued after enterprise account review — contact sales for early access.",
      "Webhooks for payment_confirmed and shipped events are planned for Q3 2026.",
      "Until launch, use the web dashboard at /orders or contact sales for bulk order tracking.",
      "Subscribe to updates by noting API interest in your quote request or contact form.",
    ],
  },
  {
    slug: "usb-debugging-checklist",
    title: "USB Debugging Checklist (Android Labs)",
    section: "Setup & Connectivity",
    summary: "Per-brand steps before connecting devices to a phone farm rack.",
    content: [
      "Enable Developer options: Settings → About → tap Build number 7 times.",
      "Turn on USB debugging in Developer options.",
      "Samsung: enable Install via USB for frequent APK pushes.",
      "Xiaomi/Redmi: enable USB debugging (Security settings); consider disabling MIUI optimization.",
      "Authorize RSA fingerprint on device screen when first connected to control PC.",
      "Label slot ID on rack map after each device is authorized.",
      "Full guide: /knowledge-base/enable-usb-debugging",
    ],
  },
  {
    slug: "otg-lan-setup",
    title: "OTG / LAN Device Connection",
    section: "Setup & Connectivity",
    summary: "Network-attached device modes on phone farm racks.",
    content: [
      "Front panel LAN1/LAN2 support network-based device tooling alongside USB uplink.",
      "Keep control PC and rack on same subnet for reliable discovery.",
      "Document which slots use USB vs LAN path in slot map.",
      "Pair with Network Equipment SKU for per-cluster VLAN isolation.",
      "See /knowledge-base/otg-lan-network-connection",
    ],
  },
  {
    slug: "group-control-hardware-notes",
    title: "Group Control Hardware Prerequisites",
    section: "Setup & Connectivity",
    summary: "Stable USB and slot maps required before synchronized multi-device operations.",
    content: [
      "Group control in device management tools requires stable ADB on all selected nodes.",
      "Replace worn USB cables before enabling fleet-wide mirrored gestures.",
      "Pilot on 1–2 slots before fleet rollout.",
      "PhoneFarm ICU provides slot labels and wiring maps with each rack shipment.",
      "Remote Control Setup service covers first-boot verification.",
    ],
  },
  {
    slug: "proxy-router-lab-guide",
    title: "Proxy Router Lab Topology",
    section: "Hardware Specs",
    summary: "Capacity and wiring for multi-IP device clusters.",
    content: [
      "Typical entry tier: 20–30 devices per router cluster.",
      "Mid tier: ~50 devices with managed switch.",
      "High density projects: mini-PC proxy class quoted per room layout.",
      "Configure SOCKS5 and DNS/MAC policy on buyer side — hardware ships with factory firmware.",
      "Blog: /blog/proxy-router-configuration-lab",
    ],
  },
  {
    slug: "hardware-revision-notes",
    title: "Hardware Revision Notes",
    section: "Deployment",
    summary: "Changelog for rack chassis, fan modules, and PSU revisions.",
    content: [
      "2026-Q2: Cooling module gallery expanded with rear fan bay reference photos.",
      "2026-Q2: iPhone farm chassis documentation — Lightning/USB-C cable plan per quote.",
      "2026-Q1: USB hub module webp asset sync for accessory PDP galleries.",
      "2026-Q1: Package hero images synced from product catalog assets.",
      "Contact sales for serial-specific revision notes on bulk orders.",
    ],
  },
  {
    slug: "compatibility-adb-tools",
    title: "ADB & Device Management Tool Compatibility",
    section: "Deployment",
    summary: "Third-party software compatibility statement for rack hardware.",
    content: [
      "PhoneFarm ICU supplies hardware — not device management SaaS licenses.",
      "Racks are tested for standard ADB USB paths on Windows, Linux, and macOS (iOS labs).",
      "Compatible with common scrcpy, MDM, and CI deploy tools that support USB debugging.",
      "Inspector/automation locators should be validated on real devices in your rack, not emulators only.",
      "Remote Control Setup SKU helps map tools to your slot layout.",
    ],
  },
];

export function getDoc(slug: string) {
  return DOC_ARTICLES.find((d) => d.slug === slug);
}
