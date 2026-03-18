import nodemailer from "nodemailer";

export async function sendOrderDeliveryEmail(to: string, orderUrl: string) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "SellPark <admin@sellpark.io>";

  if (!host || !user || !pass) {
    console.warn("[email] SMTP not configured; delivery URL:", orderUrl);
    return { ok: false, reason: "smtp_not_configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: "Your order — account delivery",
    text: `Thank you for your purchase.\n\nView your accounts and OTP codes here:\n${orderUrl}\n\nKeep this link private.`,
    html: `<p>Thank you for your purchase.</p><p><a href="${orderUrl}">View your accounts &amp; live OTP</a></p><p>Keep this link private.</p>`,
  });

  return { ok: true as const };
}
