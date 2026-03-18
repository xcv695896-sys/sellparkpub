import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCart } from "@/lib/cart";
import CartClient from "./CartClient";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = getCart();
  const products = await prisma.product.findMany({
    where: { id: { in: cart.map((c) => c.productId) } },
  });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  const lines = cart
    .map((l) => {
      const p = byId[l.productId];
      if (!p) return null;
      return { ...l, product: p };
    })
    .filter(Boolean) as { productId: string; quantity: number; product: (typeof products)[0] }[];

  const subtotal = lines.reduce((s, l) => s + l.product.priceCents * l.quantity, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
      {lines.length === 0 ? (
        <p className="mt-8 text-slate-600">
          Your cart is empty.{" "}
          <Link href="/products" className="text-blue-600 underline">
            Browse products
          </Link>
        </p>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartClient
              initialLines={lines.map((l) => ({
                productId: l.productId,
                quantity: l.quantity,
                name: l.product.name,
                priceCents: l.product.priceCents,
              }))}
            />
            <Link href="/products" className="mt-6 inline-flex items-center gap-2 text-sm text-blue-600">
              ← Continue shopping
            </Link>
          </div>
          <div className="h-fit rounded-2xl border border-slate-200 bg-slate-100/80 p-6">
            <p className="text-sm text-slate-600">Subtotal</p>
            <p className="text-xl font-bold text-slate-900">${(subtotal / 100).toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-600">Total</p>
            <p className="text-xl font-bold text-slate-900">${(subtotal / 100).toFixed(2)}</p>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-xl bg-blue-500 py-3 text-center font-semibold text-white hover:bg-blue-600"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
