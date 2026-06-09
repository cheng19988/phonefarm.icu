"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { authHref, resolveSafeRedirect } from "@/lib/safe-redirect";

function RegisterForm() {
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
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (res.ok) {
      router.push(resolveSafeRedirect(redirectParam));
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Register to place hardware orders, track shipments, and prepare USDT payment after order confirmation."
      benefits={[
        "Place Buy Now orders on phone farm racks and accessories",
        "Track order history and payment status in one place",
        "Request bulk quotes faster with saved account details",
        "USDT payment available after sales confirms your order",
      ]}
    >
      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-[var(--text)] mb-2">Register</h2>
        {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="form-label">Name</label>
          <input name="name" className="form-input" />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input name="email" type="email" required className="form-input" />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input name="password" type="password" required minLength={8} className="form-input" />
          <p className="text-xs text-[var(--text-subtle)] mt-1">Minimum 8 characters</p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? "Creating account..." : "Create Account"}
        </button>
        <p className="text-center text-sm text-[var(--text-muted)]">
          Have an account?{" "}
          <Link href={authHref("/login", redirectParam)} className="text-[var(--brand)] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="section section-light min-h-[50vh]" />}>
      <RegisterForm />
    </Suspense>
  );
}
