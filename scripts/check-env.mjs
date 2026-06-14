#!/usr/bin/env node
/**
 * Validates required/optional env vars. Prints names + status only (no secret values).
 * Usage: node scripts/check-env.mjs [.env path]
 */
import { config } from "dotenv";
import { resolve } from "node:path";

const envPath = process.argv[2] ? resolve(process.argv[2]) : resolve(".env");
config({ path: envPath });
console.log(`Checking: ${envPath}\n`);

const REQUIRED = [
  {
    name: "DATABASE_URL",
    validate: (v) => {
      if (!/^postgres(ql)?:\/\//i.test(v)) return "must start with postgresql://";
      if (/user:password@|ep-xxx/i.test(v)) return "looks like .env.example placeholder";
      if (v.length < 40) return "too short for a real connection string";
      return null;
    },
  },
  {
    name: "JWT_SECRET",
    validate: (v) => {
      if (v.length < 32) return "should be at least 32 characters";
      if (/change-me|dev-secret/i.test(v)) return "still using a default-like value";
      return null;
    },
  },
  {
    name: "ADMIN_EMAIL",
    validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "invalid email format"),
  },
  {
    name: "ADMIN_PASSWORD",
    validate: (v) => {
      if (v === "admin123456" || v === "change-me") return "still using default password";
      if (v.length < 10) return "recommend at least 10 characters";
      return null;
    },
  },
];

const RECOMMENDED = [
  {
    name: "DIRECT_DATABASE_URL",
    validate: (v) => {
      if (!/^postgres(ql)?:\/\//i.test(v)) return "must start with postgresql://";
      if (/-pooler|6543|pgbouncer/i.test(v)) return "use direct host, not pooler, for migrations";
      return null;
    },
  },
];

const OPTIONAL_GROUPS = [
  {
    label: "Telegram inquiry notifications",
    vars: ["INQUIRY_NOTIFY_ENABLED", "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"],
    enabledWhen: (env) => env.INQUIRY_NOTIFY_ENABLED === "true",
    validateEnabled: (env) => {
      if (!env.TELEGRAM_BOT_TOKEN) return "TELEGRAM_BOT_TOKEN required when notifications enabled";
      if (!env.TELEGRAM_CHAT_ID) return "TELEGRAM_CHAT_ID required when notifications enabled";
      return null;
    },
  },
  {
    label: "Automatic USDT verification (not fully implemented)",
    vars: ["PAYMENT_AUTO_VERIFY", "TRON_API_KEY"],
    enabledWhen: (env) => env.PAYMENT_AUTO_VERIFY === "true",
    validateEnabled: (env) => {
      if (!env.TRON_API_KEY) return "TRON_API_KEY required when PAYMENT_AUTO_VERIFY=true";
      return "Tron API integration is TODO — manual admin confirmation is the supported path";
    },
  },
];

function status(name, issue) {
  if (issue === "missing") return { name, state: "MISSING" };
  if (issue) return { name, state: "WARN", issue };
  return { name, state: "OK" };
}

const results = [];

for (const { name, validate } of REQUIRED) {
  const v = process.env[name]?.trim();
  if (!v) results.push(status(name, "missing"));
  else results.push(status(name, validate(v)));
}

for (const { name, validate } of RECOMMENDED) {
  const v = process.env[name]?.trim();
  if (!v) results.push({ name, state: "OPTIONAL_MISSING", issue: "recommended for prisma migrate deploy" });
  else results.push(status(name, validate(v)));
}

for (const group of OPTIONAL_GROUPS) {
  const env = process.env;
  if (group.enabledWhen(env)) {
    const issue = group.validateEnabled(env);
    for (const v of group.vars) {
      if (!env[v]?.trim()) results.push(status(v, "missing"));
      else results.push({ name: v, state: issue ? "WARN" : "OK", issue: issue || undefined });
    }
  } else {
    for (const v of group.vars) {
      results.push({
        name: v,
        state: env[v]?.trim() ? "OK" : "SKIPPED",
        issue: "not required unless feature enabled",
      });
    }
  }
}

const bad = results.filter((r) => r.state === "MISSING" || r.state === "WARN");
const ok = results.filter((r) => r.state === "OK");

console.log("=== PhoneFarm ICU env check ===\n");
for (const r of results) {
  const tag = r.state.padEnd(16);
  console.log(`${tag} ${r.name}${r.issue ? ` — ${r.issue}` : ""}`);
}
console.log(`\nSummary: ${ok.length} OK, ${bad.length} need attention`);

if (bad.some((r) => r.state === "MISSING" && REQUIRED.some((req) => req.name === r.name))) {
  process.exit(1);
}
