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
  phone: "13059502618",
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+852 6215 5642",
  whatsappUrl: "https://wa.me/85262155642",
  email: "qiuxui646@gmail.com",
} as const;

export const PAYMENT = {
  network: "Tron TRC20",
  currency: "USDT",
  address: "TH42KshQyz15iWk5svAwS475RM8oYQjwjW",
  contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  minAmount: 10,
  expiryMinutes: 30,
} as const;

export const NAV = [
  { href: "/products", label: "Shop" },
  { href: "/packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
  { href: "/knowledge-base", label: "Knowledge Base" },
  { href: "/support", label: "Support" },
  { href: "/docs", label: "Docs" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
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
    title: "Racks & Boxes",
    items: [
      { label: "Phone Farm Box", href: "/products/phone-farm-box" },
      { label: "Motherboard Box", href: "/products/motherboard-box" },
      { label: "Android Phone Farm", href: "/products/android-phone-farm" },
      { label: "iPhone Phone Farm", href: "/products/iphone-phone-farm" },
      { label: "Real Device Farm", href: "/products/real-device-phone-farm" },
      { label: "Empty Box / Chassis", href: "/products/empty-box-chassis" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "USB Hub", href: "/products/usb-hub" },
      { label: "Power Supply", href: "/products/power-supply-solution" },
      { label: "Cooling", href: "/products/cooling-solution" },
      { label: "Network Equipment", href: "/products/network-equipment" },
      { label: "Custom Cabinet", href: "/products/custom-cabinet" },
    ],
  },
  {
    title: "Packages",
    items: [
      { label: "Starter Box Bundle", href: "/packages/starter-box-bundle" },
      { label: "Motherboard Density Pack", href: "/packages/motherboard-density-pack" },
      { label: "iPhone Farm Suite", href: "/packages/iphone-farm-suite" },
      { label: "Enterprise Deployment", href: "/packages/enterprise-rack-deployment" },
      { label: "Compare Packages", href: "/packages" },
    ],
  },
  {
    title: "Buying Guides",
    items: [
      { label: "How to Buy", href: "/docs/buying-guide" },
      { label: "USDT Payment", href: "/docs/usdt-payment-guide" },
      { label: "Shipping Guide", href: "/docs/shipping-guide" },
      { label: "Warranty & Support", href: "/docs/warranty-guide" },
      { label: "Knowledge Base", href: "/knowledge-base" },
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
