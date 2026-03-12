"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center shrink-0" aria-label="SellPark Home">
          <div className="relative flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="SellPark"
              className="h-10 w-auto object-contain object-left sm:h-11"
              style={{ maxWidth: "200px" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/logo.svg";
              }}
            />
          </div>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://t.me/nmar200"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
          >
            Telegram
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[#0a0a0f]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://t.me/nmar200"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-2 text-center font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Contact on Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
