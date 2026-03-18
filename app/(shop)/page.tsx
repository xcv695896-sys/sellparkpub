import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconStar, IconHeart, IconVerified } from "@/components/shop/Icons";

export const dynamic = "force-dynamic";

export default async function ShopHome() {
  const products = await prisma.product.findMany({
    where: { active: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-orange-500">Trusted accounts</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              The right place for your next{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                account
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Instant delivery to your email. Warranty & replacements. Pay with card or crypto.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-blue-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600"
            >
              Browse products
            </Link>
          </div>
          {products[0] && (
            <div className="relative mx-auto w-full max-w-sm">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    <IconStar className="h-4 w-4" />
                    <span className="text-sm font-medium text-slate-700">5.0</span>
                  </div>
                  <button type="button" className="text-slate-400" aria-label="Wishlist">
                    <IconHeart />
                  </button>
                </div>
                <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold text-slate-300">
                  {products[0].name.slice(0, 2)}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{products[0].name}</h3>
                  <IconVerified />
                </div>
                <p className="text-sm text-slate-500">From ${(products[0].priceCents / 100).toFixed(2)}</p>
                <Link
                  href={`/p/${products[0].slug}`}
                  className="mt-4 block w-full rounded-xl bg-blue-500 py-3 text-center font-semibold text-white hover:bg-blue-600"
                >
                  View
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-orange-500">Features</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">A platform built for you</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">
          Fast delivery, multiple payment options, and prioritized security.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Auto delivery", d: "Accounts sent to your email automatically after payment." },
            { t: "24/7 support", d: "Reach us anytime if something needs a replacement." },
            { t: "Stripe & crypto", d: "Pay with card via Stripe or cryptocurrency via Plisio." },
            { t: "2FA / OTP view", d: "For accounts with Google Authenticator, see live OTP on your order page." },
            { t: "Guest checkout", d: "No account required — just email and pay." },
            { t: "Secure", d: "Delivery links are unique and private to your order." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">{f.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">Our best sellers</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/p/${p.slug}`}
                className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-28 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-400">
                  {p.name.slice(0, 3)}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{p.name}</span>
                  <IconVerified />
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">${(p.priceCents / 100).toFixed(2)} USD</p>
                <span className="mt-3 inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white group-hover:bg-blue-600">
                  View
                </span>
              </Link>
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-slate-500">
              No products yet.{" "}
              <Link href="/admin/login" className="text-blue-600 underline">
                Add products in admin
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
