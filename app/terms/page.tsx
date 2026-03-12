import Link from "next/link";

export const metadata = {
  title: "Terms of Service — SellPark",
  description: "Terms of Service for SellPark (sellpark.io).",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated: March 2025
      </p>

      <div className="prose prose-invert mt-12 max-w-none space-y-8 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Agreement</h2>
          <p>
            By using the SellPark website (“sellpark.io”) and/or engaging our services, you agree to these Terms of Service. If you do not agree, do not use our site or services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. Services</h2>
          <p>
            SellPark provides coding and development services for digital and software shops, including but not limited to: storefront development, Stripe integration, holding and exchange to crypto, and custom crypto payment gateway development and implementation. Specific scope, deliverables, and fees are agreed on a per-project or per-client basis (e.g. via Telegram or other agreed channels).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. Use of the website</h2>
          <p>
            You may use this website for lawful purposes only. You may not attempt to gain unauthorized access to our systems, scrape or abuse the site, or use it in any way that could harm us or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. No professional advice</h2>
          <p>
            Content on this website is for general information only. It does not constitute legal, financial, or tax advice. You are responsible for your own compliance with applicable laws and regulations when using our services or operating your business.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, SellPark and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or our services. Our total liability for any claim related to the website or services shall not exceed the amount you paid us for the specific service in question (if any).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Changes</h2>
          <p>
            We may update these Terms of Service from time to time. The “Last updated” date at the top will be revised when we do. Continued use of the website or services after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">7. Contact</h2>
          <p>
            For questions about these terms or our services, contact us on Telegram:{" "}
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
