export type ProductLine = {
  id: string;
  name: string;
  summary: string;
  suitableFor: string;
  categories: string[];
};

export const PRODUCT_LINES: ProductLine[] = [
  {
    id: "rack-systems",
    name: "Rack Systems",
    summary: "Industrial enclosures for full smartphones — centralized charging, fan airflow, and USB routing in one rack unit.",
    suitableFor: "QA labs, app testing teams, and agencies that need complete devices with displays and sensors.",
    categories: ["Phone Farm Box", "Android Phone Farm", "iPhone Phone Farm", "Real Device Phone Farm", "Empty Box / Chassis"],
  },
  {
    id: "motherboard-systems",
    name: "Motherboard Box Systems",
    summary: "Screenless Android motherboard arrays for higher node density without full phone shells.",
    suitableFor: "Device management labs and Android automation teams where display output is not required.",
    categories: ["Motherboard Box"],
  },
  {
    id: "cooling-power",
    name: "Cooling & Power Accessories",
    summary: "Fan cooling racks, PSU modules, and airflow accessories to keep dense racks thermally stable.",
    suitableFor: "Expanding existing farms or engineering custom rack layouts with documented power budgets.",
    categories: ["Power Supply", "Cooling", "Custom Cabinet"],
  },
  {
    id: "connectivity",
    name: "USB, Network & Cabling",
    summary: "Industrial USB hubs, routers, switches, and cable accessories for multi-device connectivity and maintenance.",
    suitableFor: "Rack expansion, SIM/device lab network isolation, and replacing worn cables in production farms.",
    categories: ["USB Hub", "Network", "Remote Control"],
  },
];

export function getProductLineForCategory(category: string) {
  return PRODUCT_LINES.find((line) => line.categories.includes(category));
}

export function getProductLine(id: string) {
  return PRODUCT_LINES.find((line) => line.id === id);
}
