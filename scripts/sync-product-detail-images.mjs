/**
 * Sync ALL product images from material libraries into public/images/products/{slug}/
 * Filenames encode model + specs — written to manifest.json per SKU.
 * Run: npm run sync-product-images
 */
import fs from "node:fs";
import path from "node:path";
import { parseProductImageFilename } from "./product-model-parse.mjs";

const DETAIL_SRC = "D:\\产品商品详情图";
const WHITEBG_SRC = "E:\\主板机照片素材\\主板机白底";
const OUT = path.join(process.cwd(), "public", "images", "products");
const PUBLIC_IMAGES = path.join(process.cwd(), "public", "images");

const ALL_SLUGS = [
  "phone-farm-box",
  "motherboard-box",
  "android-phone-farm",
  "iphone-phone-farm",
  "real-device-phone-farm",
  "empty-box-chassis",
  "usb-hub",
  "power-supply-solution",
  "cooling-solution",
  "network-equipment",
  "custom-cabinet",
  "remote-control-setup",
];

/** @type {Record<string, string>} */
const HERO_MATCH = {
  "phone-farm-box": "box-phone-farm-s8-en_main_box_s8",
  "motherboard-box": "box-phone-farm-a908n-en_main",
  "android-phone-farm": "box-phone-farm-s9-en_main",
  "iphone-phone-farm": "IMG_0566",
  "real-device-phone-farm": "boxphone-s8-super-change-en_main",
  "empty-box-chassis": "IMG_0570",
  "custom-cabinet": "IMG_0573",
};

function classifyDetail(name) {
  const n = name.toLowerCase();
  if (/site_|genfarmer|package_product/.test(n)) return [];
  if (/perangkat_s8|device-s8-id/.test(n)) return ["real-device-phone-farm"];
  if (/boxphone-s8-super-change/.test(n)) return ["real-device-phone-farm"];
  if (/a908n|box-phone-farm-note-8-en_main|note-8-super-change|oneplus-5-super-change|nubia-z17|note-10-lite-change/.test(n))
    return ["motherboard-box"];
  if (/box-phone-farm-s9|box-phone-farm-s20|note-20-en_main|s21-fe-en_main/.test(n)) return ["android-phone-farm"];
  if (/z-flip3|z-flip4|pixel-4xl|oneplus-8-pro/.test(n)) return ["android-phone-farm"];
  if (/structure_of_b/.test(n)) return ["empty-box-chassis", "phone-farm-box"];
  if (/box-phone-farm-s8|box-phone-farm-s10|note-9-en_main|s8-change|s10-change/.test(n)) return ["phone-farm-box"];
  if (n.startsWith("product_box_phone_farm")) return ["phone-farm-box"];
  return [];
}

/** @type {Record<string, string[]>} */
const WHITEBG_SLUGS = {
  "2025_10_25_11_39_IMG_0570": ["empty-box-chassis", "iphone-phone-farm"],
  "2025_10_25_11_40_IMG_0571": ["empty-box-chassis", "iphone-phone-farm", "cooling-solution"],
  "2025_10_25_12_01_IMG_0579": ["empty-box-chassis", "custom-cabinet"],
  "2025_10_25_11_33_IMG_0561": ["empty-box-chassis", "custom-cabinet", "cooling-solution"],
  "2025_10_25_11_23_IMG_0548": ["empty-box-chassis", "phone-farm-box", "iphone-phone-farm"],
  "2025_10_25_11_21_IMG_0547": ["phone-farm-box"],
  "2025_10_25_11_24_IMG_0549": ["phone-farm-box"],
  "2025_10_25_11_27_IMG_0551": ["motherboard-box"],
  "2025_10_25_11_28_IMG_0553": ["android-phone-farm"],
  "2025_10_25_11_29_IMG_0556": ["real-device-phone-farm"],
  "2025_10_25_11_37_IMG_0566": ["iphone-phone-farm", "phone-farm-box"],
  "2025_10_25_11_44_IMG_0573": ["empty-box-chassis", "custom-cabinet"],
  "2025_10_25_11_45_IMG_0575": ["empty-box-chassis", "custom-cabinet"],
};

