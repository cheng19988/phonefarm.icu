/** Extra PDP FAQs per SKU — merged in getProductSeed() */
export const PRODUCT_FAQ_EXTRA: Record<string, { q: string; a: string }[]> = {
  "phone-farm-box": [
    { q: "Is there a device limit per rack?", a: "Physical slots are typically 20 positions. Final count depends on phone dimensions — confirmed in your quote." },
    { q: "Do you offer enterprise deployment support?", a: "Yes. Multi-rack and custom cabinet projects include deployment planning. Contact sales with staff count and timeline." },
    { q: "Are hardware revisions free to support?", a: "Standard 12-month hardware support covers chassis, fans, and PSU modules. Firmware on buyer devices is separate." },
    { q: "What if I have problems after delivery?", a: "Reach us via WhatsApp or Telegram with slot map photos. Replacement parts and remote diagnostics are available." },
  ],
  "motherboard-box": [
    { q: "Is there a device limit?", a: "Up to 20 motherboard nodes per standard box — model dimensions may reduce count." },
    { q: "Enterprise deployment?", a: "Bulk motherboard box labs from 5+ units include engineering review of slot layout." },
    { q: "Display required?", a: "No — motherboard boxes are screenless. Use when your workflow is headless ADB automation." },
    { q: "Support process?", a: "Hardware support via sales channels; software tooling is buyer-provided." },
  ],
  "android-phone-farm": [
    { q: "Which phone models fit?", a: "Gallery shows reference Samsung, OnePlus, Pixel, and Flip class layouts. Share your list for slot confirmation." },
    { q: "Devices included?", a: "Rack hardware only — phones are typically buyer-supplied." },
    { q: "USB and LAN per slot?", a: "Reference configurations include USB + LAN + OTG paths per node — exact harness in quote." },
  ],
  "iphone-phone-farm": [
    { q: "Is there a device limit?", a: "Typically 10–16 iPhones per rack depending on model and cable type." },
    { q: "Enterprise iOS labs?", a: "Multi-rack iOS deployments quoted per project with macOS control station notes." },
    { q: "Support after delivery?", a: "Cable replacement and charging bus diagnostics via remote support channels." },
  ],
  "real-device-phone-farm": [
    { q: "Is this one carton?", a: "No — this SKU represents a multi-rack project scope. Rack count defined in written proposal." },
    { q: "Enterprise MOQ?", a: "Projects typically start at 3+ racks or equivalent device count." },
  ],
  "empty-box-chassis": [
    { q: "What is included?", a: "Bare chassis shell with front I/O panel and rear fan grille — no phones, hub PCB, or PSU unless added in quote." },
    { q: "Custom slot drilling?", a: "Yes — share device dimensions for OEM slot pattern discussion." },
  ],
  "usb-hub": [
    { q: "How many devices per hub?", a: "Typically 10–20 ports matched to rack node count in quote." },
    { q: "USB 2.0 vs 3.0?", a: "USB 3.0 recommended for faster APK push and long cable runs — note in quote request." },
  ],
  "power-supply-solution": [
    { q: "How do I size PSU wattage?", a: "Share node count and charging profile — we document recommended load in quote sheet." },
    { q: "Region-specific plugs?", a: "Input cable provided for destination region when noted in order." },
  ],
  "cooling-solution": [
    { q: "How many fans included?", a: "Typically 2–4 fan module — scaled for rack model and ambient temperature in quote." },
    { q: "Enough for tropical climates?", a: "Rack fans assist airflow; room HVAC may still be required above 30°C ambient." },
  ],
  "network-equipment": [
    { q: "Suitable for multi-region mobile commerce QA?", a: "Hardware supports stable per-cluster IP when the buyer configures proxy and regional egress — ~30 devices per router tier typical." },
    { q: "What are standout router features?", a: "Industrial-tier router/switch options with VLAN planning — load balancing and DNS/MAC policies configured by buyer." },
    { q: "SIM bank included?", a: "No — network hardware only. SIM tray access depends on device/motherboard choice." },
  ],
  "custom-cabinet": [
    { q: "Enterprise deployment?", a: "Yes — engineered per room with PDU, cooling ducts, and phased shipment." },
    { q: "Lead time?", a: "Typically 2–4 weeks production after drawing approval — longer than single rack SKUs." },
  ],
  "remote-control-setup": [
    { q: "Is software included?", a: "No — we configure hardware paths for tools you provide. Service is commissioning, not SaaS." },
    { q: "Support if problems persist?", a: "Additional remote hours available per quote for topology changes." },
  ],
};
