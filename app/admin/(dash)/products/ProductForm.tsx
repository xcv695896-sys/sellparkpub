"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const priceCents = Math.round(parseFloat(price) * 100);
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        priceCents,
        description: desc,
      }),
    });
    setName("");
    setSlug("");
    setPrice("");
    setDesc("");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-4">
      <p className="font-medium text-white">New product</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
          placeholder="slug-url"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
          placeholder="Price USD"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white sm:col-span-2"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button type="submit" className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
        Create
      </button>
    </form>
  );
}
