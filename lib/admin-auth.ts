import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const DAY = 60 * 60 * 24;

const DEFAULT_ADMIN_EMAIL = "admin@sellpark.io";
const DEFAULT_ADMIN_PASSWORD = "Admin1234!";

function getSecret() {
  const s =
    process.env.ADMIN_SESSION_SECRET ||
    "sellpark-dev-session-secret-change-me-32!!";
  if (s.length < 16) throw new Error("Set ADMIN_SESSION_SECRET (min 16 chars)");
  return new TextEncoder().encode(s);
}

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase().trim();
}

/**
 * Login: email must match ADMIN_EMAIL (default admin@sellpark.io).
 * Password: ADMIN_PASSWORD_HASH (bcrypt) if set; else default Admin1234! (change hash in production).
 */
export async function verifyAdminLogin(
  email: string,
  password: string
): Promise<boolean> {
  const expected = getAdminEmail();
  if (!email || email.toLowerCase().trim() !== expected) return false;
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash && hash.startsWith("$2")) {
    return bcrypt.compare(password, hash);
  }
  return password === DEFAULT_ADMIN_PASSWORD;
}

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin", email: getAdminEmail() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getSecret());
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * DAY,
    path: "/",
  });
}

export async function clearAdminSession() {
  cookies().delete(COOKIE);
}

export async function getAdminSession(): Promise<boolean> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
