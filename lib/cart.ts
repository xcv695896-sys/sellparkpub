import { cookies } from "next/headers";

export type CartLine = { productId: string; quantity: number };

const CART = "shop_cart";

export function getCart(): CartLine[] {
  const raw = cookies().get(CART)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setCart(lines: CartLine[]) {
  cookies().set(CART, JSON.stringify(lines), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
}
