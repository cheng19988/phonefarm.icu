# Deploy & Git Push (phonefarm.icu)

## Git remote

Set your GitHub repo URL (repo name should be `phonefarm.icu`):

```bash
cd D:\phonefarm.icu
git remote set-url origin https://github.com/YOUR_GITHUB_USER/phonefarm.icu.git
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

## Production

Copy `.env.example` to `.env`, set `JWT_SECRET` and admin password, then:

```bash
npm run build
npm start
```
