import Link from "next/link";

export const metadata = {
  title: "Services — SellPark",
  description: "Shop development, Stripe to crypto, custom crypto payment gateways. We implement the gateways you need.",
};

const services = [
  {
    title: "Shop & storefront development",
    description: "Custom coding for digital and software shops. We build storefronts, carts, and integrations tailored to your stack — whether you sell digital goods, software, or other products.",
    points: ["Digital product stores", "Software / license shops", "Custom checkout flows", "API & webhook integrations"],
  },
  {
    title: "Stripe holding & exchange to crypto",
    description: "We set up and operate Stripe-based flows with holding and exchange into crypto. Accept card payments and settle in the currencies you want.",
    points: ["Stripe integration", "Holding & conversion", "Settlement in crypto", "Reporting & compliance support"],
  },
  {
    id: "gateways",
    title: "Custom crypto payment gateway",
    description: "We developed a fully working custom crypto payment gateway. We can implement all the gateways you wish — name the chains and assets you need (e.g. Bitcoin, Ethereum, USDT, USDC, and others), and we integrate them into your shop.",
    points: ["Fully custom gateway", "Multiple chains & assets", "Your choice of gateways", "Integration into your site"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Services
      </h1>
      <p className="mt-4 text-slate-400">
        Coding and payment solutions for digital and software shops. From storefronts to crypto — we cover it.
      </p>

      <div className="mt-14 space-y-16">
        {services.map((s) => (
          <article
            key={s.title}
            id={s.id}
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#12121a]/80 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              {s.title}
            </h2>
            <p className="mt-4 text-slate-400">
              {s.description}
            </p>
            <ul className="mt-6 space-y-2">
              {s.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-slate-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">
          Which gateways can we implement?
        </h2>
        <p className="mt-3 text-slate-400">
          We can implement the gateways you need: Bitcoin, Ethereum, USDT, USDC, and other major chains and stablecoins. Tell us your requirements and we’ll integrate them into your custom gateway and shop.
        </p>
        <a
          href="https://t.me/nmar200"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-medium text-blue-400 hover:underline"
        >
          Contact us on Telegram (t.me/nmar200) →
        </a>
      </div>

      <p className="mt-12 text-center">
        <Link href="/contact" className="text-slate-400 hover:text-white">
          Back to Contact
        </Link>
      </p>
    </div>
  );
}
