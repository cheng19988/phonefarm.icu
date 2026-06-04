"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    if (res.ok) {
      router.push("/account/orders");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="section">
      <div className="container-wide max-w-md">
        <h1 className="section-title text-center">Login</h1>
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input name="email" type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input name="password" type="password" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Logging in..." : "Login"}</button>
          <p className="text-center text-sm text-slate-400">
            No account? <Link href="/register" className="text-cyan-400">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
