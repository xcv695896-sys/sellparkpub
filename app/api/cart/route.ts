import { NextRequest, NextResponse } from "next/server";
import { getCart, setCart, type CartLine } from "@/lib/cart";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ cart: getCart() });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { lines?: CartLine[] };
  const lines = body.lines?.filter((l) => l.quantity > 0 && l.productId) ?? [];
  setCart(lines);
  return NextResponse.json({ ok: true });
}
