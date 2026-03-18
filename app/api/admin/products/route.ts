import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { accounts: { where: { sold: false } } } } },
  });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const b = (await req.json()) as {
    name: string;
    slug: string;
    priceCents: number;
    description?: string;
    category?: string;
  };
  if (!b.name || !b.slug || !b.priceCents) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const p = await prisma.product.create({
    data: {
      name: b.name,
      slug: b.slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase(),
      priceCents: Math.round(b.priceCents),
      description: b.description,
      category: b.category,
    },
  });
  return NextResponse.json({ product: p });
}
