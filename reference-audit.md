# Reference Site Audit — genfarmer.com

**Target site:** phonefarm.icu  
**Brand:** PhoneFarm ICU  
**Reference URL:** https://genfarmer.com/  
**Knowledge base reference:** https://genfarmer-support.gitbook.io/genfarmer-eng  
**Asset library:** `D:\网站搭建素材库`  
**Site images (primary):** `FINAL_phonefarm_6sites_package_CN\02_六个网站分类素材\02_phonefarm.icu_product_catalog_site`  
**Site images (fallback):** `02_six_website_ready\phonefarm.icu_product_catalog_site`  
**Sync:** `npm run sync-assets`

> GenFarmer brand/assets/copy will NOT be copied. Structure and conversion logic are replicated for **PhoneFarm ICU** — Guangzhou real-device phone farm hardware catalog (not no-code SaaS).

---

## 1. Page List

| Reference (GenFarmer) | Our Equivalent |
|----------------------|----------------|
| Homepage `/` | `/` |
| Package hub `/package/` | `/packages` |
| Package product `/package/product/{slug}` | `/packages/[slug]` |
| Shop `/shop/...` | `/products` + category filters |
| Pricing `/pricing` | `/pricing` |
| Download / signup `/download` | `/register`, `/login` |
| Blog | `/blog`, `/blog/[slug]` |
| Knowledge Base (GitBook) | `/knowledge-base`, `/knowledge-base/[slug]` |
| Support `/support` | `/support` |
| Docs / API-style guides | `/docs`, `/docs/[slug]` |
| Contact / lead forms | `/contact` |
| Account | `/account/orders`, `/login`, `/register` |
| FAQ (on package pages) | `/faq` + product/package FAQ |
| About (implicit) | `/about` |
| Services (deployment) | `/services` |
| Privacy / Terms | `/privacy`, `/terms` |
| Admin | `/admin` |

---

## 2. Navigation

### Reference pattern
- Product/solution discovery, Pricing, Support, Knowledge, Login, Free trial CTA

### PhoneFarm ICU nav
- **Products** (hardware catalog)
- **Packages** (deployment bundles — hardware matrix)
- **Pricing**
- **Knowledge Base**
- **Support**
- **Docs**
- **Blog**
- **Login / Register**
- Header contact bar (phone, WhatsApp, Telegram, email)

---

## 3. Homepage Modules

| # | GenFarmer | PhoneFarm ICU |
|---|-----------|---------------|
| 1 | Hero “Ready? Try it Free” + Start / Pricing | Hero hardware catalog + Browse Catalog / Pricing / Register |
| 2 | Software ecosystem overview | **Hardware product matrix** (12 categories) |
| 3 | `/package/` solution grid | **Packages** — box + accessories bundles |
| 4 | Why choose GenFarmer (HW+SW) | Why real-device hardware from Guangzhou factory |
| 5 | 10,000+ customers | Trust stats + factory gallery |
| 6 | Lead capture form | Contact / quote form CTA |
| 7 | Social / support links | WhatsApp, Telegram, email |
| 8 | — | Full **product catalog** grid (price, stock, Buy) |
| 9 | — | Knowledge Base + Docs preview |
| 10 | — | FAQ + Blog preview |

---

## 4. Product / Category Matrix (hardware, not software)

| GenFarmer (software) | PhoneFarm ICU (hardware) |
|---------------------|--------------------------|
| GenFarmer app / Control center | Phone Farm Box catalog |
| Boxphone | Phone Farm Box + Real Device Farm |
| Cloud Phone | *(positioned as comparison — we sell real devices)* |
| Automation / Mini-apps | Remote Control Setup + Group Control service |
| Account Manager | Deployment + bulk configuration service |
| Store / Marketplace | Accessories: USB Hub, Power, Cooling, Network |
| Package combos | `/packages` bundles |

**Catalog categories:** Phone Farm Box, Motherboard Box, Android/iPhone Farm, Real Device Farm, Empty Chassis, USB Hub, Power, Cooling, Network, Custom Cabinet, Remote Control Setup.

---

## 5. Package / Product Detail

### Reference package page
- Hero, HW+SW bundle, benefits, comparison table, price CTA “contact for quote”, FAQ, gifts/support

### Our package pages
- Hardware bundle name, included products, specs, USD from-price or quote, Buy / Get Quote, FAQ, contact strip

### Product detail (`/products/[slug]`)
- Price, stock, Buy Now, Add to Order, Get Quote, specs, scenarios, FAQ, JSON-LD Product

---

## 6. Pricing Page

### Reference
- Pricing plans, free tier CTA, link to packages

### Ours
- Hardware price tiers (Starter / Professional / Enterprise)
- Per-SKU price table linking to `/products`
- MOQ notes, USDT checkout mention, Get Quote CTA

---

## 7. Knowledge Base

### Reference (GitBook)
- Setup, main menu, automation, marketplace, billing, troubleshooting

### Ours (`/knowledge-base`)
- Getting Started, Phone Farm Box Setup, Motherboard Box, Power & Cooling, Network, Remote Control, Shipping & MOQ, Troubleshooting, Maintenance

---

## 8. Support & Docs

### Reference
- `/support`, community links, 1-1 support

### Ours
- `/support` — tickets via contact, channels, SLA, overseas delivery
- `/docs` — deployment specs, USB topology, rack layout, order/payment API placeholder (integration docs for buyers, not GenFarmer automation API)

---

## 9. Login / Register / Account

| Reference | Ours |
|-----------|------|
| Free signup / download | `/register`, `/login` |
| User account | `/account/orders` |
| Orders | Order + USDT payment flow |
| Admin | `/admin` — users, orders, products, inventory, contact leads |

---

## 10. Shop / Order / Payment

- Product list with price + stock + Buy / Quote
- Order statuses: Pending → Waiting for Payment → Paid → Confirmed / Cancelled / Expired
- USDT TRC20, 30 min expiry, verify API stub

**Contact:** 13059502618 · @huicheng1998 · +852 6215 5642 · qiuxui646@gmail.com

---

## 11. CTA Paths

| CTA | Destination |
|-----|-------------|
| Browse Catalog | `/products` |
| See Pricing | `/pricing` |
| Start / Register | `/register` |
| Package quote | `/packages/[slug]` → contact |
| Knowledge | `/knowledge-base` |
| Support | `/support` |
| Buy Now | login → order → USDT |

---

## Brand

| Field | Value |
|-------|-------|
| Name | PhoneFarm ICU |
| Domain | phonefarm.icu |
| Location | Guangzhou, China |
| H1 direction | Phone Farm Hardware, Boxes, Accessories and Deployment Products |
| Positioning | Hardware catalog + shop for real-device phone farms |
