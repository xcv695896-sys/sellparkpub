"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type Account = { id: string; productName: string; email: string | null; password: string; has2fa: boolean };

export default function OrderDeliveryPage() {
  const { token } = useParams<{ token: string }>();
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [otp, setOtp] = useState<Record<string, { code: string; expiresIn: number }>>({});

  const load = useCallback(async () => {
    const r = await fetch(`/api/orders/${token}`);
    if (!r.ok) {
      setAccounts([]);
      return;
    }
    const d = await r.json();
    setAccounts(d.accounts);
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const refreshOtp = useCallback(
    async (accountId: string) => {
      const r = await fetch(`/api/orders/${token}/otp?accountId=${accountId}`);
      if (!r.ok) return;
      const d = await r.json();
      setOtp((o) => ({ ...o, [accountId]: { code: d.code, expiresIn: d.expiresIn } }));
    },
    [token]
  );

  useEffect(() => {
    if (!accounts) return;
    const t = setInterval(() => {
      accounts.filter((a) => a.has2fa).forEach((a) => refreshOtp(a.id));
    }, 5000);
    accounts.filter((a) => a.has2fa).forEach((a) => refreshOtp(a.id));
    return () => clearInterval(t);
  }, [accounts, refreshOtp]);

  if (accounts === null) return <p className="p-20 text-center text-slate-600">Loading…</p>;
  if (accounts.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-slate-600">Order not found or not paid yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Order details</h1>
        <p className="text-sm text-slate-600">
          Keep this page private. OTP codes refresh every 30 seconds for 2FA accounts.
        </p>
        {accounts.map((a) => (
          <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="font-semibold text-slate-900">{a.productName}</p>
            {a.email && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                <span className="text-sm text-slate-600">Email</span>
                <code className="text-sm">{a.email}</code>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
              <span className="text-sm text-slate-600">Password</span>
              <code className="text-sm">{a.password}</code>
            </div>
            {a.has2fa && (
              <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-900">Google Authenticator OTP</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-3xl font-mono font-bold tracking-widest text-blue-700">
                    {otp[a.id]?.code ?? "••••••"}
                  </span>
                  <span className="text-sm text-blue-600">{otp[a.id]?.expiresIn ?? 0}s</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-blue-200">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${((otp[a.id]?.expiresIn ?? 0) / 30) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
