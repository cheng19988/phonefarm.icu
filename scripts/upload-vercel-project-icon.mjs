#!/usr/bin/env node
/**
 * Upload PhoneFarm icon to Vercel project avatar (dashboard deployment list).
 * Requires VERCEL_ACCESS_TOKEN with project write scope (Account Token from vercel.com/account/tokens).
 * During Vercel build, VERCEL_ORG_ID and VERCEL_PROJECT_ID are auto-injected when token is set.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function getToken() {
  if (process.env.VERCEL_ACCESS_TOKEN) return process.env.VERCEL_ACCESS_TOKEN;
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN;
  const authPath = path.join(
    process.env.APPDATA || process.env.HOME || "",
    "xdg.data",
    "com.vercel.cli",
    "auth.json",
  );
  try {
    const auth = JSON.parse(fs.readFileSync(authPath, "utf8"));
    return auth.token;
  } catch {
    return null;
  }
}

const DEFAULT_TEAM_ID = "team_n4PA5j82tAAcOGBKSqNocaUq";
const DEFAULT_PROJECT_ID = "prj_Ig8nPhgKOZ3kWw7u2J4jc9ProYus";

async function main() {
  const token = await getToken();
  if (!token) {
    console.log("[vercel-avatar] Skip: no VERCEL_ACCESS_TOKEN / CLI auth.");
    return;
  }

  const teamId = process.env.VERCEL_ORG_ID || process.env.VERCEL_TEAM_ID || DEFAULT_TEAM_ID;
  const projectId = process.env.VERCEL_PROJECT_ID || "phonefarm-icu";
  const iconPath = path.join(root, "public", "icon.svg");

  if (!fs.existsSync(iconPath)) {
    console.error("[vercel-avatar] Missing public/icon.svg");
    process.exit(1);
  }

  const body = fs.readFileSync(iconPath);

  if (!teamId) {
    console.log("[vercel-avatar] Skip: team id missing.");
    return;
  }

  const projectCandidates = [
    projectId,
    process.env.VERCEL_PROJECT_ID || DEFAULT_PROJECT_ID,
    "phonefarm-icu",
  ].filter((v, i, a) => v && a.indexOf(v) === i);

  const contentTypes = ["image/svg+xml", "image/png", "application/octet-stream"];
  let lastError = "";

  for (const pid of projectCandidates) {
    for (const ct of contentTypes) {
      const url = `https://api.vercel.com/v1/projects/${pid}/avatar?teamId=${encodeURIComponent(teamId)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": ct,
        },
        body,
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`[vercel-avatar] OK — project ${data.name || pid} avatar updated.`);
        return;
      }
      lastError = `${pid} ${ct} → ${res.status}: ${(await res.text()).slice(0, 160)}`;
    }
  }

  console.warn(`[vercel-avatar] Upload failed. ${lastError}`);
  console.warn(
    "[vercel-avatar] CLI 登录令牌权限不足。请在 https://vercel.com/account/tokens 创建 Full Account Token，然后执行：",
  );
  console.warn("  npx vercel env add VERCEL_ACCESS_TOKEN");
  console.warn("（粘贴 Token，环境选 All 或 production；无需找 Production 勾选框）");
}

main().catch((err) => {
  console.warn("[vercel-avatar] Error:", err.message);
});
