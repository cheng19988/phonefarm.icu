export type DocArticle = {
  slug: string;
  title: string;
  section: string;
  summary: string;
  content: string[];
};

export const DOC_SECTIONS = ["Deployment", "Hardware Specs", "Orders & Payment", "Integration"] as const;

export const DOC_ARTICLES: DocArticle[] = [
  {
    slug: "catalog-overview",
    title: "Product Catalog Overview",
    section: "Deployment",
    summary: "How the PhoneFarm ICU catalog maps to deployment tiers.",
    content: [
      "Products are organized by category: boxes, farms, accessories, and services.",
      "Use Packages for pre-built bundles or pick individual SKUs from Products.",
      "All prices are listed in USD; checkout supports USDT TRC20 for registered users.",
    ],
  },
  {
    slug: "chassis-dimensions",
    title: "Chassis Dimensions and Rack Mounting",
    section: "Hardware Specs",
    summary: "Standard 2U box dimensions and custom cabinet notes.",
    content: [
      "Standard phone farm box: approximately 43.5 × 27.5 × 9 cm.",
      "Custom cabinets support 42U rackmount with integrated PDU and airflow ducts.",
      "Request CAD drawings via contact for data center planning.",
    ],
  },
  {
    slug: "usb-hub-topology",
    title: "USB Hub Topology",
    section: "Hardware Specs",
    summary: "Recommended USB routing for 20-node clusters.",
    content: [
      "One powered industrial hub per 20 nodes is recommended.",
      "Separate data and charging paths where the chassis design allows.",
      "Label each port to device slot for maintenance.",
    ],
  },
  {
    slug: "order-lifecycle",
    title: "Order Lifecycle and Statuses",
    section: "Orders & Payment",
    summary: "Pending, payment, confirmation, and expiry rules.",
    content: [
      "Statuses: Pending, Waiting for Payment, Paid, Confirmed, Cancelled, Expired.",
      "USDT orders expire after 30 minutes if payment is not detected.",
      "Payment verification uses on-chain checks (TronGrid API integration placeholder).",
    ],
  },
  {
    slug: "usdt-payment-fields",
    title: "USDT Payment Fields",
    section: "Orders & Payment",
    summary: "Payment record schema for integrations.",
    content: [
      "Fields: order_id, user_id, product_id, expected_amount, received_amount, payment_address, payment_network, payment_currency, tx_hash, payment_status, expires_at, paid_at, verification_status.",
      "Network: Tron TRC20. Currency: USDT. Minimum: 10 USDT.",
    ],
  },
  {
    slug: "webhook-placeholder",
    title: "Order Webhook (Coming Soon)",
    section: "Integration",
    summary: "Reserved endpoint for ERP and CRM integrations.",
    content: [
      "Enterprise buyers may request webhook notifications for Paid and Confirmed statuses.",
      "Contact sales to register callback URLs and API keys.",
    ],
  },
];

export function getDoc(slug: string) {
  return DOC_ARTICLES.find((d) => d.slug === slug);
}
