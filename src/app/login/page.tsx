"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { authHref, resolveSafeRedirect } from "@/lib/safe-redirect";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
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
      router.push(resolveSafeRedirect(redirectParam));
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Sign In to Your Account"
      subtitle="Sign in to continue your order, view order history, and access USDT payment instructions after confirmation."
      benefits={[
        "Continue checkout on in-progress hardware orders",
        "View order history and payment status",
        "Access USDT payment details on confirmed orders",
        "Manage account orders from Guangzhou factory direct shop",
      ]}
    >
      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-[var(--text)] mb-2">Sign In</h2>
        {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="form-label">Email</label>
          <input name="email" type="email" required className="form-input" />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input name="password" type="password" required className="form-input" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-sm text-[var(--text-muted)]">
          No account?{" "}
          <Link href={authHref("/register", redirectParam)} className="text-[var(--brand)] font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="section section-light min-h-[50vh]" />}>
      <LoginForm />
    </Suspense>
  );
}
