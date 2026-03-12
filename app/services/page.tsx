import Link from "next/link";
import { IconShop, IconCard, IconBolt, IconExternal } from "@/components/Icons";

export const metadata = {
  title: "Services — SellPark",
  description: "Full-stack shop development, Stripe to crypto, custom crypto payment gateways. We implement the gateways you need.",
};

const services = [
  {
    title: "Shop & storefront development",
    description: "We’re full-stack developers. We do everything to create a good-looking shop: design, front-end, back-end, and integrations. Custom coding for digital and software shops — storefronts, carts, and APIs tailored to your stack.",
    points: ["Digital product stores", "Software / license shops", "Custom checkout flows", "API & webhook integrations"],
    Icon: IconShop,
    gradient: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
  },
  {
    title: "Stripe holding & exchange to crypto",
    description: "We set up and operate Stripe-based flows with holding and exchange into crypto. Accept card payments and settle in the currencies you want.",
    points: ["Stripe integration", "Holding & conversion", "Settlement in crypto", "Reporting & compliance support"],
    Icon: IconCard,
    gradient: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-400",
  },
  {
    id: "gateways",
    title: "Custom crypto payment gateway",
    description: "We developed a fully working custom crypto payment gateway. We can implement all the gateways you wish — name the chains and assets you need (e.g. Bitcoin, Ethereum, USDT, USDC, and others), and we integrate them into your shop.",
    points: ["Fully custom gateway", "Multiple chains & assets", "Your choice of gateways", "Integration into your site"],
    Icon: IconBolt,
    gradient: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
  },
];

const stripeSteps = [
  { step: "01", label: "Stripe integration", desc: "Connect your store to Stripe for card payments." },
  { step: "02", label: "Holding & conversion", desc: "We hold and convert funds into your chosen crypto." },
  { step: "03", label: "Settlement", desc: "Settle in Bitcoin, USDT, or other assets you need." },
  { step: "04", label: "Reporting", desc: "Clear reporting and compliance support." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">
        Services
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">
        We’re full-stack developers. We do everything it takes to build a good-looking, fully working shop — from front to back and payments.
      </p>

      <div className="mt-16 space-y-20">
        {services.map((s) => (
          <article
            key={s.title}
            id={s.id}
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#12121a]/80 p-6 transition hover:border-white/20 sm:p-8"
          >
            <div className={`inline-flex rounded-xl bg-gradient-to-br ${s.gradient} p-3 ${s.iconColor}`}>
              <s.Icon />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
              {s.title}
            </h2>
            <p className="mt-4 text-slate-400">
              {s.description}
            </p>
            <ul className="mt-6 space-y-3">
              {s.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-slate-300">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-20" aria-labelledby="stripe-gallery-heading">
        <h2 id="stripe-gallery-heading" className="text-2xl font-bold text-white sm:text-3xl">
          Stripe holding & exchange — how it works
        </h2>
        <p className="mt-3 text-slate-400">
          A clear flow from card payments to crypto settlement.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stripeSteps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/10 bg-[#12121a] p-6 transition hover:border-indigo-500/30"
            >
              <span className="text-sm font-mono font-medium text-indigo-400">{item.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.label}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Which gateways can we implement?
        </h2>
        <p className="mt-3 text-slate-400">
          We can implement the gateways you need: Bitcoin, Ethereum, USDT, USDC, and other major chains and stablecoins. Tell us your requirements and we’ll integrate them into your custom gateway and shop.
        </p>
        <a
          href="https://t.me/nmar200"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-medium text-blue-400 transition hover:text-blue-300"
        >
          Contact us on Telegram (t.me/nmar200)
          <IconExternal />
        </a>
      </div>

      <p className="mt-12 text-center">
        <Link href="/contact" className="text-slate-400 transition hover:text-white">
          ← Back to Contact
        </Link>
      </p>
    </div>
  );
}
