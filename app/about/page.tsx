import Link from "next/link";

export const metadata = {
  title: "About — SellPark",
  description: "About SellPark: coding and crypto payment solutions for digital and software shops.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        About SellPark
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        We’re full-stack developers. We build and integrate everything for digital and software shops — and we built a custom crypto payment gateway.
      </p>

      <div className="mt-14 space-y-12 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">What we do</h2>
          <p className="mt-3">
            SellPark provides full-stack coding services for shops: digital products, software, and related storefronts. We do all the things to create a good-looking, fully working shop — front-end, back-end, and payments. We also offer Stripe holding and exchange to crypto, and we developed a fully working custom crypto payment gateway. We can implement the gateways you wish — tell us which ones you need and we integrate them into your shop.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Our focus</h2>
          <p className="mt-3">
            We focus on making your shop work end-to-end: from storefront and checkout to fiat and crypto payments. Our custom gateway gives you control over which chains and assets you support.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p className="mt-3">
            For clients and inquiries, contact us on Telegram:{" "}
            <a href="https://t.me/nmar200" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              t.me/nmar200
            </a>
          </p>
        </section>
      </div>

      <p className="mt-12 text-center">
        <Link href="/contact" className="text-slate-400 hover:text-white">
          Contact us
        </Link>
      </p>
    </div>
  );
}
