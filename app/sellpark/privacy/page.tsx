import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — SellPark",
  description: "Privacy Policy for SellPark (sellpark.io).",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated: March 2025
      </p>

      <div className="prose prose-invert mt-12 max-w-none space-y-8 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
          <p>
            SellPark (“we”, “our”) operates the website sellpark.io. This Privacy Policy describes how we may collect, use, and protect information in connection with the website and our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. Information we may collect</h2>
          <p>
            When you use our website, we may collect: (a) technical data such as IP address, browser type, and device information; (b) usage data such as pages visited and time spent; and (c) information you provide when contacting us (e.g. via Telegram), such as your Telegram handle and any messages or project details you share.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. How we use information</h2>
          <p>
            We use the information to: operate and improve the website; respond to your inquiries and provide our services; communicate with you about projects and agreements; and comply with applicable law. We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Third parties</h2>
          <p>
            Our website may use analytics or hosting services (e.g. Vercel) that process data on our behalf. Communications via Telegram are subject to Telegram’s privacy policy. We may share information only when required by law or to protect our rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Data retention and security</h2>
          <p>
            We retain information only as long as needed for the purposes above or as required by law. We take reasonable steps to protect data, but no system is completely secure; you use the site and contact us at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. To exercise these or ask questions, contact us on Telegram:{" "}
            <a href="https://t.me/nmar200" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              t.me/nmar200
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">7. Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last updated” date will be revised when we do. Continued use of the website after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">8. Contact</h2>
          <p>
            For privacy-related questions:{" "}
            <a href="https://t.me/nmar200" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              t.me/nmar200
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-12 text-center">
        <Link href="/" className="text-slate-400 hover:text-white">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
