import { prisma } from "@/lib/prisma";
import ProductForm from "./ProductForm";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { accounts: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Products</h1>
      <ProductForm />
      <ul className="mt-8 space-y-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          >
            <div>
              <p className="font-semibold text-white">{p.name}</p>
              <p className="text-sm text-slate-500">
                /p/{p.slug} · ${(p.priceCents / 100).toFixed(2)} · {p._count.accounts} accounts
              </p>
            </div>
            <span className={p.active ? "text-emerald-400" : "text-slate-500"}>
              {p.active ? "Active" : "Hidden"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
