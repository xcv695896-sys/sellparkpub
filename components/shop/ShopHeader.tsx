"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconSearch, IconCart, IconBell } from "./Icons";

export default function ShopHeader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((d) => {
        const n = (d.cart as { quantity: number }[])?.reduce((a, l) => a + l.quantity, 0) ?? 0;
        setCount(n);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
            S
          </span>
          <span className="hidden font-bold text-slate-900 sm:inline">SellPark Accounts</span>
        </Link>
        <div className="mx-auto hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search items"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none ring-blue-500/20 focus:border-blue-300 focus:ring-4"
              readOnly
              onFocus={(e) => e.target.blur()}
            />
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <span className="rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-blue-600 ring-1 ring-blue-200/50">
            Upgrades
          </span>
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
            <IconBell />
          </button>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-600"
          >
            <IconCart className="h-4 w-4" />
            Cart
            {count > 0 && (
              <span className="rounded-full bg-white/20 px-1.5 text-xs">{count}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
