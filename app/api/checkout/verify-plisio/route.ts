import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fulfillOrder } from "@/lib/fulfill-order";

/** Call after Plisio redirect success to confirm payment and deliver */
export async function POST(req: NextRequest) {
  const { orderId } = (await req.json()) as { orderId?: string };
  if (!orderId) return NextResponse.json({ error: "missing" }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || order.paymentMethod !== "plisio") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (order.status === "paid") {
    return NextResponse.json({ ok: true, already: true });
  }

  const apiKey = process.env.PLISIO_API_KEY;
  const txnId = order.plisioTxnId;
  if (!apiKey || !txnId) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.plisio.net/api/v1/operations/invoice?api_key=${encodeURIComponent(apiKey)}&txn_id=${encodeURIComponent(txnId)}`
  );
  const data = (await res.json()) as { status?: string; data?: { status?: string } };
  const inv = data.data?.status?.toLowerCase();
  if (data.status === "success" && (inv === "completed" || inv === "mispaid")) {
    const r = await fulfillOrder(orderId);
    return NextResponse.json(r);
  }
  return NextResponse.json({ pending: true, invoiceStatus: inv });
}
