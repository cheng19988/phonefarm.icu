export const SITE = {
  name: "PhoneFarm ICU",
  domain: "phonefarm.icu",
  url: "https://phonefarm.icu",
  tagline: "Phone Farm Hardware Catalog — Guangzhou",
  headline: "Phone Farm Hardware, Boxes, Accessories and Deployment Products",
  intro:
    "PhoneFarm ICU is a Guangzhou-based phone farm hardware catalog and product platform for real-device phone farm boxes, motherboard boxes, USB hub solutions, power systems, cooling systems, network accessories, and custom deployment products.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "PhoneFarm ICU — Guangzhou phone farm hardware catalog and shop. Phone farm boxes, motherboard boxes, Android and iPhone farms, USB hubs, power, cooling, network gear, remote control setup, USDT checkout, and bulk deployment.",
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
  { href: "/products", label: "Products" },
  { href: "/packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
  { href: "/knowledge-base", label: "Knowledge Base" },
  { href: "/support", label: "Support" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
] as const;

export const FOOTER_NAV = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "Services" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
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
  "Remote Control Setup",
] as const;
