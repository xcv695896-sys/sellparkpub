"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBitcoin, IconCard } from "@/components/shop/Icons";

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState<"stripe" | "plisio">("stripe");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setErr("");
    if (!email.includes("@")) {
      setErr("Valid email required");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/checkout/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, payment, hcaptchaToken: "" }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setErr(data.error || "Checkout failed");
      return;
    }
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
      <p className="mt-2 text-sm text-slate-600">Guest checkout — delivery to your email.</p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-blue-500/20 focus:border-blue-400 focus:ring-4"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">Pay with</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPayment("stripe")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                payment === "stripe" ? "border-blue-500 bg-blue-50" : "border-slate-200"
              }`}
            >
              <IconCard className="text-slate-700" />
              <span className="text-sm font-medium">Card (Stripe)</span>
            </button>
            <button
              type="button"
              onClick={() => setPayment("plisio")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                payment === "plisio" ? "border-blue-500 bg-blue-50" : "border-slate-200"
              }`}
            >
              <IconBitcoin className="text-amber-500" />
              <span className="text-sm font-medium">Crypto (Plisio)</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Optional: set <code className="rounded bg-slate-100 px-1">HCAPTCHA_SECRET</code> +{" "}
          <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_HCAPTCHA_SITEKEY</code> and extend checkout to pass
          tokens — we use hCaptcha for human verification only (not bypass).
        </p>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="w-full rounded-xl bg-blue-500 py-4 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Redirecting…" : "Submit payment"}
        </button>
        <Link href="/cart" className="block text-center text-sm text-blue-600">
          Back to cart
        </Link>
      </div>
    </div>
  );
}
