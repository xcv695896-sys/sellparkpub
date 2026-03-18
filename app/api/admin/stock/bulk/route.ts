import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Bulk add accounts. One per line:
 * email|password
 * email|password|TOTP_BASE32 (Google Authenticator secret)
 */
export async function POST(req: NextRequest) {
  const { productId, raw } = (await req.json()) as { productId?: string; raw?: string };
  if (!productId || !raw?.trim()) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return NextResponse.json({ error: "product" }, { status: 404 });

  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let added = 0;
  const errors: string[] = [];

  for (const line of lines) {
    const parts = line.split("|").map((s) => s.trim());
    if (parts.length < 2) {
      errors.push(`Bad line: ${line.slice(0, 30)}…`);
      continue;
    }
    const email = parts[0] || null;
    const password = parts[1];
    const totpSecret = parts[2]?.replace(/\s/g, "") || null;
    if (!password) {
      errors.push("Missing password");
      continue;
    }
    await prisma.account.create({
      data: {
        productId,
        email: email || null,
        password,
        totpSecret,
      },
    });
    added++;
  }

  return NextResponse.json({ added, errors });
}
