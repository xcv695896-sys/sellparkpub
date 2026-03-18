"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function SuccessInner() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const orderId = sp.get("order");
  const [msg, setMsg] = useState("Confirming payment…");

  useEffect(() => {
    async function run() {
      if (sessionId) {
        const r = await fetch("/api/checkout/confirm-stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const d = await r.json();
        if (d.ok || d.already) {
          setMsg("Payment confirmed! Check your email for the delivery link.");
        } else if (d.pending) setMsg("Payment processing… refresh in a moment.");
        else setMsg("Something went wrong. Contact support.");
        return;
      }
      if (orderId) {
        const r = await fetch("/api/checkout/verify-plisio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const d = await r.json();
        if (d.ok || d.already) {
          setMsg("Payment confirmed! Check your email for the delivery link.");
        } else if (d.pending) {
          setMsg("Waiting for crypto confirmation — check email when paid, or refresh this page.");
        } else setMsg(JSON.stringify(d));
        return;
      }
      setMsg("Thank you. If you paid, check your email.");
    }
    run();
  }, [sessionId, orderId]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Order status</h1>
      <p className="mt-4 text-slate-600">{msg}</p>
      <Link href="/" className="mt-8 inline-block text-blue-600 underline">
        Back to shop
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="p-20 text-center">Loading…</p>}>
      <SuccessInner />
    </Suspense>
  );
}
