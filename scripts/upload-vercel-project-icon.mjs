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

async function main() {
  const token = await getToken();
  if (!token) {
    console.log("[vercel-avatar] Skip: no VERCEL_ACCESS_TOKEN / CLI auth.");
    return;
  }

  const teamId = process.env.VERCEL_ORG_ID || process.env.VERCEL_TEAM_ID;
  const projectId = process.env.VERCEL_PROJECT_ID || "phonefarm-icu";
  const iconPath = path.join(root, "public", "icon.svg");

  if (!teamId) {
    console.log("[vercel-avatar] Skip: VERCEL_ORG_ID not set (run on Vercel build or pass teamId).");
    return;
  }

  if (!fs.existsSync(iconPath)) {
    console.error("[vercel-avatar] Missing public/icon.svg");
    process.exit(1);
  }

  const body = fs.readFileSync(iconPath);
  const url = `https://api.vercel.com/v1/projects/${projectId}/avatar?teamId=${encodeURIComponent(teamId)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "image/svg+xml",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn(`[vercel-avatar] Upload failed (${res.status}): ${text.slice(0, 200)}`);
    console.warn(
      "[vercel-avatar] Add VERCEL_ACCESS_TOKEN (Full Account) in Vercel → Project → Settings → Environment Variables, then redeploy.",
    );
    return;
  }

  const data = await res.json();
  console.log(`[vercel-avatar] OK — project ${data.name || projectId} avatar updated.`);
}

main().catch((err) => {
  console.warn("[vercel-avatar] Error:", err.message);
});
