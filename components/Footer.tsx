import Link from "next/link";

const footerLinks = {
  product: [
    { href: "/sellpark/services", label: "Services" },
    { href: "/sellpark/projects", label: "Projects" },
    { href: "/sellpark/about", label: "About" },
  ],
  legal: [
    { href: "/sellpark/terms", label: "Terms of Service" },
    { href: "/sellpark/privacy", label: "Privacy Policy" },
  ],
  contact: [
    { href: "/sellpark/contact", label: "Contact" },
    { href: "https://t.me/nmar200", label: "Telegram", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">
              Sell<span className="text-gradient">Park</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Coding & crypto payment solutions for digital shops. Custom gateways, Stripe → Crypto.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Product</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Legal</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Contact</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label} →
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} SellPark. All rights reserved.</p>
          <p className="text-xs text-slate-500">
            Clients: contact us on{" "}
            <a href="https://t.me/nmar200" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              t.me/nmar200
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
