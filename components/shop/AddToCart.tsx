"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCart({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function add() {
    setLoading(true);
    const r = await fetch("/api/cart");
    const { cart } = await r.json();
    const lines = (cart as { productId: string; quantity: number }[]) ?? [];
    const i = lines.findIndex((l) => l.productId === productId);
    if (i >= 0) lines[i] = { ...lines[i], quantity: lines[i].quantity + 1 };
    else lines.push({ productId, quantity: 1 });
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });
    setLoading(false);
    router.push("/cart");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={add}
      disabled={loading}
      className="rounded-xl bg-blue-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? "Adding…" : "Add to cart"}
    </button>
  );
}
