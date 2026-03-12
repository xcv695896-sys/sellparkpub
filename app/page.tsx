import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.2),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in opacity-0 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Coding & payment solutions
            <br />
            <span className="text-gradient">for your shop</span>
          </h1>
          <p className="animate-slide-up stagger-1 mx-auto mt-6 max-w-2xl text-lg text-slate-400 opacity-0">
            We build and integrate digital stores, software shops, and custom crypto payment gateways.
            Stripe holding & exchange to crypto — and we can implement the gateways you need.
          </p>
          <div className="animate-slide-up stagger-2 mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0">
            <a
              href="https://t.me/nmar200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:opacity-90"
            >
              Contact on Telegram
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Our services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0d0d12] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            What we do
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
            From custom storefronts to crypto payments — we cover the full stack for digital and software shops.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Shop development",
                desc: "Custom coding for digital and software shops. Storefronts, carts, and integrations tailored to your stack.",
                icon: "🛒",
              },
              {
                title: "Stripe → Crypto",
                desc: "Stripe holding and exchange to crypto. We handle the flow so you can accept cards and settle in crypto.",
                icon: "💳",
              },
              {
                title: "Custom crypto gateway",
                desc: "We developed a fully working custom crypto payment gateway. We can implement all the gateways you wish — name yours.",
                icon: "⚡",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-[#12121a] p-6 transition hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-2xl" aria-hidden>{item.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Custom crypto payment gateway
          </h2>
          <p className="mt-4 text-slate-400">
            We built a fully working custom crypto payment gateway from the ground up.
            We can implement <strong className="text-slate-300">all the gateways you wish</strong> — tell us which ones you need (e.g. Bitcoin, Ethereum, USDT, etc.) and we integrate them into your shop.
          </p>
          <Link
            href="/services#gateways"
            className="mt-6 inline-block text-blue-400 hover:underline"
          >
            See gateways & services →
          </Link>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0d0d12] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Projects we built
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
            Here’s one of the sites we’ve delivered.
          </p>
          <div className="mt-12 flex justify-center">
            <a
              href="https://perv.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full max-w-md rounded-2xl border border-white/10 bg-[#12121a] p-6 transition hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 sm:p-8"
            >
              <span className="text-sm font-medium text-slate-500">Featured project</span>
              <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-gradient">
                perv.gg
              </h3>
              <p className="mt-2 text-slate-400">
                A full project delivered by us. Visit the site to see our work in action.
              </p>
              <span className="mt-4 inline-block text-blue-400 group-hover:underline">
                Visit perv.gg →
              </span>
            </a>
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            <Link href="/projects" className="text-slate-400 hover:text-white">View all projects</Link>
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white">
            Get in touch
          </h2>
          <p className="mt-4 text-slate-400">
            For clients: contact us on Telegram. We’re happy to discuss your shop, gateways, and custom needs.
          </p>
          <a
            href="https://t.me/nmar200"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
          >
            t.me/nmar200
          </a>
        </div>
      </section>
    </>
  );
}
