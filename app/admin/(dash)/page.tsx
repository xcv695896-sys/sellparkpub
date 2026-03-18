import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [orders, products, accounts] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.account.count({ where: { sold: false } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-400">Orders</p>
          <p className="text-3xl font-bold text-white">{orders}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-400">Products</p>
          <p className="text-3xl font-bold text-white">{products}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-400">Unsold accounts</p>
          <p className="text-3xl font-bold text-emerald-400">{accounts}</p>
        </div>
      </div>
    </div>
  );
}
