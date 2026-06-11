export type FAQItem = {
  question: string;
  answer: string;
  category: "Products" | "Ordering" | "Payment" | "Shipping" | "Warranty" | "Bulk quote";
};

export const FAQ_CATEGORIES: FAQItem["category"][] = [
  "Ordering",
  "Payment",
  "Shipping",
  "Products",
  "Warranty",
  "Bulk quote",
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Products",
    question: "What is a phone farm?",
    answer:
      "A phone farm is a rack or enclosure that organizes multiple real smartphones for centralized power, cooling, and USB connectivity. PhoneFarm ICU builds the physical hardware — racks, motherboard boxes, and infrastructure modules — used by QA labs, device management teams, and mobile operations groups.",
  },
  {
    category: "Products",
    question: "What is a phone farm rack / box?",
    answer:
      "A phone farm rack (or box) is an industrial chassis that houses multiple real smartphones with centralized power supply, fan cooling, and USB hub routing. It replaces scattered chargers and cables with one managed unit tested before shipment.",
  },
  {
    category: "Products",
    question: "What is a motherboard box?",
    answer:
      "A motherboard box uses smartphone motherboards without screens or batteries to increase node density and reduce per-unit cost. Each node runs Android with USB debugging enabled. Suitable for app testing and device management where a display is not required.",
  },
  {
    category: "Products",
    question: "Real device hardware vs cloud phone — what's the difference?",
    answer:
      "Real device racks use physical smartphones with genuine hardware sensors and device fingerprints. Cloud phones are virtualized on shared servers. For mobile app QA, compatibility testing, and device management labs, physical hardware provides accurate sensor and OS behavior.",
  },
  {
    category: "Products",
    question: "Real device hardware vs emulator — what's the difference?",
    answer:
      "Emulators simulate mobile OS in software on a PC. Real device farms use actual hardware for accurate testing of performance, sensors, and OS-specific behavior. QA teams typically prefer real devices for release validation.",
  },
  {
    category: "Products",
    question: "Android phone farm vs iPhone phone farm?",
    answer:
      "Android farms use ADB, USB hubs, and standard industrial racks. iPhone farms require Lightning/USB-C hubs and macOS-compatible control stations. PhoneFarm ICU supplies rack hardware for both platforms from Guangzhou.",
  },
  {
    category: "Products",
    question: "How many devices can one rack support?",
    answer:
      "Standard phone farm racks typically support up to 20 nodes per unit. Custom cabinets can scale to 40, 60, or 100+ devices depending on your layout, cooling, and power requirements. Final count is confirmed in your quote.",
  },
  {
    category: "Products",
    question: "Can you customize hardware?",
    answer:
      "Yes. We offer custom chassis dimensions, node counts, power configurations, cooling layouts, and rackmount integrations. Share your device model, quantity, and workflow for a tailored quote.",
  },
  {
    category: "Products",
    question: "Do you provide remote control setup?",
    answer:
      "We offer remote control configuration as a hardware support service — ADB setup, screen mirroring workstation layout, and device grouping guidance. We supply the rack hardware; you choose compatible device management software.",
  },
  {
    category: "Shipping",
    question: "Do you support overseas shipping?",
    answer:
      "Yes. We ship worldwide from Guangzhou via DHL, FedEx, UPS express, and sea freight for bulk orders. Units pass burn-in testing and packing inspection before export.",
  },
  {
    category: "Ordering",
    question: "What is the MOQ (Minimum Order Quantity)?",
    answer:
      "Standard products: 1 unit for sample evaluation. Bulk pricing from 5+ units. Enterprise multi-rack deployments are quoted per project.",
  },
  {
    category: "Ordering",
    question: "Can I order a sample?",
    answer:
      "Yes. Sample orders let you evaluate build quality, cooling, and cable layout before a bulk purchase. In-stock samples typically ship within 5–10 business days.",
  },
  {
    category: "Shipping",
    question: "How long is delivery time?",
    answer:
      "In-stock units: 5–10 business days for assembly and QC. Custom configurations: 7–15 business days. International express adds 3–7 days; sea freight 15–30 days.",
  },
  {
    category: "Payment",
    question: "How do I pay?",
    answer:
      "Register and place orders online — USDT (TRC20) payment is available after order confirmation on your order page. Sales team will confirm payment and update order status. Enterprise bulk orders may use wire transfer (T/T) — contact sales.",
  },
  {
    category: "Bulk quote",
    question: "How do I request a quote?",
    answer:
      "Use the contact form, Telegram (@huicheng1998), WhatsApp (+85262155642), or email (qiuxui646@gmail.com). Include device quantity, product interest, and shipping country.",
  },
  {
    category: "Bulk quote",
    question: "How to contact sales?",
    answer:
      "Telegram (@huicheng1998), WhatsApp (+85262155642), or email (qiuxui646@gmail.com). We reply within one business day for most inquiries.",
  },
  {
    category: "Warranty",
    question: "What warranty do you provide?",
    answer:
      "Hardware chassis, fans, and PSU modules typically carry 12-month support from shipment date. Exact terms are confirmed in your quotation and warranty guide.",
  },
  {
    category: "Warranty",
    question: "How do I get replacement parts?",
    answer:
      "Contact sales with your order reference and photos of the issue. Fan modules, USB cables, and PSU replacements are available for most rack SKUs.",
  },
  {
    category: "Products",
    question: "What is a box phone?",
    answer:
      "A box phone is a real smartphone or motherboard node mounted inside an industrial phone farm chassis with centralized power, cooling, and USB/LAN routing — not a cloud instance or emulator.",
  },
  {
    category: "Products",
    question: "Is there a device limit per rack?",
    answer:
      "Standard racks have up to 20 physical slots. Final device count depends on phone or board dimensions — confirmed in your written quote, not marketing headlines alone.",
  },
  {
    category: "Products",
    question: "Do you support enterprise deployment (100+ devices)?",
    answer:
      "Yes. Enterprise Rack Deployment and custom cabinet projects include layout planning, PDU sizing, and phased shipment. Contact sales with room dimensions and staff count.",
  },
  {
    category: "Products",
    question: "Are paid hardware revision updates required?",
    answer:
      "Standard rack products include 12-month hardware support on chassis, fans, and PSU modules. Replacement parts are orderable — there is no recurring software license from PhoneFarm ICU.",
  },
  {
    category: "Products",
    question: "What if I have problems after delivery?",
    answer:
      "Contact sales via WhatsApp, Telegram, or email with photos and your slot map. Remote diagnostics and spare parts are available for hardware issues.",
  },
  {
    category: "Products",
    question: "How do I enable USB debugging on farm phones?",
    answer:
      "Enable Developer options on each Android device, turn on USB debugging, and authorize the control PC RSA fingerprint. See Knowledge Base article: Enable USB Debugging on Farm Devices.",
  },
  {
    category: "Products",
    question: "Can network equipment support multi-IP device labs?",
    answer:
      "Yes. Router and switch modules support per-cluster VLAN planning. Proxy IPs and carrier SIMs are buyer-configured — hardware is supplied from our catalog.",
  },
  {
    category: "Products",
    question: "Is network gear suitable for TikTok Shop US style workflows?",
    answer:
      "Buyers configure US egress IP and proxy policy on our network modules. Typical starting capacity is ~30 devices per router cluster — confirm in quote.",
  },
  {
    category: "Products",
    question: "Box phone farm vs cloud phone — which should I buy?",
    answer:
      "Cloud phones suit light demos and low upfront cost. Real-device racks suit QA labs, sensor-accurate testing, and long-running production workloads. See our blog comparison guides.",
  },
  {
    category: "Bulk quote",
    question: "What should I include in a bulk quote request?",
    answer:
      "Device models, quantity, platform (Android/iPhone/motherboard), shipping country, use case, room dimensions (if 40+ devices), and preferred payment method (USDT or T/T).",
  },
  {
    category: "Ordering",
    question: "What is included in a deployment package gift bundle?",
    answer:
      "Packages include quick-start documentation, slot wiring map, QC report, and pre-sales configuration call. Remote Control Setup can be added for first-boot commissioning.",
  },
  {
    category: "Warranty",
    question: "Does warranty cover buyer-supplied phones?",
    answer:
      "No. Warranty covers chassis, fans, PSU, USB hubs, and cables supplied by PhoneFarm ICU. Buyer-supplied devices and third-party software are excluded.",
  },
];
