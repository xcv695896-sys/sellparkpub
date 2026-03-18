# SellPark — Account shop + agency site

Vercel-ready **digital account shop** (guest checkout, Stripe, Plisio crypto, email delivery, live TOTP for 2FA stock) plus **SellPark dev services** at `/sellpark`.

## Setup

1. **PostgreSQL** — [Neon](https://neon.tech), Supabase, or Vercel Postgres. Set `DATABASE_URL` in `.env`.

2. **Install & DB**
   ```bash
   npm install
   npx prisma db push
   npm run db:seed
   ```

3. **Admin login** — Default: **admin@sellpark.io** / **Admin1234!** (works if `ADMIN_PASSWORD_HASH` is empty). For production, run `npm run admin:hash YourNewPassword`, set `ADMIN_PASSWORD_HASH`, and set a strong `ADMIN_SESSION_SECRET`.

4. **Stripe** — `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (for future Elements), `STRIPE_WEBHOOK_SECRET`. Webhook URL: `https://your-domain.com/api/webhooks/stripe` → `checkout.session.completed`.

5. **Plisio** — `PLISIO_API_KEY`. Callback URL in dashboard: `https://your-domain.com/api/webhooks/plisio` (optional; success flow also calls verify API).

6. **SMTP** — `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` for order delivery emails.

7. **App URL** — `NEXT_PUBLIC_APP_URL=https://your-domain.com`

8. **hCaptcha (optional)** — `HCAPTCHA_SECRET` + `NEXT_PUBLIC_HCAPTCHA_SITEKEY` if you wire the token into checkout.

## Features

| Feature | Notes |
|--------|--------|
| Shop UI | Light theme, product grid, cart, checkout (screenshot-inspired) |
| Guest checkout | Email + Stripe or Plisio |
| Auto delivery | SMTP email with private link `/orders/[token]` |
| 2FA / OTP | Bulk format `email\|password\|BASE32_SECRET` — live TOTP on delivery page |
| Admin | Products, bulk stock import, dashboard |
| CAPTCHA | hCaptcha **verification** only — we do **not** implement CAPTCHA bypass |

## Bulk stock format

```
email@x.com|password123
email2@x.com|pass456|JBSWY3DPEHPK3PXP
```

## Deploy (Vercel)

- Connect repo, add env vars, deploy.
- Run `prisma db push` against production DB (or use migrations).

## Routes

- `/` — Shop home  
- `/products`, `/p/[slug]`, `/cart`, `/checkout`  
- `/orders/[token]` — Delivery (after payment)  
- `/admin/login`, `/admin` — Dashboard  
- `/sellpark/*` — Original SellPark marketing pages  
