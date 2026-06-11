export const SITE = {
  name: "PhoneFarm ICU",
  domain: "phonefarm.icu",
  url: "https://phonefarm.icu",
  tagline: "Phone Farm Racks & Hardware — Guangzhou",
  headline: "Phone Farm Hardware, Racks & Boxes — Shop & Deploy",
  intro:
    "Factory-direct phone farm racks, motherboard boxes, cooling systems, USB hubs, and deployment packages from Guangzhou. Browse the catalog, register to order, pay with USDT after confirmation, or contact sales for bulk quotes.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "PhoneFarm ICU — Guangzhou phone farm hardware catalog. Phone farm racks, motherboard boxes, cooling, USB hubs, packages, and accessories. Shop online, USDT payment, bulk quotes since 2017.",
} as const;

export const CONTACT = {
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+85262155642",
  whatsappUrl: "https://wa.me/85262155642",
  email: "qiuxui646@gmail.com",
  /** Gmail compose — reliable in browser; mailto: often falls back to Google search without a mail app */
  emailUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=qiuxui646@gmail.com",
} as const;

export const PAYMENT = {
  network: "Tron TRC20",
  currency: "USDT",
  address: "TH42KshQyz15iWk5svAwS475RM8oYQjwjW",
  contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  minAmount: 10,
  expiryMinutes: 30,
} as const;

/** Main header nav (Shop is separate dropdown) */
export const HEADER_NAV = [
  { href: "/phone-farm", label: "Phone Farm Guide" },
  { href: "/packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
  { href: "/knowledge-base", label: "Knowledge Base" },
  { href: "/contact", label: "Contact" },
] as const;

/** @deprecated use HEADER_NAV — kept for mobile fallback */
export const NAV = [
  { href: "/products", label: "Shop" },
  ...HEADER_NAV,
] as const;

export const FOOTER_NAV = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "Services" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const SHOP_MENU = [
  {
    title: "Phone Farm Racks",
    items: [
      { label: "Phone Farm Box", href: "/products/phone-farm-box" },
      { label: "Android Phone Farm", href: "/products/android-phone-farm" },
      { label: "iPhone Phone Farm", href: "/products/iphone-phone-farm" },
      { label: "Real Device Farm", href: "/products/real-device-phone-farm" },
      { label: "All Racks", href: "/products?category=Phone+Farm+Box" },
    ],
  },
  {
    title: "Motherboard Boxes",
    items: [
      { label: "Motherboard Box", href: "/products/motherboard-box" },
      { label: "Empty Box / Chassis", href: "/products/empty-box-chassis" },
      { label: "Custom Cabinet", href: "/products/custom-cabinet" },
    ],
  },
  {
    title: "Power / Cooling / USB",
    items: [
      { label: "USB Hub", href: "/products/usb-hub" },
      { label: "Power Supply", href: "/products/power-supply-solution" },
      { label: "Cooling Module", href: "/products/cooling-solution" },
      { label: "Network Equipment", href: "/products/network-equipment" },
    ],
  },
  {
    title: "Packages & Guides",
    items: [
      { label: "What Is a Phone Farm?", href: "/phone-farm" },
      { label: "Starter Box Bundle", href: "/packages/starter-box-bundle" },
      { label: "Compare Packages", href: "/packages" },
      { label: "How to Buy", href: "/docs/buying-guide" },
      { label: "USDT Payment", href: "/docs/usdt-payment-guide" },
      { label: "Shipping Guide", href: "/docs/shipping-guide" },
    ],
  },
] as const;

export const PRODUCT_CATEGORIES = [
  "Phone Farm Box",
  "Motherboard Box",
  "Android Phone Farm",
  "iPhone Phone Farm",
  "Real Device Phone Farm",
  "Empty Box / Chassis",
  "USB Hub",
  "Power Supply",
  "Cooling",
  "Network",
  "Custom Cabinet",
  "Remote Control",
] as const;

/** Shop page category filter pills (group maps to multiple PRODUCT_CATEGORIES) */
export const SHOP_FILTERS = [
  { key: "all", label: "All", href: "/products", categories: null as string[] | null },
  {
    key: "racks",
    label: "Phone Farm Racks",
    href: "/products?group=racks",
    categories: ["Phone Farm Box", "Android Phone Farm", "iPhone Phone Farm", "Real Device Phone Farm"],
  },
  {
    key: "motherboard",
    label: "Motherboard Boxes",
    href: "/products?group=motherboard",
    categories: ["Motherboard Box", "Empty Box / Chassis"],
  },
  {
    key: "power",
    label: "Power / Cooling / USB",
    href: "/products?group=power",
    categories: ["USB Hub", "Power Supply", "Cooling"],
  },
  {
    key: "network",
    label: "Network / SIM",
    href: "/products?group=network",
    categories: ["Network"],
  },
  {
    key: "cabinet",
    label: "Custom Cabinet",
    href: "/products?group=cabinet",
    categories: ["Custom Cabinet"],
  },
  {
    key: "packages",
    label: "Packages / Kits",
    href: "/packages",
    categories: null,
  },
] as const;

export function getShopFilterCategories(group?: string): string[] | undefined {
  if (!group) return undefined;
  const filter = SHOP_FILTERS.find((f) => f.key === group);
  const cats = filter?.categories;
  return cats ? [...cats] : undefined;
}
