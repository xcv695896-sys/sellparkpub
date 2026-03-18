import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import { prisma } from "@/lib/prisma";

/** Live TOTP for delivered account (Google Authenticator compatible) */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const accountId = _req.nextUrl.searchParams.get("accountId");
  if (!accountId) {
    return NextResponse.json({ error: "accountId required" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { deliveryToken: token, status: "paid" },
    include: { accounts: true },
  });
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const acc = order.accounts.find((a) => a.id === accountId);
  if (!acc?.totpSecret) {
    return NextResponse.json({ error: "no_2fa" }, { status: 400 });
  }

  try {
    const code = authenticator.generate(acc.totpSecret.replace(/\s/g, "").toUpperCase());
    const period = authenticator.options.step || 30;
    const remaining = period - (Math.floor(Date.now() / 1000) % period);
    return NextResponse.json({ code, expiresIn: remaining });
  } catch {
    return NextResponse.json({ error: "invalid_secret" }, { status: 400 });
  }
}
