import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const order = await prisma.order.findFirst({
    where: { deliveryToken: token, status: "paid" },
    include: {
      accounts: { include: { product: true } },
    },
  });
  if (!order) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({
    email: order.email,
    accounts: order.accounts.map((a) => ({
      id: a.id,
      productName: a.product.name,
      email: a.email,
      password: a.password,
      has2fa: !!a.totpSecret,
    })),
  });
}
