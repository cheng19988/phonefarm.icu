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
| `DATABASE_URL` | `file:./prisma/vercel.db` | Optional for catalog fallback; required for orders/login |

Build uses `npm run build` (no DB seed during build). Product pages fall back to static catalog if DB is unavailable.

For full shop features on Vercel, add a hosted DB (e.g. Vercel Postgres / Turso) or commit a seeded SQLite file and set `DATABASE_URL`.

## Production (self-hosted)

Copy `.env.example` to `.env`, set `JWT_SECRET` and admin password, then:

```bash
npm run db:push && npm run db:seed
npm run build
npm start
```
