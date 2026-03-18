/** Verify hCaptcha token (site protection). This is NOT a CAPTCHA bypass. */
export async function verifyHcaptcha(token: string | null): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return !!data.success;
}
