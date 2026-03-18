import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/shop/AddToCart";
import { IconStar, IconVerified } from "@/components/shop/Icons";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, active: true },
  });
  if (!product) notFound();

  const stock = await prisma.account.count({ where: { productId: product.id, sold: false } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-slate-100 text-4xl font-bold text-slate-300">
          {product.name}
        </div>
        <div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            In stock: {stock}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <IconStar key={i} className="h-4 w-4" />
              ))}
            </div>
            <IconVerified />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">${(product.priceCents / 100).toFixed(2)} USD</p>
          {product.description && <p className="mt-4 text-slate-600">{product.description}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            {stock > 0 ? (
              <AddToCart productId={product.id} />
            ) : (
              <p className="text-red-600">Out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
