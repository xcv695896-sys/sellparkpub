"use client";

import { useState } from "react";

export default function BulkForm({ products }: { products: { id: string; name: string }[] }) {
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [raw, setRaw] = useState("");
  const [result, setResult] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult("…");
    const r = await fetch("/api/admin/stock/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, raw }),
    });
    const d = await r.json();
    setResult(`Added ${d.added}. ${d.errors?.length ? d.errors.join("; ") : ""}`);
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={12}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white"
        placeholder={"user@mail.com|MyPassword123\nuser2@mail.com|Pass456|JBSWY3DPEHPK3PXP"}
      />
      <button type="submit" className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white">
        Import
      </button>
      {result && <p className="text-slate-300">{result}</p>}
    </form>
  );
}
