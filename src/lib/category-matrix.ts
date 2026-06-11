import { getProductAssets } from "@/lib/product-assets";

/** All 12 catalog categories mapped to shop SKUs */
export const CATEGORY_MATRIX = [
  { slug: "phone-farm-box", title: "Phone Farm Box", desc: "Full-phone 20-slot rack", href: "/products/phone-farm-box" },
  { slug: "motherboard-box", title: "Motherboard Box", desc: "Screenless Android nodes", href: "/products/motherboard-box" },
  { slug: "android-phone-farm", title: "Android Phone Farm", desc: "Pre-wired Android racks", href: "/products/android-phone-farm" },
  { slug: "iphone-phone-farm", title: "iPhone Phone Farm", desc: "iOS rack chassis (devices BYO)", href: "/products/iphone-phone-farm" },
  { slug: "real-device-phone-farm", title: "Real Device Farm", desc: "Multi-rack project scale", href: "/products/real-device-phone-farm" },
  { slug: "empty-box-chassis", title: "Empty Box / Chassis", desc: "Bare 20-slot shell", href: "/products/empty-box-chassis" },
  { slug: "usb-hub", title: "USB Hub", desc: "Powered hub modules", href: "/products/usb-hub" },
  { slug: "power-supply-solution", title: "Power Supply", desc: "Rack PSU distribution", href: "/products/power-supply-solution" },
  { slug: "cooling-solution", title: "Cooling", desc: "Fan airflow modules", href: "/products/cooling-solution" },
  { slug: "network-equipment", title: "Network", desc: "Router & switch modules", href: "/products/network-equipment" },
  { slug: "custom-cabinet", title: "Custom Cabinet", desc: "Enterprise rack cabinets", href: "/products/custom-cabinet" },
  { slug: "remote-control-setup", title: "Remote Control", desc: "Workstation setup service", href: "/products/remote-control-setup" },
] as const;

export function getCategoryMatrixWithImages() {
  return CATEGORY_MATRIX.map((cat) => {
    const assets = getProductAssets(cat.slug);
    return {
      ...cat,
      image: assets?.card ?? assets?.hero ?? `/images/products/${cat.slug}/card.png`,
    };
  });
}
