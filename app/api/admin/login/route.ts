import { NextRequest, NextResponse } from "next/server";
import { verifyAdminLogin, createAdminSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email?: string;
    password?: string;
  };
  if (!password || !(await verifyAdminLogin(email || "", password))) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
