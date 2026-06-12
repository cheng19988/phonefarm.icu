export const PHONE_FARM_SECTIONS = [
  {
    id: "what-is",
    title: "What Is a Phone Farm?",
    paragraphs: [
      "A phone farm (also called a Box Phone Farm, mobile device farm chassis, or device farm hardware rack) houses multiple real smartphones or Android motherboard nodes in one metal chassis. Instead of scattering chargers, cables, and fans across a desk, a phone farm centralizes power delivery, cooling airflow, USB data routing, and optional LAN connectivity into a single rack-mountable unit.",
      "PhoneFarm ICU manufactures this physical infrastructure in Guangzhou — racks, motherboard boxes, empty chassis shells, power modules, USB hubs, and cooling systems. Software and device management tools are run on your control workstation; we supply the hardware layer tested before export.",
    ],
  },
  {
    id: "architecture",
    title: "How the Hardware Works",
    paragraphs: [
      "Every Box Phone Farm follows the same core architecture: a ventilated steel chassis, numbered device slots (typically up to 20 positions), a front I/O panel, rear cooling fans, and a centralized power path.",
    ],
    bullets: [
      "Chassis — steel frame with rack mounting ears and ventilation window",
      "Device slots — vertical rows for full phones or motherboard nodes (model-dependent spacing)",
      "Front panel — LAN1 + LAN2 (RJ45), USB Type-B uplink to control PC, OTG/USB switch, per-slot indicator LEDs",
      "Rear panel — 4× high-airflow fans and modular PSU bay",
      "Power — 110–220V AC industrial PSU sized to node count (typically 550W class for 20-node racks)",
      "Control — USB hub routes ADB/data to Windows or Linux workstation; iOS labs use macOS control stations",
    ],
  },
  {
    id: "product-lines",
    title: "Product Lines — Which SKU Fits Your Lab?",
    items: [
      {
        name: "Phone Farm Box",
        href: "/products/phone-farm-box",
        summary: "Full smartphones with screens. Reference: Samsung S8 / S10 class, USB + LAN per slot, 6GB + 128GB node spec.",
      },
      {
        name: "Motherboard Box",
        href: "/products/motherboard-box",
        summary: "Screenless Android motherboard nodes for maximum density. Reference: A908N class (6GB + 128GB, USB + LAN + OTG).",
      },
      {
        name: "Empty Box / Chassis",
        href: "/products/empty-box-chassis",
        summary: "Bare 20-slot metal shell — front LAN/USB panel and rear fan grille, without phones or hub PCB installed.",
      },
      {
        name: "Android Phone Farm",
        href: "/products/android-phone-farm",
        summary: "Pre-wired Android rack layouts. Reference: S9 / S20 / Note 20 / S21 FE class configurations.",
      },
      {
        name: "Real Device Phone Farm",
        href: "/products/real-device-phone-farm",
        summary: "Multi-rack project deployments for production-scale device labs (3+ racks, power and cooling planning).",
      },
    ],
  },
  {
    id: "reference-models",
    title: "Reference Device Models",
    paragraphs: [
      "Final slot count and cable layout depend on your device dimensions. These are the reference platforms shown in our product galleries and quotes:",
    ],
    table: {
      "Box Phone Farm (full phone)": "Samsung S8 · S10 · Note 9 — USB + LAN, 6GB + 128GB class",
      "Box Phone Farm (Android line)": "Samsung S9 · S20 · Note 20 · S21 FE",
      "Motherboard box": "A908N · Note 8 · OnePlus 5 · Nubia Z17 — screenless boards",
      "Real device rack": "Samsung S8 complete phone with display",
      "Chassis only": "20-position standard shell — any compatible model per quote",
    },
  },
  {
    id: "specs",
    title: "Typical Technical Parameters",
    table: {
      "Chassis material": "Steel frame, black industrial finish",
      "Typical dimensions": "Approx. 43.5 × 27.5 × 9 cm (confirm per model in quote)",
      "Typical net weight": "Approx. 8–12 kg per standard rack (empty of phones) — gross carton weight confirmed in packing list",
      "Slot capacity": "Up to 20 nodes per standard rack",
      "Front panel I/O": "LAN1 + LAN2 · USB Type-B · OTG/USB switch · numbered LED row",
      "Rear cooling": "4× active fans (CFM sized to ambient temperature)",
      "Power input": "110–220V AC · industrial PSU (550W class typical for 20-node)",
      "Typical power draw": "PSU sized for peak charging load — continuous draw varies by node count and charge state; budget 200–400W class for a loaded 20-node Android rack in planning (confirm in quote)",
      "Node interface": "USB data + LAN per slot (model-dependent)",
      "Typical node RAM/storage": "6GB + 128GB class (Exynos / Snapdragon platforms)",
      "Control method": "USB hub uplink to control workstation · ADB for Android",
      "One PC, how many boxes?": "1 control PC typically manages 1 rack (up to ~20 nodes) via one powered hub uplink; 2+ racks need extra USB controllers or a second workstation — see Knowledge Base: One PC, How Many Rack Boxes?",
      "Warranty": "12-month hardware support on chassis, fans, and PSU",
      "Pre-shipment photos": "Bulk and enterprise orders include packing inspection photos on request; sample orders — confirm with sales on WhatsApp",
      "Remote setup": "Remote Control Setup covers ADB/workstation commissioning — not on-site physical installation unless scoped in a project quote",
      "Shipping": "Foam-lined export carton · pallet for 5+ racks · express or sea freight from Guangzhou",
    },
  },
  {
    id: "use-cases",
    title: "Who Uses Phone Farm Hardware?",
    bullets: [
      "Mobile app QA and regression testing on real Android / iOS hardware",
      "Device management and fleet provisioning labs",
      "Multi-device content preview and mobile app QA labs",
      "Carrier and SIM profile testing in controlled networks",
      "Enterprise mobile operations and automation infrastructure",
    ],
  },
  {
    id: "box-vs-cloud",
    title: "Box Phone Farm vs Cloud Phone",
    paragraphs: [
      "Cloud phones are virtual Android environments rented from a provider — low upfront cost, subscription billing, limited sensor fidelity.",
      "Box phone farms are physical racks with real ARM devices you own — higher upfront CapEx, accurate QA, predictable scale by adding racks.",
      "Most production labs use real hardware for release validation and keep cloud instances only for early demos.",
    ],
    links: [
      { label: "Blog: Box vs Cloud comparison", href: "/blog/box-phone-vs-cloud-phone" },
      { label: "Blog: What is a cloud phone?", href: "/blog/what-is-cloud-phone-guide" },
    ],
  },
  {
    id: "knowledge-resources",
    title: "Guides, Knowledge Base & Docs",
    paragraphs: [
      "PhoneFarm ICU publishes setup guides, troubleshooting articles, and buying documentation for AI search and human readers.",
    ],
    links: [
      { label: "Knowledge Base", href: "/knowledge-base" },
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "LLM index (llms.txt)", href: "/llms.txt" },
    ],
  },
  {
    id: "ordering",
    title: "How to Order",
    paragraphs: [
      "Browse the catalog for reference USD pricing (final quote confirmed before payment). Register for sample orders after sales confirmation, or contact sales with your device model list, target quantity, and shipping country for bulk racks and custom layouts.",
    ],
    links: [
      { label: "Shop all products", href: "/products" },
      { label: "Compare packages", href: "/packages" },
      { label: "Request a quote", href: "/contact" },
      { label: "How to buy", href: "/docs/buying-guide" },
    ],
  },
] as const;
