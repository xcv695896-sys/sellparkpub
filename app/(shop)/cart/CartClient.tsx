"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Line = { productId: string; quantity: number; name: string; priceCents: number };

export default function CartClient({ initialLines }: { initialLines: Line[] }) {
  const [lines, setLines] = useState(initialLines);
  const router = useRouter();

  async function save(next: Line[]) {
    setLines(next);
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: next.map((l) => ({ productId: l.productId, quantity: l.quantity })) }),
    });
    router.refresh();
  }

  return (
    <ul className="space-y-4">
      {lines.map((l) => (
        <li
          key={l.productId}
          className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <div>
            <p className="font-semibold text-slate-900">{l.name}</p>
            <p className="text-sm text-slate-500">1 month warranty</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-1"
              onClick={() => {
                const q = Math.max(1, l.quantity - 1);
                save(lines.map((x) => (x.productId === l.productId ? { ...x, quantity: q } : x)));
              }}
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{l.quantity}</span>
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-1"
              onClick={() => {
                save(lines.map((x) => (x.productId === l.productId ? { ...x, quantity: x.quantity + 1 } : x)));
              }}
            >
              +
            </button>
            <span className="ml-4 font-bold text-slate-900">${((l.priceCents * l.quantity) / 100).toFixed(2)}</span>
            <button
              type="button"
              className="text-sm text-red-600"
              onClick={() => save(lines.filter((x) => x.productId !== l.productId))}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
