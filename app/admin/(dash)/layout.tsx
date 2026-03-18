import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminDashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-white/10 bg-slate-900/80 px-4 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 sm:gap-6">
          <Link href="/admin" className="font-bold text-white">
            Dashboard
          </Link>
          <Link href="/admin/products" className="text-slate-400 hover:text-white">
            Products
          </Link>
          <Link href="/admin/stock" className="text-slate-400 hover:text-white">
            Bulk stock
          </Link>
          <Link href="/" className="ml-auto text-sm text-slate-500 hover:text-white">
            Shop
          </Link>
          <LogoutButton />
        </div>
      </nav>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
