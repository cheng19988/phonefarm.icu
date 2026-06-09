import type { ProductSeed } from "@/data/products";

const DEVICE_TYPE_BY_CATEGORY: Record<string, string> = {
  "Phone Farm Box": "Full smartphones with display (buyer-supplied typical)",
  "Motherboard Box": "Android motherboard nodes — screenless",
  "Android Phone Farm": "Android smartphones",
  "iPhone Phone Farm": "Apple iPhone devices",
  "Real Device Phone Farm": "Full smartphones — multi-rack project scope",
  "Empty Box / Chassis": "Chassis frame — devices added by buyer",
  "USB Hub": "N/A — connectivity module for racks",
  "Power Supply": "N/A — power module for racks",
  Cooling: "N/A — cooling module for racks",
  Network: "N/A — router/switch for device clusters",
  "Custom Cabinet": "Multi-rack integrated cabinet",
  "Remote Control": "N/A — configuration service",
};

/** Build a full commerce-grade spec table aligned with industry product pages */
export function buildFullSpecTable(
  seed: ProductSeed,
  productName: string,
  category: string,
): Record<string, string> {
  const warranty =
    seed.afterSales.find((s) => s.toLowerCase().includes("month") || s.toLowerCase().includes("support")) ??
    seed.afterSales[0] ??
    "Hardware support — term confirmed in quotation";

  const shipping =
    seed.packingNotes.length > 0
      ? seed.packingNotes.join(" · ")
      : "Express or sea freight — quoted by destination country";

  const enriched: Record<string, string> = {
    "Product model": productName,
    "Device capacity":
      seed.specs["Typical capacity"] ??
      seed.specs["Typical devices"] ??
      seed.specs["Capacity"] ??
      "Depends on device model — confirmed before production",
    "Supported device type": DEVICE_TYPE_BY_CATEGORY[category] ?? "Confirmed in compatibility check",
    "Supported phone / motherboard type":
      seed.compatibilityNotes[0] ?? "Share device model list for slot and cable matching",
    "Operating system compatibility":
      category.includes("iPhone")
        ? "iOS — macOS control station recommended"
        : category.includes("Motherboard") || category.includes("Android")
          ? "Android — ADB-based tooling"
          : category.includes("iPhone")
            ? "iOS"
            : "Depends on buyer-supplied devices — confirmed in quote",
    "Control method":
      seed.specs["Control link"] ??
      seed.specs["Control"] ??
      seed.specs["Connectivity"] ??
      "USB hub uplink to control workstation",
    "USB / hub configuration":
      seed.specs["USB interface"] ??
      seed.specs["USB generation"] ??
      seed.specs["Port count"] ??
      "Hub tier matched to node count in quotation",
    "Power supply":
      seed.specs["Power input"] ??
      seed.specs["Power"] ??
      seed.specs["Output power"] ??
      "Industrial PSU — sized per node count in quote",
    "Cooling method":
      seed.specs["Cooling"] ?? "Active fan airflow — ambient temperature dependent",
    "Chassis / material":
      seed.specs["Chassis material"] ??
      seed.specs["Chassis"] ??
      seed.specs["Material"] ??
      "Steel frame with ventilated panels",
    "Network / SIM options":
      seed.specs["Network"] ??
      seed.specs["SIM / tray"] ??
      "Optional network module — SIM tray depends on device model",
    Dimensions:
      seed.specs["Dimensions"] ??
      seed.specs["Form"] ??
      "Typical range — final dimensions confirmed in quotation",
    Weight: seed.specs["Weight"] ?? "Confirmed in packing list after configuration",
    "Package contents": seed.accessories.slice(0, 4).join("; "),
    Warranty: warranty,
    Shipping: shipping,
    "Customization options": "Optional configuration per order quantity — final spec confirmed in quotation",
    "MOQ / sample order": seed.moqNotes,
    "Bulk order support": "Available — contact sales for 3+ unit and project pricing",
    "Payment method": "USDT (TRC20) after order confirmation · wire transfer for enterprise bulk",
    ...seed.specs,
  };

  return enriched;
}

/** One-line spec highlight for shop cards */
export function specHighlight(seed: ProductSeed): string {
  return specHighlights(seed)[0] ?? seed.shortDesc.slice(0, 60);
}

/** 2–4 spec bullets for shop product cards */
export function specHighlights(seed: ProductSeed): string[] {
  const keys = [
    "Typical capacity",
    "Slot capacity",
    "Reference models",
    "Reference platform",
    "Front panel I/O",
    "Typical devices",
    "Node type",
    "Type",
    "Power input",
    "Cooling",
    "Rear cooling",
    "USB interface",
    "Chassis material",
    "Port count",
    "Output power",
  ];
  const fromSpecs = keys
    .map((k) => seed.specs[k])
    .filter((v): v is string => Boolean(v))
    .slice(0, 3);
  const fromFeatures = seed.features.slice(0, 4 - fromSpecs.length);
  const combined = [...fromSpecs, ...fromFeatures].slice(0, 4);
  return combined.length > 0 ? combined : [seed.shortDesc.slice(0, 72)];
}
