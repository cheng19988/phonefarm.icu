const card = (name: string) => `/images/card_800x800/${name}-card_800x800.webp`;
const hero = (name: string) => `/images/hero_1600x900/${name}-hero_1600x900.webp`;
const detail = (name: string) => `/images/detail_1200x900/${name}-detail_1200x900.webp`;

const P = "phonefarm.icu";

/** @see SITE_IMAGE_PATHS in lib/site-images.ts for future canonical asset paths */
export const IMAGES = {
  homeHero: hero(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
  phoneFarmBox: {
    card: card(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
    hero: hero(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
    detail: detail(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
  },
  motherboardBox: {
    card: card(`${P}-components-electronicscomponentslayout-64e0d`),
    hero: hero(`${P}-components-electronicscomponentslayout-64e0d`),
    detail: detail(`${P}-components-electronicscomponentslayout-64e0d`),
  },
  androidFarm: {
    card: card(`${P}-product-box-2025-10-25-11-28-img-0553-47327`),
    hero: hero(`${P}-product-box-2025-10-25-11-28-img-0553-47327`),
    detail: detail(`${P}-product-box-2025-10-25-11-28-img-0553-47327`),
  },
  iphoneFarm: {
    card: card(`${P}-product-box-2025-10-25-11-37-img-0566-ee21b`),
    hero: hero(`${P}-product-box-2025-10-25-11-37-img-0566-ee21b`),
    detail: detail(`${P}-product-box-2025-10-25-11-37-img-0566-ee21b`),
  },
  realDevice: {
    card: card(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
    hero: hero(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
    detail: detail(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
  },
  emptyBox: {
    card: card(`${P}-components-electronicsassembly-detail-f936c`),
    hero: hero(`${P}-components-electronicsassembly-detail-f936c`),
    detail: detail(`${P}-components-electronicsassembly-detail-f936c`),
  },
  usbHub: {
    card: card(`${P}-components-electronicscomponentsassembly-19059`),
    hero: hero(`${P}-components-electronicscomponentsassembly-19059`),
    detail: detail(`${P}-components-electronicscomponentsassembly-19059`),
  },
  power: {
    card: card(`${P}-components-electronicsassemblylabworkbench-9e7df`),
    hero: hero(`${P}-components-electronicsassemblylabworkbench-9e7df`),
    detail: detail(`${P}-components-electronicsassemblylabworkbench-9e7df`),
  },
  cooling: {
    card: card(`${P}-components-electronics-workbenchdetail-6f814`),
    hero: hero(`${P}-components-electronics-workbenchdetail-6f814`),
    detail: detail(`${P}-components-electronics-workbenchdetail-6f814`),
  },
  network: {
    card: card(`${P}-accessories-networkdevice-accessories-36665`),
    hero: hero(`${P}-accessories-networkdevice-accessories-36665`),
    detail: detail(`${P}-accessories-networkdevice-accessories-36665`),
  },
  customCabinet: {
    card: card(`${P}-product-box-2025-10-25-11-33-img-0561-db197`),
    hero: hero(`${P}-product-box-2025-10-25-11-33-img-0561-db197`),
    detail: detail(`${P}-product-box-2025-10-25-11-33-img-0561-db197`),
  },
  remoteControl: {
    card: card(`${P}-accessories-techaccessories-showcase-80dfb`),
    hero: hero(`${P}-accessories-techaccessories-showcase-80dfb`),
    detail: detail(`${P}-accessories-techaccessories-showcase-80dfb`),
  },
  serviceScene: hero(`${P}-product-box-2025-10-25-11-21-img-0547-4b35a`),
  factory: hero(`${P}-components-electronicsassemblylab-19f44`),
  workshop: hero(`${P}-components-electronicscomponents-device-showcase-93575`),
  office: hero(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
  meeting: hero(`${P}-components-electronicscomponentsproductphoto-27282`),
  warehouse: hero(`${P}-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8`),
  company: {
    office: "/images/company/office.png",
    frontdesk: "/images/company/frontdesk.png",
    meeting: "/images/company/meeting.png",
    workshop: "/images/company/workshop.png",
    warehouse: "/images/company/warehouse.png",
  },
} as const;
