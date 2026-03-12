import Link from "next/link";
import { IconShop, IconCard, IconBolt, IconExternal } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-20 pb-28 sm:px-6 sm:pt-28 sm:pb-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(139,92,246,0.15),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="animate-fade-in opacity-0 text-sm font-medium uppercase tracking-widest text-blue-400 [animation-fill-mode:forwards]">
            Full-stack development & payments
          </p>
          <h1 className="animate-fade-in opacity-0 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl [animation-delay:0.1s] [animation-fill-mode:forwards]">
            We build your shop
            <br />
            <span className="text-gradient">from front to back</span>
          </h1>
          <p className="animate-slide-up stagger-1 mx-auto mt-6 max-w-2xl text-lg text-slate-400 opacity-0 [animation-fill-mode:forwards]">
            We’re full-stack developers. We do everything it takes to create a good-looking, fully working shop: design, front-end, back-end, and payment integrations. Custom crypto gateways, Stripe holding & exchange to crypto — we implement the gateways you need.
          </p>
          <div className="animate-slide-up stagger-2 mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 [animation-fill-mode:forwards]">
            <a
              href="https://t.me/nmar200"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-blue-500/40 hover:opacity-95"
            >
              Contact on Telegram
              <IconExternal />
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:border-white/30"
            >
              Our services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0d0d12] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            What we do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Full-stack development for digital and software shops. We handle design, code, and payments so you get a complete, good-looking shop.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Shop development",
                desc: "Custom coding for digital and software shops. Storefronts, carts, and integrations tailored to your stack. We build the full experience.",
                Icon: IconShop,
                gradient: "from-blue-500/20 to-blue-600/5",
                iconColor: "text-blue-400",
              },
              {
                title: "Stripe → Crypto",
                desc: "Stripe holding and exchange to crypto. We handle the flow so you can accept cards and settle in crypto. See gallery below.",
                Icon: IconCard,
                gradient: "from-indigo-500/20 to-indigo-600/5",
                iconColor: "text-indigo-400",
              },
              {
                title: "Custom crypto gateway",
                desc: "We developed a fully working custom crypto payment gateway. We can implement all the gateways you wish — name yours.",
                Icon: IconBolt,
                gradient: "from-purple-500/20 to-purple-600/5",
                iconColor: "text-purple-400",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`group rounded-2xl border border-white/10 bg-[#12121a] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5 sm:p-8 ${i === 1 ? "lg:border-indigo-500/20" : ""}`}
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${item.gradient} p-3 ${item.iconColor}`}>
                  <item.Icon />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Custom crypto payment gateway
          </h2>
          <p className="mt-4 text-slate-400">
            We built a fully working custom crypto payment gateway from the ground up. We can implement <strong className="text-slate-300">all the gateways you wish</strong> — tell us which ones you need (e.g. Bitcoin, Ethereum, USDT, etc.) and we integrate them into your shop.
          </p>
          <Link
            href="/services#gateways"
            className="mt-6 inline-flex items-center gap-2 text-blue-400 transition hover:text-blue-300"
          >
            See gateways & services
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0d0d12] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Stripe holding & exchange
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            We set up Stripe-based flows with holding and conversion to crypto. Accept cards, settle in crypto.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", label: "Stripe integration", desc: "Connect your store to Stripe for card payments." },
              { step: "02", label: "Holding & conversion", desc: "We hold and convert funds into your chosen crypto." },
              { step: "03", label: "Settlement", desc: "Settle in Bitcoin, USDT, or other assets you need." },
              { step: "04", label: "Reporting", desc: "Clear reporting and compliance support." },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-[#12121a]/80 p-6 transition hover:border-indigo-500/30 hover:bg-[#16161f]"
              >
                <span className="text-sm font-mono font-medium text-indigo-400">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.label}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Projects we built
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Sites we’ve delivered. Each with a live demo you can visit.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
            <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#12121a] transition hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="grid sm:grid-cols-2">
                <div className="flex min-h-[200px] items-center justify-center bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8">
                  <div className="text-6xl font-bold text-white/20 sm:text-7xl">perv.gg</div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <span className="text-sm font-medium uppercase tracking-wider text-slate-500">Featured project</span>
                  <h3 className="mt-2 text-2xl font-bold text-white">perv.gg</h3>
                  <p className="mt-3 text-slate-400">
                    A full project delivered by us. Front to back — good-looking and fully functional.
                  </p>
                  <a
                    href="https://perv.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    See live
                    <IconExternal />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-10 text-center">
            <Link href="/projects" className="text-slate-400 transition hover:text-white">
              View all projects →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0d0d12] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-4 text-slate-400">
            We’re full-stack developers ready to build your shop. Contact us on Telegram to discuss your project, gateways, and custom needs.
          </p>
          <a
            href="https://t.me/nmar200"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
          >
            t.me/nmar200
            <IconExternal />
          </a>
        </div>
      </section>
    </>
  );
}
