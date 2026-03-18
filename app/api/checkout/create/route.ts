import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCart } from "@/lib/cart";
import { verifyHcaptcha } from "@/lib/captcha";
import { prisma } from "@/lib/prisma";
const appUrl = () => process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    email: string;
    payment: "stripe" | "plisio";
    hcaptchaToken?: string;
  };

  if (!(await verifyHcaptcha(body.hcaptchaToken ?? null))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }
  if (!body.email?.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const cart = getCart();
  if (!cart.length) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: cart.map((c) => c.productId) }, active: true },
  });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  let totalCents = 0;
  const items: { productId: string; quantity: number; unitPriceCents: number }[] = [];
  for (const line of cart) {
    const p = byId[line.productId];
    if (!p) continue;
    const q = Math.min(99, Math.max(1, line.quantity));
    items.push({ productId: p.id, quantity: q, unitPriceCents: p.priceCents });
    totalCents += p.priceCents * q;
  }
  if (!items.length || totalCents < 50) {
    return NextResponse.json({ error: "invalid_cart" }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      email: body.email.trim(),
      status: "pending",
      totalCents,
      paymentMethod: body.payment,
      items: { create: items },
    },
  });

  if (body.payment === "stripe") {
    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) {
      return NextResponse.json({ error: "stripe_not_configured" }, { status: 500 });
    }
    const stripe = new Stripe(sk);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email,
      success_url: `${appUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl()}/cart`,
      metadata: { orderId: order.id },
      line_items: items.map((it) => {
        const p = byId[it.productId]!;
        return {
          quantity: it.quantity,
          price_data: {
            currency: "usd",
            unit_amount: it.unitPriceCents,
            product_data: { name: p.name },
          },
        };
      }),
    });
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });
    return NextResponse.json({ url: session.url });
  }

  const apiKey = process.env.PLISIO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "plisio_not_configured" }, { status: 500 });
  }
  const amountUsd = (totalCents / 100).toFixed(2);
  const params = new URLSearchParams({
    api_key: apiKey,
    order_name: `Order ${order.id.slice(0, 8)}`,
    order_number: order.id,
    amount: amountUsd,
    currency: "USD",
    email: body.email,
    description: "Digital accounts",
    callback_url: `${appUrl()}/api/webhooks/plisio`,
    success_callback_url: `${appUrl()}/checkout/success?order=${order.id}`,
    fail_callback_url: `${appUrl()}/cart`,
  });
  const res = await fetch(`https://api.plisio.net/api/v1/invoices/new?${params}`);
  const data = (await res.json()) as { status?: string; data?: { txn_id?: string; invoice_url?: string } };
  if (data.status !== "success" || !data.data?.invoice_url) {
    return NextResponse.json({ error: "plisio_failed", detail: data }, { status: 502 });
  }
  await prisma.order.update({
    where: { id: order.id },
    data: { plisioTxnId: data.data.txn_id ?? order.id },
  });
  return NextResponse.json({ url: data.data.invoice_url });
}
