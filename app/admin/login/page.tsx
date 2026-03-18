"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_EMAIL = "admin@sellpark.io";

export default function AdminLoginPage() {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState("Admin1234!");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) {
      setErr("Invalid email or password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-8">
        <h1 className="text-xl font-bold text-white">Admin</h1>
        <p className="mt-1 text-xs text-slate-500">Default: {DEFAULT_EMAIL}</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white"
          placeholder="Email"
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white"
          placeholder="Password"
          autoComplete="current-password"
        />
        {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
        <button type="submit" className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white">
          Sign in
        </button>
      </form>
    </div>
  );
}
