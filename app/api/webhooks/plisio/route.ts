import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fulfillOrder } from "@/lib/fulfill-order";

/** Plisio may call with GET (txn_id, status, order_number) — verify in dashboard docs */
export async function GET(req: NextRequest) {
  const txnId = req.nextUrl.searchParams.get("txn_id");
  const orderNumber = req.nextUrl.searchParams.get("order_number");
  const status = req.nextUrl.searchParams.get("status")?.toLowerCase();
  if (!["completed", "mispaid"].includes(status || "")) {
    return NextResponse.json({ ok: true });
  }
  const order = orderNumber
    ? await prisma.order.findUnique({ where: { id: orderNumber } })
    : txnId
      ? await prisma.order.findFirst({ where: { plisioTxnId: txnId } })
      : null;
  if (order && order.status !== "paid") {
    await fulfillOrder(order.id);
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const orderId = (body as { order_number?: string }).order_number;
  const status = String((body as { status?: string }).status || "").toLowerCase();
  if (orderId && ["completed", "mispaid"].includes(status)) {
    await fulfillOrder(orderId);
  }
  return NextResponse.json({ ok: true });
}