const ACCESSORY_WEBPS = {
  "usb-hub": [
    "phonefarm.icu-components-electronicscomponentsassembly-19059",
    "phonefarm.icu-components-electronicscomponentslayout-64e0d",
    "phonefarm.icu-components-electronicscomponentsproductphoto-27282",
    "phonefarm.icu-accessories-electronics-accessories-1cc0b",
    "phonefarm.icu-components-electronicscomponents-device-showcase-93575",
  ],
  "power-supply-solution": [
    "phonefarm.icu-components-electronicsassemblylabworkbench-9e7df",
    "phonefarm.icu-components-electronicsassemblylab-19f44",
    "phonefarm.icu-components-electronicsassembly-detail-f936c",
  ],
  "cooling-solution": [
    "phonefarm.icu-components-electronics-workbenchdetail-6f814",
    "phonefarm.icu-components-electronicsassembly-detail-f936c",
  ],
  "network-equipment": [
    "phonefarm.icu-accessories-networkdevice-accessories-36665",
    "phonefarm.icu-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8",
    "phonefarm.icu-accessories-computeraccessories-showcase-2b3e3",
  ],
  "custom-cabinet": ["phonefarm.icu-product-box-2025-10-25-11-33-img-0561-db197"],
  "remote-control-setup": [
    "phonefarm.icu-accessories-techaccessories-showcase-80dfb",
    "phonefarm.icu-accessories-computeraccessories-showcase-2b3e3",
    "phonefarm.icu-components-electronicscomponents-device-showcase-93575",
    "phonefarm.icu-accessories-electronics-accessories-1cc0b",
  ],
};

function parseModelLabel(filename) {
  return parseProductImageFilename(filename).label;
}

function parseModelMeta(filename) {
  const meta = parseProductImageFilename(filename);
  const specs = {};
  if (meta.model) specs.model = meta.model;
  if (meta.variant) specs.variant = meta.variant;
  if (meta.ramGb) specs.ramGb = meta.ramGb;
  if (meta.storageGb) specs.storageGb = meta.storageGb;
  if (meta.ports?.length) specs.ports = meta.ports;
  if (meta.boardType) specs.boardType = meta.boardType;
  return Object.keys(specs).length ? specs : undefined;
}

function extOf(file) {
  return path.extname(file).toLowerCase() || ".png";
}

