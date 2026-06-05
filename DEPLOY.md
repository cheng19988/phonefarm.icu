# Deploy & Git Push (phonefarm.icu)

## Git remote

Set your GitHub repo URL (repo name should be `phonefarm.icu`):

```bash
cd D:\phonefarm.icu
git remote set-url origin https://github.com/cheng19988/phonefarm.icu.git
git push -u origin main
```

If you use a local proxy (e.g. Clash on 7890):

```bash
git -c http.proxy=http://127.0.0.1:7890 -c https.proxy=http://127.0.0.1:7890 push -u origin main
```

## Images

```bash
npm run sync-assets
```

Primary path: `D:\网站搭建素材库\FINAL_phonefarm_6sites_package_CN\02_六个网站分类素材\02_phonefarm.icu_product_catalog_site`  
Fallback: `D:\网站搭建素材库\02_six_website_ready\phonefarm.icu_product_catalog_site`

---

## Database (PostgreSQL)

This project uses **Prisma 7 + PostgreSQL** (`@prisma/adapter-pg` + `pg`). Schema is versioned in `prisma/migrations/`.

| Environment | Recommended provider |
|-------------|---------------------|
| Local dev | Docker Postgres, or free [Neon](https://neon.tech) / [Supabase](https://supabase.com) dev branch |
| Vercel production | **Neon**, **Supabase**, or **Vercel Postgres** (Marketplace) |

### Connection strings (pooled vs direct)

| Variable | Use | Example |
|----------|-----|---------|
| `DATABASE_URL` | **Runtime** (Next.js app on Vercel) | Pooled URL (`-pooler` host on Neon, port `6543` on Supabase) |
| `DIRECT_DATABASE_URL` | **Migrations & seed** (CLI, local, CI) | Direct (non-pooled) URL |

Copy `.env.example` to `.env` and set both URLs when your provider separates pooled and direct endpoints.

`prisma.config.ts` (Prisma CLI) reads `DIRECT_DATABASE_URL` first, then falls back to `DATABASE_URL`.  
`src/lib/prisma.ts` (runtime) always uses `DATABASE_URL` (pooled).

### Local development

```bash
npm install
npx prisma validate          # verify schema — no database required

# When you have a real Postgres database:
npm run db:migrate:dev       # prisma migrate dev — apply migrations + dev workflow
npm run db:seed              # sync products + admin user (uses DIRECT_DATABASE_URL || DATABASE_URL)
```

For a new schema change during development:

```bash
npm run db:migrate:dev -- --name describe_your_change
```

### Production migrations

**Do not use `db:push` as the long-term production workflow.** Use checked-in migrations:

```bash
# CI / deploy hook / manual — requires DIRECT_DATABASE_URL or direct DATABASE_URL
npm run db:migrate           # prisma migrate deploy
npm run db:seed              # once after first deploy, or when re-seeding products
```

### Rotate admin password (production)

Set in Vercel (names must be exact):

- `ADMIN_EMAIL` — admin login email
- `ADMIN_PASSWORD` — new plain-text password (seed hashes with bcrypt; never stored in code)

Re-run seed against Neon (no SQL needed):

```bash
# Option A — from your machine with Neon direct URL
DIRECT_DATABASE_URL="postgresql://...direct..." ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="your-new-password" npm run db:seed

# Option B — one Vercel production deploy with build command npm run vercel-build
# (uses Vercel env vars during build; migrate deploy is idempotent)
```

Seed upserts the admin user and **updates `passwordHash`** when the account already exists. If `ADMIN_EMAIL` differs from the old default `admin@phonefarm.icu`, the default account is removed.

`npm run build` runs `prisma generate` only. **Build does not require a live database** — product pages fall back to `src/data/products.ts` if the DB is unreachable.

Initial migration: `prisma/migrations/20250606000000_init/` (generated via `prisma migrate diff`, not executed against a database in CI).

### Migrating from old SQLite data

If you have inquiry rows in a local `dev.db` file, export them manually and import into Postgres, or re-seed and accept a fresh CRM.

---

## Vercel environment variables

| Variable | Example | Notes |
|----------|---------|--------|
| `DATABASE_URL` | `postgresql://...pooler.../neondb?sslmode=require` | **Required** — pooled URL for runtime |
| `DIRECT_DATABASE_URL` | `postgresql://...direct.../neondb?sslmode=require` | For build/CI migrate only (optional on Vercel if you migrate from local) |
| `JWT_SECRET` | long random string | **Required** for admin login |
| `ADMIN_EMAIL` | `admin@phonefarm.icu` | Admin account (seed) |
| `ADMIN_PASSWORD` | strong password | Admin password (seed) |
| `INQUIRY_NOTIFY_ENABLED` | `true` | Optional — Telegram alert on new inquiry |
| `TELEGRAM_BOT_TOKEN` | from @BotFather | Required if notifications enabled |
| `TELEGRAM_CHAT_ID` | your chat or group id | Required if notifications enabled |

`vercel.json` uses `npm run build` (= `prisma generate && next build`). It does **not** run migrations or seed.

**Recommended first deploy:**

1. Set `DATABASE_URL` (pooled) on Vercel for runtime.
2. From your machine or CI with **direct** URL:
   ```bash
   DIRECT_DATABASE_URL="postgresql://...direct..." npm run db:migrate
   DIRECT_DATABASE_URL="postgresql://...direct..." npm run db:seed
   ```
3. Deploy — app connects via pooled `DATABASE_URL`.

Optional: set Vercel **Build Command** to `npm run vercel-build` to run `migrate deploy` + seed during build (requires `DIRECT_DATABASE_URL` or direct `DATABASE_URL` at build time).

### Telegram inquiry notifications

1. Create a bot via [@BotFather](https://t.me/BotFather) and copy the token.
2. Get your `chat_id` (message @userinfobot or add the bot to a group).
3. Set in Vercel / `.env`:

```
INQUIRY_NOTIFY_ENABLED=true
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

If variables are missing or `INQUIRY_NOTIFY_ENABLED` is not `true`, form submission still works — no notification is sent. **Never commit real tokens.**

---

## Production (self-hosted)

Copy `.env.example` to `.env`, set `JWT_SECRET`, `DATABASE_URL`, `DIRECT_DATABASE_URL`, and admin password, then:

```bash
npm run db:migrate && npm run db:seed
npm run build
npm start
```

Inquiries are stored in `ContactSubmission` with status: New, Contacted, Quoted, Closed, Spam. Manage at `/admin` after login.
