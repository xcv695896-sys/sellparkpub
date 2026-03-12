# SellPark — sellpark.io

Website for **SellPark**: coding and crypto payment solutions for digital and software shops.

- **Stack:** Next.js 14, TypeScript, Tailwind CSS
- **Deploy:** Vercel (recommended)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (or connect your Git provider in Vercel).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import this repository.
3. Leave **Build Command** as `next build` and **Output Directory** as default.
4. Deploy. Vercel will detect Next.js and set everything automatically.

Or with Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Logo

Place your SellPark logo at **`public/logo.png`**. If it’s missing, the site falls back to the included `public/logo.svg` placeholder.

## Pages

- **Home** — Hero, services overview, crypto gateway, projects (perv.gg), CTA, Telegram contact
- **Services** — Shop development, Stripe → Crypto, custom crypto gateway (and “which gateways we implement”)
- **Projects** — Featured: perv.gg
- **About** — What we do, focus, contact
- **Contact** — Telegram t.me/nmar200
- **Terms of Service** — `/terms`
- **Privacy Policy** — `/privacy`

Contact for clients: **t.me/nmar200**

---

## Push to GitHub

Repo: [https://github.com/xcv695896-sys/sellparkpub](https://github.com/xcv695896-sys/sellparkpub)

**Option A — Run the script (PowerShell):**
```powershell
cd c:\Users\autob\Desktop\projects\sellpark.io
.\push-to-github.ps1
```

**Option B — Manual commands:**
```bash
cd c:\Users\autob\Desktop\projects\sellpark.io
git init
git add .
git commit -m "Initial commit: SellPark website"
git branch -M main
git remote add origin https://github.com/xcv695896-sys/sellparkpub.git
git push -u origin main
```

If GitHub asks for auth: use a [Personal Access Token](https://github.com/settings/tokens) (HTTPS) or set up [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