function slugifyLabel(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function findWebp(base, kind) {
  const dir = path.join(PUBLIC_IMAGES, kind);
  if (!fs.existsSync(dir)) return null;
  const hit = fs.readdirSync(dir).find((f) => f.startsWith(base) && f.endsWith(".webp"));
  return hit ? path.join(dir, hit) : null;
}

function resetSlugDir(slug) {
  const dir = path.join(OUT, slug);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** @type {Record<string, { src: string; label: string; key: string; specs?: object }[]>} */
const bucket = Object.fromEntries(ALL_SLUGS.map((s) => [s, []]));

function pushAsset(slug, src, label, key, specs) {
  if (!bucket[slug]) bucket[slug] = [];
  if (bucket[slug].some((a) => a.key === key)) return;
  bucket[slug].push({ src, label, key, specs });
}

// Detail library
if (fs.existsSync(DETAIL_SRC)) {
  const seen = new Set();
  for (const file of fs.readdirSync(DETAIL_SRC).sort()) {
    if (!/^product_/i.test(file)) continue;
    const normalized = file.replace(/ \(2\)/, "");
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    const slugs = classifyDetail(file);
    const label = parseModelLabel(file);
    const specs = parseModelMeta(file);
    const src = path.join(DETAIL_SRC, file);
    for (const slug of slugs) pushAsset(slug, src, label, `detail:${normalized}`, specs);
  }
}

// White-background photos
if (fs.existsSync(WHITEBG_SRC)) {
  for (const file of fs.readdirSync(WHITEBG_SRC).sort()) {
    if (!/\.(png|jpg|jpeg|webp)$/i.test(file)) continue;
    if (/Untitled|ScreenShot|\.pdf/i.test(file)) continue;
    let matched = null;
    for (const [stem, slugs] of Object.entries(WHITEBG_SLUGS)) {
      if (file.includes(stem) || file.includes(stem.split("IMG_")[1] ?? "____")) {
        matched = slugs;
        break;
      }
    }
    if (!matched) continue;
    const src = path.join(WHITEBG_SRC, file);
    const label = parseModelLabel(file);
    const specs = parseModelMeta(file);
    for (const slug of matched) pushAsset(slug, src, label, `whitebg:${file}`, specs);
  }
}

// Accessory webp — one detail image per asset (no hero/detail/card triplets)
for (const [slug, bases] of Object.entries(ACCESSORY_WEBPS)) {
  for (const base of bases) {
    const src =
      findWebp(base, "detail_1200x900") ?? findWebp(base, "hero_1600x900") ?? findWebp(base, "card_800x800");
    if (!src) continue;
    const fname = path.basename(src);
    pushAsset(slug, src, parseModelLabel(fname), `webp:${base}:detail`, parseModelMeta(fname));
  }
}

let total = 0;
for (const slug of ALL_SLUGS) {
  const assets = bucket[slug];
  const dir = resetSlugDir(slug);
  if (assets.length === 0) {
    console.warn(`\n${slug}: NO ASSETS`);
    continue;
  }

  console.log(`\n${slug} (${assets.length} sources):`);

  const heroNeedle = HERO_MATCH[slug];
  const sorted = [...assets].sort((a, b) => {
    const ah = heroNeedle && a.key.toLowerCase().includes(heroNeedle.toLowerCase()) ? 0 : 1;
    const bh = heroNeedle && b.key.toLowerCase().includes(heroNeedle.toLowerCase()) ? 0 : 1;
    return ah - bh || a.label.localeCompare(b.label);
  });

  const manifest = [];
  const usedNames = new Set();

  function uniqueName(name) {
    let n = name;
    let i = 1;
    while (usedNames.has(n)) {
      const ext = extOf(name);
      const base = name.slice(0, -ext.length);
      n = `${base}-${i}${ext}`;
      i += 1;
    }
    usedNames.add(n);
    return n;
  }

  // Hero
  const heroAsset = sorted[0];
  const heroExt = extOf(heroAsset.src);
  const heroName = uniqueName(`hero${heroExt}`);
  copyFile(heroAsset.src, path.join(dir, heroName));
  manifest.push({
    file: heroName,
    label: heroAsset.label,
    url: `/images/products/${slug}/${heroName}`,
    role: "hero",
    ...(heroAsset.specs ? { specs: heroAsset.specs } : {}),
  });
  console.log(`  ${heroName} <- ${path.basename(heroAsset.src)}`);
  total += 1;

  // Card = hero copy
  const cardName = uniqueName(`card${heroExt}`);
  copyFile(path.join(dir, heroName), path.join(dir, cardName));
  manifest.push({ file: cardName, label: heroAsset.label, url: `/images/products/${slug}/${cardName}`, role: "card" });

  // Gallery — all remaining
  let g = 0;
  for (const asset of sorted.slice(1)) {
    g += 1;
    const ext = extOf(asset.src);
    const gName = uniqueName(`gallery-${String(g).padStart(2, "0")}-${slugifyLabel(asset.label)}${ext}`);
    copyFile(asset.src, path.join(dir, gName));
    manifest.push({
      file: gName,
      label: asset.label,
      url: `/images/products/${slug}/${gName}`,
      role: "gallery",
      ...(asset.specs ? { specs: asset.specs } : {}),
    });
    console.log(`  ${gName} <- ${path.basename(asset.src)}`);
    total += 1;
  }

  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
}

console.log(`\nDone. ${total} files synced across ${ALL_SLUGS.length} SKUs.`);
