export type DocArticle = {
  slug: string;
  title: string;
  section: string;
  summary: string;
  content: string[];
};

export const DOC_SECTIONS = ["Deployment", "Hardware Specs", "Quote & Orders"] as const;

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
      "Payment terms (T/T, Wise, PayPal, or USDT) are agreed after quote acceptance — not via instant checkout.",
    ],
  },
];

export function getDoc(slug: string) {
  return DOC_ARTICLES.find((d) => d.slug === slug);
}
