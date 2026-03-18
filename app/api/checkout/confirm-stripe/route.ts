import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfillOrder } from "@/lib/fulfill-order";

export async function POST(req: NextRequest) {
  const { sessionId } = (await req.json()) as { sessionId?: string };
  if (!sessionId) return NextResponse.json({ error: "missing" }, { status: 400 });
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) return NextResponse.json({ error: "stripe" }, { status: 500 });
  const stripe = new Stripe(sk);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ pending: true });
  }
  const orderId = session.metadata?.orderId;
  if (!orderId) return NextResponse.json({ error: "no_order" }, { status: 400 });
  const r = await fulfillOrder(orderId);
  return NextResponse.json(r);
}
