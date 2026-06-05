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

This project uses **Prisma 7 + PostgreSQL** (`@prisma/adapter-pg` + `pg`). SQLite is no longer supported.

| Environment | Recommended provider |
|-------------|---------------------|
| Local dev | Docker Postgres, or free [Neon](https://neon.tech) / [Supabase](https://supabase.com) dev branch |
| Vercel production | **Neon**, **Supabase**, or **Vercel Postgres** (Marketplace) |

### Connection strings

Copy `.env.example` to `.env`:

```bash
DATABASE_URL="postgresql://user:password@host:5432/phonefarm?schema=public"
JWT_SECRET="your-local-secret"
ADMIN_EMAIL="admin@phonefarm.icu"
ADMIN_PASSWORD="change-me"
```

**Serverless / Vercel:** use the provider's **pooled** connection string to avoid exhausting connections:

| Provider | Pooled URL hint |
|----------|-----------------|
| Neon | Host contains `-pooler` (e.g. `ep-xxx-pooler.region.aws.neon.tech`) |
| Supabase | Port `6543` (transaction pooler) or `pooler.supabase.com` |
| Vercel Postgres | Use the pooled URL from the Vercel storage dashboard |

Use a **direct** (non-pooled) URL for `db:push` / migrations if the provider recommends it; use **pooled** for runtime (`DATABASE_URL` on Vercel).

### First-time setup

```bash
npm install
npm run db:push      # create tables in Postgres
npm run db:seed      # sync products + admin user
```

`npm run build` runs `prisma generate` (also via `postinstall`). **Build does not require a live database** — product pages fall back to `src/data/products.ts` if the DB is unreachable.

### Schema updates

After pulling Prisma schema changes:

```bash
npx prisma generate   # included in npm run build
npm run db:push       # apply schema (dev / small projects)
# or
npm run db:migrate    # if using prisma migrate deploy in production
```

### Migrating from old SQLite data

If you have inquiry rows in a local `dev.db` file, export them manually (e.g. `sqlite3 dev.db .dump`) and import into Postgres, or re-seed and accept a fresh CRM. Schema field mapping is unchanged (`ContactSubmission` columns match).

---

## Vercel environment variables

| Variable | Example | Notes |
|----------|---------|--------|
| `DATABASE_URL` | `postgresql://...pooler.../neondb?sslmode=require` | **Required** — pooled Postgres URL |
| `JWT_SECRET` | long random string | **Required** for admin login |
| `ADMIN_EMAIL` | `admin@phonefarm.icu` | Admin account (seed) |
| `ADMIN_PASSWORD` | strong password | Admin password (seed) |
| `INQUIRY_NOTIFY_ENABLED` | `true` | Optional — Telegram alert on new inquiry |
| `TELEGRAM_BOT_TOKEN` | from @BotFather | Required if notifications enabled |
| `TELEGRAM_CHAT_ID` | your chat or group id | Required if notifications enabled |

`vercel.json` uses `npm run build` (= `prisma generate && next build`). It does **not** run `db:push` or seed.

**After first deploy:**

1. Set `DATABASE_URL` to your Postgres pooled URL.
2. Run locally (or in CI) against the **direct** URL:
   ```bash
   DATABASE_URL="postgresql://...direct..." npm run db:push
   DATABASE_URL="postgresql://...direct..." npm run db:seed
   ```
3. Redeploy or wait for next build — runtime uses pooled `DATABASE_URL` on Vercel.

Optional: set Vercel **Build Command** to `npm run vercel-build` to push schema + seed during build (only if `DATABASE_URL` is available at build time).

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

Copy `.env.example` to `.env`, set `JWT_SECRET`, `DATABASE_URL`, and admin password, then:

```bash
npm run db:push && npm run db:seed
npm run build
npm start
```

Inquiries are stored in `ContactSubmission` with status: New, Contacted, Quoted, Closed, Spam. Manage at `/admin` after login.
