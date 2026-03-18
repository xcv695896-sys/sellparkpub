import { prisma } from "./prisma";
import { sendOrderDeliveryEmail } from "./email";

const appUrl = () => process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function fulfillOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) return { error: "order_not_found" as const };
  if (order.status === "paid") return { already: true as const };

  try {
    await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        for (let i = 0; i < item.quantity; i++) {
          const acc = await tx.account.findFirst({
            where: { productId: item.productId, sold: false },
            orderBy: { createdAt: "asc" },
          });
          if (!acc) throw new Error("STOCK");
          await tx.account.update({
            where: { id: acc.id },
            data: { sold: true, orderId: order.id },
          });
        }
      }
      await tx.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
    });
  } catch {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "partial_stock" },
    }).catch(() => {});
    return { error: "out_of_stock" as const };
  }

  const fresh = await prisma.order.findUnique({ where: { id: orderId } });
  if (fresh) {
    const deliveryUrl = `${appUrl()}/orders/${fresh.deliveryToken}`;
    await sendOrderDeliveryEmail(fresh.email, deliveryUrl);
  }
  return { ok: true as const, deliveryToken: order.deliveryToken };
}
