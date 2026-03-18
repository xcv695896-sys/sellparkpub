import Link from "next/link";

export const metadata = {
  title: "Contact — SellPark",
  description: "Contact SellPark on Telegram: t.me/nmar200. For coding and crypto payment solutions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-4 text-slate-400">
        For clients and inquiries, reach us on Telegram. We’re happy to discuss your shop, gateways, and custom needs.
      </p>

      <div className="mt-14 rounded-2xl border border-white/10 bg-[#12121a] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">Telegram</h2>
        <p className="mt-2 text-slate-400">
          Our main contact channel. Message us for quotes, technical questions, or to start a project.
        </p>
        <a
          href="https://t.me/nmar200"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
        >
          t.me/nmar200
        </a>
      </div>

      <p className="mt-10 text-center text-slate-500">
        <Link href="/" className="text-slate-400 hover:text-white">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
