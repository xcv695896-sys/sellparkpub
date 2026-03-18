import { prisma } from "@/lib/prisma";
import BulkForm from "./BulkForm";

export const dynamic = "force-dynamic";

export default async function StockPage() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Bulk add accounts</h1>
      <p className="mt-2 text-sm text-slate-400">
        One account per line. Format:{" "}
        <code className="text-blue-300">email|password</code> or{" "}
        <code className="text-blue-300">email|password|TOTP_SECRET_BASE32</code>
        <br />
        TOTP secret is the key from Google Authenticator setup (Base32). Customers will see live OTP on the delivery
        page.
      </p>
      <BulkForm products={products.map((p) => ({ id: p.id, name: p.name }))} />
    </div>
  );
}
