import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconVerified } from "@/components/shop/Icons";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Products</h1>
      <p className="mt-2 text-slate-600">All available accounts</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/p/${p.slug}`}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-32 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold text-slate-300">
              {p.name.slice(0, 4)}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-bold text-slate-900">{p.name}</span>
              <IconVerified />
            </div>
            <p className="mt-1 font-bold text-slate-900">${(p.priceCents / 100).toFixed(2)} USD</p>
            <span className="mt-3 inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
              View
            </span>
          </Link>
        ))}
      </div>
      {products.length === 0 && (
        <p className="py-20 text-center text-slate-500">No products yet.</p>
      )}
    </div>
  );
}
