import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfillOrder } from "@/lib/fulfill-order";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!secret || !sk) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "no_sig" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = new Stripe(sk).webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) await fulfillOrder(orderId);
  }

  return NextResponse.json({ received: true });
}
