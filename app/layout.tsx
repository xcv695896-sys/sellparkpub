import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SellPark — Coding & Crypto Payment Solutions for Shops",
  description: "Custom coding for digital & software shops. Stripe holding & exchange to crypto. Fully custom crypto payment gateway. Contact us on Telegram.",
  openGraph: {
    title: "SellPark — Coding & Crypto Payment Solutions",
    description: "Custom coding for shops. Crypto gateways. Stripe → Crypto. Telegram: t.me/nmar200",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
