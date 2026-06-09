export type ProductSeed = {
  slug: string;
  name: string;
  category: string;
  productLine: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  scenarios: string[];
  accessories: string[];
  delivery: string[];
  maintenance: string[];
  compatibilityNotes: string[];
  moqNotes: string;
  packingNotes: string[];
  afterSales: string[];
  quoteGuidance: string;
  faq: { q: string; a: string }[];
  priceUsd: number;
  stock: number;
  imageCard: string;
  imageHero: string;
  imageDetail: string;
};

function product(data: ProductSeed): ProductSeed {
  return data;
}

/** Synced assets under public/images/products/{slug}/ — list and PDP use the same files. */
function syncedImages(slug: string, ext: "png" | "webp" = "png") {
  const base = `/images/products/${slug}`;
  return {
    imageCard: `${base}/card.${ext}`,
    imageHero: `${base}/hero.${ext}`,
    imageDetail: `${base}/gallery-1.${ext}`,
  };
}

export const PRODUCT_SEEDS: ProductSeed[] = [
  product({
    slug: "phone-farm-box",
    name: "Phone Farm Box",
    category: "Phone Farm Box",
    productLine: "rack-systems",
    shortDesc: "Industrial rack enclosure for mounting multiple real smartphones with shared power, cooling, and USB routing.",
    description:
      "The Phone Farm Box is our standard rack chassis for teams deploying full Android or mixed-device arrays. Slots accept complete phones with screens — suitable when your workflow needs cameras, sensors, and on-device displays. Final slot count, cable length, and PSU rating are confirmed against your phone model list during quoting.",
    features: [
      "Metal chassis with labeled device slots",
      "Centralized power bus — no per-phone wall chargers",
      "Active fan airflow across the device row",
      "Single USB uplink to control workstation",
      "Burn-in tested before export packing",
    ],
    specs: {
      "Product type": "Full-phone rack enclosure (Box Phone Farm)",
      "Reference models": "Samsung S8 / S10 class — configurable per order",
      "Node interface": "USB + LAN port per slot",
      "Typical node spec": "6GB RAM + 128GB storage class (model-dependent)",
      "Typical capacity": "10–20 device slots per rack (layout confirmed in quote)",
      "Chassis material": "Steel frame with ventilated panels",
      "Power input": "110–220V AC (region-specific cable supplied)",
      "Cooling": "Integrated active fan module",
      "Control uplink": "USB hub to control workstation",
      "Dimensions": "Confirmed per phone model list before production",
    },
    scenarios: [
      "Mobile app QA and regression testing on real hardware",
      "Social media agency device banks for content preview workflows",
      "Cross-OS version compatibility testing",
      "Device management infrastructure for enterprise mobile ops",
    ],
    accessories: [
      "Rack chassis with fan module",
      "Region-specific power cable",
      "USB uplink cable",
      "Slot label sheet and wiring map",
      "Quick-start deployment guide",
    ],
    delivery: [
      "Cable routing and power bus check at workshop",
      "Burn-in run before packing",
      "Foam-lined export carton with accessory checklist",
      "Express or sea freight arranged after quote confirmation",
    ],
    maintenance: [
      "Inspect fan airflow monthly in production environments",
      "Replace worn USB cables when ADB disconnects increase",
      "Keep rack intake clear — avoid stacking cartons against vents",
    ],
    compatibilityNotes: [
      "Share phone make, model, and connector type (USB-C / Micro-USB) for slot and cable matching",
      "Phone dimensions determine final slot count — not all 20-slot layouts fit every model",
      "Works with common ADB-based device management tools — software not included",
    ],
    moqNotes: "Sample order from 1 unit. Bulk rack pricing typically discussed from 3+ identical configurations.",
    packingNotes: [
      "Each rack ships with accessory checklist inside the carton",
      "Heavy units may ship on pallet for 5+ rack orders",
      "Import duties and freight quoted separately by destination country",
    ],
    afterSales: [
      "12-month hardware support on chassis, fans, and PSU",
      "Replacement fan modules and USB cables available",
      "Remote layout review via WhatsApp photos if cable routing issues arise",
    ],
    quoteGuidance: "Include device model list, target quantity per rack, shipping country, and whether phones are customer-supplied or sourced locally.",
    faq: [
      { q: "Do you supply the phones?", a: "This SKU is the rack hardware. Most buyers supply their own phones. We can advise on slot compatibility for your models." },
      { q: "How many phones fit one box?", a: "Depends on phone size. Share your model list — we confirm slot layout in the written quote." },
    ],
    priceUsd: 699,
    stock: 15,
    ...syncedImages("phone-farm-box"),
  }),

  product({
    slug: "motherboard-box",
    name: "Motherboard Box",
    category: "Motherboard Box",
    productLine: "motherboard-systems",
    shortDesc: "Screenless Android motherboard chassis for high-density device labs without full phone shells.",
    description:
      "The Motherboard Box mounts smartphone motherboards without displays or batteries into a cooled metal frame with centralized power delivery. It reduces per-node cost and footprint compared to full-phone racks — common in Android QA labs and device management teams that do not need on-device screens during daily operation.",
    features: [
      "Screenless motherboard node mounting",
      "Centralized PSU replaces individual battery charging",
      "Higher node density than full-phone racks",
      "ADB-accessible via USB hub routing",
      "Workshop assembly with thermal spot-check",
    ],
    specs: {
      "Product type": "Motherboard box (screenless Android nodes)",
      "Reference platform": "A908N class — 6GB + 128GB, USB + LAN + OTG",
      "Node type": "Black circuit board mounting without display/battery",
      "Typical capacity": "15–20 motherboard nodes per chassis",
      "Power": "Industrial centralized PSU",
      "Cooling": "Multi-fan airflow across motherboard row",
      "Connectivity": "USB hub with per-node data path",
      "Chassis": "Approx. 43.5 × 27.5 × 9 cm reference size",
      "Compatible boards": "Note 8 / OnePlus 5 / Nubia Z17 class — confirm before order",
    },
    scenarios: [
      "Android app automation in headless device labs",
      "High-density mobile testing without display output",
      "Device management fleet provisioning",
      "SIM profile and carrier testing in controlled lab networks",
    ],
    accessories: [
      "Motherboard chassis with cooling fans",
      "Centralized PSU and power harness",
      "USB hub module",
      "Motherboard slot mounting hardware",
      "Wiring diagram and ADB setup notes",
    ],
    delivery: [
      "Motherboard slot alignment check before shipment",
      "Thermal spot-check under load",
      "Export packing with anti-static wrapping on hub modules",
    ],
    maintenance: [
      "Re-seat USB connections if a node drops from ADB",
      "Clean fan intakes every 30 days in dusty environments",
      "Temporary screen attachment may be needed for lost USB authorization — plan spare cables",
    ],
    compatibilityNotes: [
      "Motherboard make and model must be shared before quoting — slot spacing is not universal",
      "SIM tray support varies by board — specify if SIM lab testing is required",
      "Not suitable for iOS — Android motherboard deployments only",
    ],
    moqNotes: "1 unit for evaluation. Density-pack pricing from 2+ boxes on the same board specification.",
    packingNotes: [
      "Chassis and hub packed separately within one carton for shock protection",
      "Bulk motherboard box orders may share one pallet shipment",
    ],
    afterSales: [
      "Fan and PSU replacement parts stocked for standard builds",
      "Remote guidance for node re-seating and hub power issues",
    ],
    quoteGuidance: "Send motherboard model numbers, target node count, and whether SIM trays are required for your lab workflow.",
    faq: [
      { q: "Can I use this without screens permanently?", a: "Yes — designed for headless operation. Occasional screen attach may be needed for USB debugging authorization recovery." },
      { q: "Is this the same as a phone farm rack?", a: "No — this uses bare motherboards for density. Choose a Phone Farm Box if you need full phones with displays." },
    ],
    priceUsd: 1680,
    stock: 8,
    ...syncedImages("motherboard-box"),
  }),

  product({
    slug: "android-phone-farm",
    name: "Android Phone Farm",
    category: "Android Phone Farm",
    productLine: "rack-systems",
    shortDesc: "Pre-configured Android device rack — chassis, power routing, and USB layout for Samsung/Huawei-class phones.",
    description:
      "This bundle targets teams standardizing on Android phone arrays for testing or device management. It combines rack hardware with workshop wiring for a specific Android device class. Device models are not bundled — buyers typically supply phones or specify models for slot fitting during the quote stage.",
    features: [
      "Android-focused slot and cable layout",
      "Pre-wired USB paths tested at workshop",
      "Compatible with ADB device management stacks",
      "Suited for Samsung / Huawei common form factors — confirm others in quote",
      "Includes deployment checklist for Android labs",
    ],
    specs: {
      "Product type": "Android full-phone rack (Box Phone Farm)",
      "Reference models": "Samsung S9 / S20 / Note 20 / S21 FE class",
      "Node interface": "USB + LAN per slot",
      "Typical node spec": "6GB RAM + 128GB storage class (model-dependent)",
      "Rack type": "Full-phone enclosure with active cooling",
      "Typical capacity": "10–20 devices per rack — layout confirmed in quote",
      "Control link": "USB hub to Windows or Linux control station",
      "Software": "Buyer-selected ADB tools — not included",
    },
    scenarios: [
      "Android app QA across multiple OS builds",
      "Enterprise Android device fleet staging",
      "Hardware deployment for mobile testing environments",
      "Agency infrastructure for Android content device banks",
    ],
    accessories: [
      "Android-configured rack chassis",
      "USB hub matched to Android connector mix",
      "Power harness and fan module",
      "Android ADB quick-start sheet",
    ],
    delivery: [
      "Per-slot cable labeling for Android connector types",
      "Workshop functional test without buyer phones (hub and power only)",
      "Packing list includes connector-type map",
    ],
    maintenance: [
      "Track Android OS updates that affect ADB authorization",
      "Rotate USB cables showing intermittent connect flags",
    ],
    compatibilityNotes: [
      "List every Android model and connector type before ordering",
      "Mixed connector racks need explicit quote line for cable kit",
      "Google Play Services-dependent apps should be tested on your target OS build",
    ],
    moqNotes: "Single-rack sample available. Multi-rack Android lab quotes from 3+ units.",
    packingNotes: ["Ships as one rack unit per carton unless bulk pallet agreed in quote"],
    afterSales: ["Android-specific cable kit replacements", "Remote ADB connectivity troubleshooting"],
    quoteGuidance: "Provide Android model list, quantity per rack, and control PC OS (Windows/Linux).",
    faq: [
      { q: "Are phones included?", a: "No — this is rack hardware configured for Android phones you supply or source." },
    ],
    priceUsd: 517,
    stock: 20,
    ...syncedImages("android-phone-farm"),
  }),

  product({
    slug: "iphone-phone-farm",
    name: "iPhone Phone Farm",
    category: "iPhone Phone Farm",
    productLine: "rack-systems",
    shortDesc: "Rack hardware for real iPhone arrays — Lightning/USB-C routing, charging bus, and iOS lab layout.",
    description:
      "The iPhone Phone Farm rack is wired for Apple device form factors with centralized charging and hub paths suited to iOS QA workflows. iPhones are customer-supplied. Final layout depends on iPhone generation (Lightning vs USB-C) and whether a macOS control station is part of your lab design.",
    features: [
      "iPhone slot layout with generation-specific cable plan",
      "Centralized charging bus",
      "macOS control station compatibility (buyer-provided Mac)",
      "Suited for TestFlight and iOS build validation",
      "Workshop cable routing test before shipment",
    ],
    specs: {
      "Product type": "iOS lab rack — Lightning / USB-C routing for real iPhones",
      "Gallery note": "Photos show compact rack chassis layout; iPhone models quoted per your list",
      "Platform": "Apple iPhone (customer-supplied)",
      "Typical capacity": "10–16 devices — model and cable type dependent",
      "Connectors": "Lightning and/or USB-C per quote",
      "Control": "macOS workstation recommended",
      "Chassis": "Ventilated metal frame with centralized charging bus",
    },
    scenarios: [
      "iOS app QA and TestFlight distribution testing",
      "iPhone device management lab infrastructure",
      "Mobile testing environment for iOS build matrices",
      "Agency hardware for iOS content preview devices",
    ],
    accessories: [
      "iPhone rack chassis",
      "Generation-matched charging and data cables",
      "Fan cooling module",
      "iOS lab wiring diagram",
    ],
    delivery: [
      "Cable plan documented for your iPhone generation mix",
      "Charging bus voltage check at workshop",
      "Export packing with cable coil separators",
    ],
    maintenance: [
      "iOS updates may require re-trust on control Mac — plan maintenance window",
      "Inspect Lightning/USB-C tips for wear quarterly",
    ],
    compatibilityNotes: [
      "Specify exact iPhone models and iOS versions in quote request",
      "macOS control hardware not included",
      "Mixed Lightning and USB-C generations need separate cable kit line items",
    ],
    moqNotes: "1 rack sample for lab evaluation. Multi-rack iOS labs quoted per project.",
    packingNotes: ["Cables packed in labeled bags per slot range"],
    afterSales: ["iPhone-specific cable replacements", "Remote guidance on charging bus issues"],
    quoteGuidance: "List iPhone models, quantity, macOS version, and shipping destination.",
    faq: [
      { q: "Do I need a Mac?", a: "Most iOS lab workflows use a macOS control station. We supply rack hardware only." },
    ],
    priceUsd: 1280,
    stock: 5,
    ...syncedImages("iphone-phone-farm"),
  }),

  product({
    slug: "real-device-phone-farm",
    name: "Real Device Phone Farm",
    category: "Real Device Phone Farm",
    productLine: "rack-systems",
    shortDesc: "Multi-rack reference deployment — full-phone hardware foundation for production-scale device labs.",
    description:
      "This SKU represents a production-oriented real-device deployment: typically multiple phone farm racks, power distribution, and cooling planned together. It is quoted as a project rather than a single carton — suitable when you are moving from pilot racks to a dedicated device lab room.",
    features: [
      "Multi-rack layout planning included in quote",
      "Real smartphones — not cloud or emulator infrastructure",
      "Power and cooling budget documented per room",
      "Mix of Android and iPhone racks possible — scoped in proposal",
      "Packing and freight planned for large shipments",
    ],
    specs: {
      "Product type": "Full-phone rack with real device slots (Box Phone)",
      "Reference model": "Samsung S8 class — USB + LAN, 6GB + 128GB",
      "Scope": "Project-based — rack count defined in quote",
      "Device type": "Complete smartphones with screen (buyer-supplied typical)",
      "Infrastructure": "Racks + optional power/cooling/network modules",
      "Control": "Buyer workstation and network design",
    },
    scenarios: [
      "Production mobile testing environment build-out",
      "Enterprise device management operations center",
      "Multi-team QA lab with dedicated rack rows",
      "Social media agency infrastructure at scale",
    ],
    accessories: [
      "Scoped per written proposal — racks, hubs, PSUs, cables",
      "Room layout and power budget summary",
      "Packing plan for multi-carton or pallet shipment",
    ],
    delivery: [
      "Phased shipment option for large projects",
      "Pre-shipment checklist signed per rack batch",
      "On-request remote walkthrough of rack placement plan",
    ],
    maintenance: [
      "Annual fan and cable audit recommended for 50+ device labs",
      "Spare cable kit sizing discussed at quote stage",
    ],
    compatibilityNotes: [
      "Full device model inventory required before project quote",
      "Room power capacity (amps / kW) should be shared for PDU planning",
      "Network segmentation design is buyer responsibility unless network module added",
    ],
    moqNotes: "Project quotes typically start at 3+ racks or equivalent device count. Pilot single-rack orders use standard Phone Farm Box SKU.",
    packingNotes: [
      "Multi-carton shipments with master packing list",
      "Sea freight common for 10+ rack projects",
    ],
    afterSales: [
      "Project-level support contact for multi-rack deployments",
      "Replacement parts orderable per rack serial notes in packing list",
    ],
    quoteGuidance: "Describe target device count, room photo or dimensions, device models, and go-live timeline.",
    faq: [
      { q: "Is this one product or a project?", a: "A scoped deployment project. We combine catalog SKUs into one proposal with layout and freight." },
    ],
    priceUsd: 998,
    stock: 12,
    ...syncedImages("real-device-phone-farm"),
  }),

  product({
    slug: "empty-box-chassis",
    name: "Empty Box / Chassis",
    category: "Empty Box / Chassis",
    productLine: "rack-systems",
    shortDesc: "Bare rack frame for custom wiring, expansion, or integrating buyer-supplied hub and PSU modules.",
    description:
      "The empty chassis ships as a ventilated metal frame without pre-installed hub or PSU — for engineers extending an existing farm or building a custom slot layout. Workshop can pre-drill slot patterns if device dimensions are provided in the quote.",
    features: [
      "Bare metal frame — bring your own hub/PSU or add catalog modules",
      "Expansion unit for existing PhoneFarm ICU racks",
      "Optional pre-drilled slot pattern per device dimensions",
      "Lower entry cost for custom lab experiments",
      "Same export QC on frame integrity and vent alignment",
    ],
    specs: {
      "Product type": "Bare chassis / empty box frame",
      "Reference layout": "S10-class slot spacing — structure diagram included",
      "Contents": "Chassis frame and panels — no hub/PSU included",
      "Material": "Steel with ventilation cutouts",
      "Slot pattern": "Standard or custom — confirmed in quote",
      "Add-on modules": "USB hub, PSU, cooling sold separately",
    },
    scenarios: [
      "Custom lab experiments with non-standard device sizes",
      "Expansion frame matching existing farm mounting",
      "Engineering teams integrating third-party hub/PSU",
      "Staged build — chassis first, modules later",
    ],
    accessories: [
      "Chassis frame and side panels",
      "Mounting hardware kit",
      "Ventilation fan cutout cover (fan optional add-on)",
      "Dimension drawing after slot pattern confirmation",
    ],
    delivery: [
      "Frame squareness and vent alignment check",
      "Flat-pack option for sea freight on 5+ units",
    ],
    maintenance: [
      "When adding modules later, re-run power budget calculation",
      "Torque check on frame bolts after international freight",
    ],
    compatibilityNotes: [
      "Provide device outline drawings for custom slot drilling",
      "Verify hub and PSU catalog SKUs match mounting points before ordering chassis only",
    ],
    moqNotes: "1 unit for prototyping. 5+ empty chassis for expansion rows.",
    packingNotes: ["Flat-pack reduces freight volume — assembly required on site"],
    afterSales: ["Frame bolt and panel replacement parts available"],
    quoteGuidance: "State whether you need standard or custom slot pattern and which modules you will add later.",
    faq: [
      { q: "Does this include USB or power?", a: "No — chassis only. Add USB Hub and Power Supply SKUs or use your own compatible modules." },
    ],
    priceUsd: 280,
    stock: 25,
    ...syncedImages("empty-box-chassis"),
  }),

  product({
    slug: "usb-hub",
    name: "USB Hub Solution",
    category: "USB Hub",
    productLine: "connectivity",
    shortDesc: "Powered industrial USB hub for stable multi-device data paths in phone farm racks.",
    description:
      "This hub module is sized for rack deployments where each phone or motherboard node needs a reliable USB data connection to the control workstation. Hub tier (USB 2.0 vs 3.0, port count, power injection) is matched to your node count during quoting — not all hubs fit every rack chassis without adapter bracket.",
    features: [
      "Powered hub — reduces phone-draw overload on PC ports",
      "Industrial-grade PCB suited to continuous lab use",
      "Port labeling compatible with rack slot maps",
      "Replacement module for worn hubs in production farms",
      "Tested for continuous connect before shipment",
    ],
    specs: {
      "Type": "Powered industrial USB hub module",
      "Port count": "Matched to rack node count in quote — commonly 10–20 ports",
      "USB generation": "2.0 or 3.0 per bandwidth requirement",
      "Power injection": "Dedicated PSU input on hub — confirm wattage in quote",
      "Mounting": "Rack bracket or shelf mount — chassis dependent",
    },
    scenarios: [
      "Replacing failed hub in existing phone farm rack",
      "Expanding data paths when adding nodes to chassis",
      "USB topology upgrade for faster APK push in QA labs",
      "Spare hub inventory for production device labs",
    ],
    accessories: [
      "USB hub module",
      "Hub power cable",
      "Mounting bracket (if applicable to your chassis)",
      "Port label sticker set",
    ],
    delivery: [
      "Port continuity test at workshop",
      "Packed in anti-static bag inside rigid inner box",
    ],
    maintenance: [
      "Replace hub if multiple ports fail simultaneously — often power injection issue",
      "Avoid consumer-grade unpowered hubs downstream of this module",
    ],
    compatibilityNotes: [
      "Share rack model and node count so we match port count and mount",
      "Long cable runs may need USB 3.0 tier — note distance in quote",
    ],
    moqNotes: "1 unit as spare or upgrade. 5+ hubs for multi-rack lab stocking.",
    packingNotes: ["Small carton — often bundled with rack orders to save freight"],
    afterSales: ["Hub swap under hardware support if defect confirmed within warranty window"],
    quoteGuidance: "Include rack SKU, node count, USB generation need, and cable run length.",
    faq: [
      { q: "Will any hub work in your racks?", a: "We recommend catalog hubs tested with our chassis mount pattern. Third-party hubs may fit but are not pre-validated." },
    ],
    priceUsd: 89,
    stock: 50,
    ...syncedImages("usb-hub", "webp"),
  }),

  product({
    slug: "power-supply-solution",
    name: "Power Supply Solution",
    category: "Power Supply",
    productLine: "cooling-power",
    shortDesc: "Industrial PSU module sized for rack power budgets — replaces scattered phone chargers.",
    description:
      "Centralized power supply units feed the rack power bus instead of individual wall adapters. Wattage and output harness are selected against your node count and charging profile during quoting. Wrong PSU sizing is a common cause of thermal shutdown in dense labs — we document recommended load in the quote sheet.",
    features: [
      "Industrial PSU — not consumer laptop brick",
      "Output harness matched to rack bus design",
      "Input 110–220V with region-specific plug",
      "Load guidance documented in quote",
      "Bench tested before shipment",
    ],
    specs: {
      "Type": "Rack-mounted industrial PSU module",
      "Output power": "Sized per quote — typical range 300–600W class",
      "Input": "110–220V AC",
      "Harness": "Bus connector matched to PhoneFarm ICU chassis",
      "Cooling": "Internal PSU fan — ensure rack vent clearance",
    },
    scenarios: [
      "Upgrading PSU on expanded rack",
      "Replacing failed power module in production farm",
      "New rack build with documented power budget",
      "Custom cabinet PDU feeder module",
    ],
    accessories: [
      "PSU module",
      "Input power cable (region-specific)",
      "Output harness to rack bus",
      "Load rating label",
    ],
    delivery: [
      "No-load and rated-load bench check",
      "Harness pinout diagram in carton",
    ],
    maintenance: [
      "Do not exceed documented node count without re-quote for higher PSU",
      "Inspect harness for heat discoloration annually",
    ],
    compatibilityNotes: [
      "PSU must pair with chassis bus design — share rack SKU when ordering PSU alone",
      "Mixed charging profiles (fast charge phones) need explicit note in quote",
    ],
    moqNotes: "1 unit spare or 1 per rack. Bulk PSU for cabinet projects quoted separately.",
    packingNotes: ["PSU in rigid inner foam — weight noted for freight calculation"],
    afterSales: ["PSU replacement under hardware support policy"],
    quoteGuidance: "Provide rack model, node count, and phone charging spec if known.",
    faq: [
      { q: "Can I use my own PSU?", a: "Possible for empty chassis builds — we do not validate third-party PSU safety or pinout." },
    ],
    priceUsd: 120,
    stock: 40,
    ...syncedImages("power-supply-solution", "webp"),
  }),

  product({
    slug: "cooling-solution",
    name: "Cooling Solution",
    category: "Cooling",
    productLine: "cooling-power",
    shortDesc: "Fan cooling rack module and airflow accessories for dense phone farm deployments.",
    description:
      "Cooling modules add or replace fan airflow in phone farm racks and custom cabinets. Fan count and CFM target depend on ambient room temperature and device heat output — we use conservative defaults in quotes and flag when dedicated room AC is recommended.",
    features: [
      "Active fan module for rack intake/exhaust",
      "Replaceable fan units",
      "Filter screen for dust management",
      "Thermal layout notes for your rack row",
      "Noise level suitable for workshop/lab — not data-center spec",
    ],
    specs: {
      "Type": "Rack fan cooling module",
      "Fan count": "Typically 2–4 fans — scaled in quote",
      "Mounting": "PhoneFarm ICU rack standard mount or cabinet slot",
      "Filter": "Removable dust screen",
      "Noise": "Lab environment level — exact dB not certified",
    },
    scenarios: [
      "Adding cooling to empty chassis or older rack",
      "Replacing worn fans in high-uptime labs",
      "Supplementing airflow in warm climate deployments",
      "Custom cabinet duct feed module",
    ],
    accessories: [
      "Fan module assembly",
      "Mounting screws and bracket",
      "Filter screen",
      "Cleaning interval sticker",
    ],
    delivery: [
      "Fan spin and vibration check",
      "Rotation direction label on housing",
    ],
    maintenance: [
      "Clean filter every 30 days in dusty labs",
      "Replace fan bearing if vibration increases",
      "Room ambient above 30°C may need HVAC upgrade beyond rack fans",
    ],
    compatibilityNotes: [
      "Share rack or cabinet SKU for mount compatibility",
      "iPhone racks with continuous charging generate more heat — note in quote",
    ],
    moqNotes: "1 module per rack upgrade. Multi-fan kits for cabinet projects.",
    packingNotes: ["Fan blades locked for transit — remove transport clip on install"],
    afterSales: ["Individual fan replacement units available"],
    quoteGuidance: "Include rack type, room temperature range, and device count.",
    faq: [
      { q: "Is this enough cooling for any room?", a: "Rack fans assist airflow — they do not replace room HVAC in hot environments." },
    ],
    priceUsd: 65,
    stock: 45,
    ...syncedImages("cooling-solution", "webp"),
  }),

  product({
    slug: "network-equipment",
    name: "Network Equipment",
    category: "Network",
    productLine: "connectivity",
    shortDesc: "Router and switch modules for per-cluster network isolation in device and SIM labs.",
    description:
      "Network modules support stable connectivity when each device group needs isolated IP space — common in SIM testing labs and enterprise device management networks. Exact router/switch model tier is selected for your country plug, port count, and VLAN needs in the quote — not a consumer home router repackaged.",
    features: [
      "Industrial-tier router or switch option per quote",
      "Suited to per-cluster VLAN planning",
      "Mount shelf for rack-side installation",
      "Configuration notes for device lab topology",
      "SIM lab use: hardware only — no carrier provisioning service",
    ],
    specs: {
      "Type": "Router / switch module (tier per quote)",
      "Ports": "Matched to cluster size — often 8–24 port class",
      "Mounting": "Rack shelf or cabinet bracket",
      "Power": "Separate adapter — included per quote line",
      "Firmware": "Factory default — buyer configures VLAN/policy",
    },
    scenarios: [
      "SIM and carrier profile testing lab networks",
      "Per-client VLAN isolation for agency device banks",
      "Enterprise device management network segmentation",
      "Adding network capacity to expanded rack row",
    ],
    accessories: [
      "Router or switch unit per quote",
      "Power adapter",
      "Rack shelf (if applicable)",
      "Topology planning one-pager",
    ],
    delivery: [
      "Power-on test at workshop",
      "Default firmware — no pre-configuration of buyer policies",
    ],
    maintenance: [
      "Document IP map per device group",
      "Firmware updates per vendor schedule — buyer responsibility",
    ],
    compatibilityNotes: [
      "Specify country, port count, and whether managed switch is required",
      "SIM lab workflows need hardware only — carrier SIMs supplied by buyer",
      "Does not include SIM bank appliance — discuss SIM tray hardware via motherboard box quote",
    ],
    moqNotes: "1 unit per cluster. Spare network modules for 5+ rack labs.",
    packingNotes: ["Retail box inside export carton with adapter compartment"],
    afterSales: ["Hardware swap for DOA units — configuration support is best-effort remote"],
    quoteGuidance: "Describe device count per VLAN, country, and whether SIM lab isolation is the goal.",
    faq: [
      { q: "Do you sell SIM banks?", a: "We supply network hardware for lab isolation. SIM tray support depends on motherboard/device choice — ask in compatibility check." },
    ],
    priceUsd: 150,
    stock: 30,
    ...syncedImages("network-equipment", "webp"),
  }),

  product({
    slug: "custom-cabinet",
    name: "Custom Cabinet",
    category: "Custom Cabinet",
    productLine: "cooling-power",
    shortDesc: "Floor-standing or rackmount cabinet engineered for multi-rack phone farm labs.",
    description:
      "Custom cabinets integrate multiple phone farm racks, PDU feeds, cooling ducts, and cable management into one floor-standing or 42U-class structure. Every cabinet is quote-engineered — no stock one-size configuration. Suitable when device count exceeds what loose racks on shelves can safely power and cool.",
    features: [
      "Engineered layout per device count and room size",
      "Integrated PDU and cable management plan",
      "Ducted cooling path option",
      "Modular tray system for rack insertion",
      "Written layout drawing before production",
    ],
    specs: {
      "Form": "Floor-standing or 42U rackmount — per project",
      "Capacity": "Defined in proposal — often 40–100+ device positions",
      "Power": "PDU design matched to total load study",
      "Cooling": "Ducted fan path or room HVAC coordination",
      "Lead time": "Longer than single rack — typically 2–4 weeks production",
    },
    scenarios: [
      "Enterprise mobile ops center build-out",
      "Dedicated device lab room with single cabinet row",
      "Multi-team QA facility with centralized cable management",
      "Large agency infrastructure consolidation",
    ],
    accessories: [
      "Cabinet frame and panels per drawing",
      "PDU and tray modules as scoped",
      "Cable management hardware",
      "Layout drawing and load summary",
    ],
    delivery: [
      "Pre-shipment photo checklist",
      "Pallet or crated sea freight typical",
      "Optional on-site layout review call before production lock",
    ],
    maintenance: [
      "Annual PDU torque and cable tray inspection",
      "Cabinet airflow path must stay unobstructed",
    ],
    compatibilityNotes: [
      "Room dimensions, power feed amps, and device inventory required before engineering",
      "Combines catalog racks and modules — not a software product",
    ],
    moqNotes: "One cabinet per project quote. Not available as impulse single-unit checkout.",
    packingNotes: [
      "Crated shipment for international freight",
      "Multiple customs HS codes possible — freight forwarder details in quote",
    ],
    afterSales: [
      "Project contact for cabinet structural issues",
      "Tray and PDU parts orderable by drawing reference",
    ],
    quoteGuidance: "Send room dimensions, power feed photo, total device target, and timeline.",
    faq: [
      { q: "Can I buy a standard 42U cabinet off the shelf?", a: "Each unit is scoped to your rack count and cooling plan — request engineering quote." },
    ],
    priceUsd: 2500,
    stock: 3,
    ...syncedImages("custom-cabinet", "webp"),
  }),

  product({
    slug: "remote-control-setup",
    name: "Remote Control Setup",
    category: "Remote Control",
    productLine: "connectivity",
    shortDesc: "Workshop service to configure device management workstation layout, ADB paths, and screen mirroring for your rack.",
    description:
      "Remote Control Setup is a pre-sales and post-delivery hardware support service — not a software subscription. Our team helps map USB paths, ADB authorization flow, and multi-monitor workstation layout for your existing or new PhoneFarm ICU rack. Buyer provides control PC and management software licenses.",
    features: [
      "ADB path verification across all nodes",
      "Workstation monitor layout recommendation",
      "Device grouping structure for lab teams",
      "Screen mirroring tool compatibility check (buyer-supplied tools)",
      "Remote session or written guide — scoped in quote",
    ],
    specs: {
      "Service type": "Hardware configuration support",
      "Duration": "Typically 2–4 hours remote — complex labs quoted longer",
      "Software": "Buyer-provided device management tools",
      "Prerequisite": "Functional rack with hub and power installed",
      "Deliverable": "Written setup notes + optional remote session",
    },
    scenarios: [
      "First-time rack commissioning after hardware delivery",
      "Lab handover when operations team changes",
      "Re-configuration after USB hub replacement",
      "Workstation upgrade (new control PC) replanning",
    ],
    accessories: [
      "Written setup document",
      "Slot-to-ADB ID map template",
      "Optional 1× remote session (scoped in quote)",
    ],
    delivery: [
      "Scheduled after hardware QC confirmed on buyer side",
      "Delivered as PDF guide and/or video call",
    ],
    maintenance: [
      "Re-book service if major hub or PC migration occurs",
    ],
    compatibilityNotes: [
      "We do not supply or license third-party device management SaaS",
      "macOS required for iPhone-heavy labs — note platform in booking",
    ],
    moqNotes: "1 service booking per rack commissioning. Multi-rack labs bundle hours in quote.",
    packingNotes: ["Digital delivery — no physical shipment"],
    afterSales: ["Additional hours billable per quote for major topology changes"],
    quoteGuidance: "Book after rack SKU is confirmed. Include OS, tool names, and node count.",
    faq: [
      { q: "Is software included?", a: "No — we configure hardware paths for tools you already use or plan to license." },
    ],
    priceUsd: 350,
    stock: 99,
    ...syncedImages("remote-control-setup", "webp"),
  }),
];

export function getProductSeed(slug: string) {
  return PRODUCT_SEEDS.find((p) => p.slug === slug);
}
