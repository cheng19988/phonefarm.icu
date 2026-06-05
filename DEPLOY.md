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

## Vercel

Required environment variables in Vercel project settings:

| Variable | Example | Notes |
|----------|---------|--------|
| `JWT_SECRET` | long random string | Required |
| `DATABASE_URL` | `file:./prisma/vercel.db` | Required for inquiries, orders, and admin |
| `INQUIRY_NOTIFY_ENABLED` | `true` | Optional — send Telegram alert on new inquiry |
| `TELEGRAM_BOT_TOKEN` | from @BotFather | Required if notifications enabled |
| `TELEGRAM_CHAT_ID` | your chat or group id | Required if notifications enabled |

Build uses `npm run build` (no DB seed during build). Product pages fall back to static catalog if DB is unavailable.

### Telegram inquiry notifications

1. Create a bot via [@BotFather](https://t.me/BotFather) and copy the token.
2. Get your `chat_id` (message @userinfobot or add the bot to a group).
3. Set in Vercel / `.env`:

```
INQUIRY_NOTIFY_ENABLED=true
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

If variables are missing or `INQUIRY_NOTIFY_ENABLED` is not `true`, form submission still works — no notification is sent.

### Database migration (inquiry status fields)

After pulling latest code on a server with existing SQLite DB:

```bash
npm run db:push
npm run db:seed
```

For full shop features on Vercel, add a hosted DB (e.g. Vercel Postgres / Turso) or commit a seeded SQLite file and set `DATABASE_URL`.

## Production (self-hosted)

Copy `.env.example` to `.env`, set `JWT_SECRET` and admin password, then:

```bash
npm run db:push && npm run db:seed
npm run build
npm start
```

Inquiries are stored in `ContactSubmission` with status: New, Contacted, Quoted, Closed, Spam. Manage at `/admin` after login.
