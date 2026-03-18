import ShopHeader from "@/components/shop/ShopHeader";
import Link from "next/link";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ShopHeader />
      {children}
      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6">
          <p>SellPark Accounts — digital account shop</p>
          <p className="mt-2">
            <Link href="/sellpark" className="text-blue-600 hover:underline">
              SellPark dev services
            </Link>
            {" · "}
            <Link href="/admin/login" className="text-slate-400 hover:underline">
              Admin
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
