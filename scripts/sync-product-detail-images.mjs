/**
 * Copy real product images into public/images/products/{slug}/
 * Run: node scripts/sync-product-detail-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DETAIL_SRC = "D:\\产品商品详情图";
const WHITEBG_SRC = "E:\\主板机照片素材\\主板机白底";
const OUT = path.join(process.cwd(), "public", "images", "products");

/** @type {Record<string, { files: { match: string; dest: string }[]; whitebg?: { file: string; dest: string } }>} */
const MAP = {
  "phone-farm-box": {
    files: [
      { match: "box-phone-farm-s8-en_main_box_s8", dest: "hero.png" },
      { match: "box-phone-farm-s8-en_main_box_s8", dest: "card.png" },
      { match: "box-phone-farm-s10-en_main", dest: "gallery-1.png" },
      { match: "box-phone-farm-s8-change-en_main", dest: "gallery-2.png" },
      { match: "gallery_6_Structure_of_B", dest: "gallery-3.png" },
      { match: "box-phone-farm-note-9-en_main", dest: "gallery-4.png" },
    ],
  },
  "motherboard-box": {
    files: [
      { match: "box-phone-farm-a908n-en_main", dest: "hero.png" },
      { match: "box-phone-farm-a908n-en_main", dest: "card.png" },
      { match: "box-phone-farm-note-8-en_main", dest: "gallery-1.png" },
      { match: "box-phone-farm-oneplus-5-super-change-en_main", dest: "gallery-2.png" },
      { match: "box-phone-farm-nubia-z17-en_main", dest: "gallery-3.png" },
    ],
    whitebg: { file: "2025_10_25_11_27_IMG_0551.png", dest: "gallery-4.png" },
  },
  "android-phone-farm": {
    files: [
      { match: "box-phone-farm-s9-en_main", dest: "hero.png" },
      { match: "box-phone-farm-s9-en_main", dest: "card.png" },
      { match: "box-phone-farm-s20-en_main", dest: "gallery-1.png" },
      { match: "box-phone-farm-note-20-en_main", dest: "gallery-2.png" },
      { match: "box-phone-farm-s21-fe-en_main", dest: "gallery-3.png" },
    ],
    whitebg: { file: "2025_10_25_11_28_IMG_0553.png", dest: "gallery-4.png" },
  },
  "iphone-phone-farm": {
    files: [
      { match: "box-phone-farm-z-flip3-en_main", dest: "hero.png" },
      { match: "box-phone-farm-z-flip3-en_main", dest: "card.png" },
      { match: "box-phone-farm-z-flip4-en_main", dest: "gallery-1.png" },
      { match: "box-phone-farm-pixel-4xl-super-change_gallery", dest: "gallery-2.png" },
    ],
    whitebg: { file: "2025_10_25_11_37_IMG_0566.png", dest: "gallery-3.png" },
  },
  "real-device-phone-farm": {
    files: [
      { match: "boxphone-s8-super-change-en_main", dest: "hero.png" },
      { match: "boxphone-s8-super-change-en_main", dest: "card.png" },
      { match: "device-s8-id_gallery_2_main_s8", dest: "gallery-1.jpg" },
      { match: "device-s8-id_gallery_3_Frame_13", dest: "gallery-2.jpg" },
      { match: "device-s8-id_gallery_4_Frame_21", dest: "gallery-3.jpg" },
    ],
    whitebg: { file: "2025_10_25_11_29_IMG_0556", dest: "gallery-4.png" },
  },
  "empty-box-chassis": {
    files: [
      { match: "gallery_6_Structure_of_B", dest: "hero.png" },
      { match: "gallery_6_Structure_of_B", dest: "card.png" },
      { match: "box-phone-farm-s10-change-en_main", dest: "gallery-1.png" },
    ],
    whitebg: { file: "2025_10_25_12_01_IMG_0579.png", dest: "gallery-2.png" },
  },
};

const WEBP_FALLBACK = {
  "usb-hub": "phonefarm.icu-components-electronicscomponentsassembly-19059",
  "power-supply-solution": "phonefarm.icu-components-electronicsassemblylabworkbench-9e7df",
  "cooling-solution": "phonefarm.icu-components-electronics-workbenchdetail-6f814",
  "network-equipment": "phonefarm.icu-accessories-networkdevice-accessories-36665",
  "custom-cabinet": "phonefarm.icu-product-box-2025-10-25-11-33-img-0561-db197",
  "remote-control-setup": "phonefarm.icu-accessories-techaccessories-showcase-80dfb",
};

function listDetailFiles() {
  if (!fs.existsSync(DETAIL_SRC)) return [];
  return fs.readdirSync(DETAIL_SRC);
}

function findFile(files, match) {
  const hit = files.find((f) => f.toLowerCase().includes(match.toLowerCase()));
  return hit ? path.join(DETAIL_SRC, hit) : null;
}

function findWhitebg(name) {
  if (!fs.existsSync(WHITEBG_SRC)) return null;
  const files = fs.readdirSync(WHITEBG_SRC);
  const hit = files.find((f) => f.includes(name.replace(".png", "")) || f.startsWith(name.slice(0, 20)));
  return hit ? path.join(WHITEBG_SRC, hit) : null;
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ${path.basename(dest)} <- ${path.basename(src)}`);
}

const detailFiles = listDetailFiles();

for (const [slug, cfg] of Object.entries(MAP)) {
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`\n${slug}:`);
  for (const { match, dest } of cfg.files) {
    const src = findFile(detailFiles, match);
    if (!src) {
      console.warn(`  MISSING match="${match}" -> ${dest}`);
      continue;
    }
    copyFile(src, path.join(dir, dest));
  }
  if (cfg.whitebg) {
    const wb = path.join(WHITEBG_SRC, cfg.whitebg.file);
    const src = fs.existsSync(wb) ? wb : findWhitebg(cfg.whitebg.file);
    if (src) copyFile(src, path.join(dir, cfg.whitebg.dest));
    else console.warn(`  MISSING whitebg: ${cfg.whitebg.file}`);
  }
}

const cardDir = path.join(process.cwd(), "public", "images", "card_800x800");
const heroDir = path.join(process.cwd(), "public", "images", "hero_1600x900");
const detailDir = path.join(process.cwd(), "public", "images", "detail_1200x900");

for (const [slug, base] of Object.entries(WEBP_FALLBACK)) {
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`\n${slug} (webp):`);
  copyFile(path.join(heroDir, `${base}-hero_1600x900.webp`), path.join(dir, "hero.webp"));
  copyFile(path.join(heroDir, `${base}-hero_1600x900.webp`), path.join(dir, "card.webp"));
  copyFile(path.join(detailDir, `${base}-detail_1200x900.webp`), path.join(dir, "gallery-1.webp"));
}

console.log("\nDone.");
