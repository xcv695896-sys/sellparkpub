import Link from "next/link";

export default function SellparkHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-white">SellPark — dev services</h1>
      <p className="mt-4 text-slate-400">
        We build shops, crypto gateways, and Stripe → crypto flows. The account shop is on the{" "}
        <Link href="/" className="text-blue-400 hover:underline">
          homepage
        </Link>
        .
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/sellpark/services" className="rounded-xl bg-white/10 px-6 py-3 hover:bg-white/15">
          Services
        </Link>
        <Link href="/sellpark/contact" className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-medium">
          Contact
        </Link>
      </div>
    </div>
  );
}
