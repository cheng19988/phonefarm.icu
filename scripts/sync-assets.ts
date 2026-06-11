/**
 * Sync images from D:\网站搭建素材库 into public/images
 * Run: npm run sync-assets
 */
import fs from "node:fs";
import path from "node:path";
import {
  ASSET_LIBRARY,
  ASSET_SITE_PATH_FALLBACK,
  ASSET_SITE_PATH_PRIMARY,
} from "../src/lib/assets";

const SITE_SRC = fs.existsSync(ASSET_SITE_PATH_PRIMARY)
  ? ASSET_SITE_PATH_PRIMARY
  : ASSET_SITE_PATH_FALLBACK;

const PUBLIC_IMAGES = path.join(process.cwd(), "public", "images");
const COMPANY_OUT = path.join(PUBLIC_IMAGES, "company");
const COMPANY_FOLDERS = [
  path.join(ASSET_LIBRARY, "公司照片1"),
  path.join(ASSET_LIBRARY, "公司照片2"),
  path.join(ASSET_LIBRARY, "公司照片3"),
];

const COMPANY_MAP: Record<string, string[]> = {
  warehouse: ["仓库"],
  workshop: ["生产车间"],
  frontdesk: ["前台"],
  office: ["公司办公室", "办公室", "办公"],
  meeting: ["会议室"],
};

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.warn("Missing:", src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function syncCompanyPhotos() {
  fs.mkdirSync(COMPANY_OUT, { recursive: true });
  for (const [key, keywords] of Object.entries(COMPANY_MAP)) {
    const dest = path.join(COMPANY_OUT, `${key}.png`);
    for (const folder of COMPANY_FOLDERS) {
      if (!fs.existsSync(folder)) continue;
      for (const file of fs.readdirSync(folder)) {
        if (!/\.(png|jpg|jpeg|webp)$/i.test(file)) continue;
        if (keywords.some((kw) => file.includes(kw))) {
          fs.copyFileSync(path.join(folder, file), dest);
          console.log(`Company: ${key} <- ${file}`);
          break;
        }
      }
      if (fs.existsSync(dest)) break;
    }
  }
}

console.log("Asset root:", ASSET_LIBRARY);
console.log("Site images:", SITE_SRC);
const PRODUCTS_DIR = path.join(PUBLIC_IMAGES, "products");
let productsBackup: string | null = null;
if (fs.existsSync(PRODUCTS_DIR)) {
  productsBackup = path.join(process.cwd(), ".sync-products-backup");
  if (fs.existsSync(productsBackup)) fs.rmSync(productsBackup, { recursive: true });
  fs.cpSync(PRODUCTS_DIR, productsBackup, { recursive: true });
}
if (fs.existsSync(PUBLIC_IMAGES)) {
  fs.rmSync(PUBLIC_IMAGES, { recursive: true });
}
copyDir(SITE_SRC, PUBLIC_IMAGES);
if (productsBackup && fs.existsSync(productsBackup)) {
  fs.cpSync(productsBackup, PRODUCTS_DIR, { recursive: true });
  fs.rmSync(productsBackup, { recursive: true });
  console.log("Preserved public/images/products/");
}
syncCompanyPhotos();
console.log("Done.");
