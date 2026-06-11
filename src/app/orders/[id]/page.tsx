"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PAYMENT } from "@/lib/config";
import { formatUsd, formatUsdt } from "@/lib/pricing";
import { CopyButton } from "@/components/ui/copy-button";
import { ContactBar } from "@/components/shared";

type PaymentInfo = {
  id: string;
  expectedAmount: number;
  paymentAddress: string;
  paymentNetwork: string;
  paymentCurrency: string;
  paymentStatus: string;
  verificationStatus: string;
  expiresAt: string;
  txHash: string | null;
};

type OrderData = {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  items: { product: { name: string; slug: string }; quantity: number; unitPrice: number }[];
  payment: PaymentInfo | null;
};

type LoadState = "loading" | "ok" | "unauthorized" | "not_found" | "error";

const STEPS = [
  { n: 1, title: "Confirm order details", desc: "Review products, quantity, and total amount below." },
  { n: 2, title: "Pay USDT TRC20 after confirmation", desc: "Send the exact USDT amount to the wallet address shown." },
  { n: 3, title: "Sales team confirms payment", desc: "Sales team will confirm payment and update the order status." },
];

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(async (r) => {
        if (r.status === 401) {
          setLoadState("unauthorized");
          return;
        }
        if (r.status === 404) {
          setLoadState("not_found");
          return;
        }
        if (!r.ok) {
          setLoadState("error");
          return;
        }
        const data = await r.json();
        setOrder(data);
        setLoadState("ok");
      })
      .catch(() => setLoadState("error"));
  }, [orderId]);

  useEffect(() => {
    if (!order?.payment) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment/verify?paymentId=${order.payment!.id}`);
      const data = await res.json();
      if (data.status === "paid") {
        fetch(`/api/orders/${orderId}`).then((r) => r.json()).then(setOrder);
      }
      const expires = new Date(order.payment!.expiresAt).getTime() - Date.now();
      if (expires <= 0) {
        setTimeLeft("Expired");
      } else {
        const mins = Math.floor(expires / 60000);
        const secs = Math.floor((expires % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [order, orderId]);

  if (loadState === "loading") {
    return (
      <div className="section section-light">
        <div className="container-hero max-w-2xl">
          <div className="card p-10 text-center animate-pulse">
            <p className="text-[var(--text-muted)]">Loading your order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loadState === "unauthorized") {
    return (
      <div className="section section-light">
        <div className="container-hero max-w-2xl text-center">
          <div className="card p-10">
            <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Sign In Required</h1>
            <p className="text-[var(--text-muted)] mb-6">Please sign in to view this order and payment instructions.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/login" className="btn-primary">Sign In</Link>
              <Link href="/register" className="btn-outline-dark">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadState === "not_found") {
    return (
      <div className="section section-light">
        <div className="container-hero max-w-2xl text-center">
          <div className="card p-10">
            <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Order Not Found</h1>
            <p className="text-[var(--text-muted)] mb-6">
              This order does not exist or you do not have permission to view it.
            </p>
            <Link href="/account/orders" className="btn-primary">My Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loadState === "error" || !order) {
    return (
      <div className="section section-light">
        <div className="container-hero max-w-2xl text-center">
          <div className="card p-10">
            <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Unable to Load Order</h1>
            <p className="text-[var(--text-muted)] mb-6">Something went wrong. Please try again or contact sales.</p>
            <Link href="/account/orders" className="btn-primary">My Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  const payment = order.payment;
  const awaitingPayment = payment && order.status.toLowerCase().includes("wait");

  return (
    <div className="section section-light">
      <div className="container-hero max-w-2xl">
        <nav className="text-sm text-[var(--text-subtle)] mb-6">
          <Link href="/account/orders" className="hover:text-[var(--brand)]">← My Orders</Link>
        </nav>

        <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Order Confirmation</p>
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Order {order.orderNumber}</h1>
        <p className="text-[var(--text-muted)] mb-8">
          Status: <span className="font-semibold text-[var(--text)]">{order.status}</span>
          {payment && (
            <> · Payment: <span className="font-semibold capitalize">{payment.paymentStatus}</span></>
          )}
        </p>

        {/* Payment steps */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {STEPS.map((step) => (
            <div key={step.n} className="card p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-[var(--brand)] text-white font-bold flex items-center justify-center mx-auto mb-2 text-sm">
                {step.n}
              </div>
              <p className="font-semibold text-[var(--text)] text-sm mb-1">{step.title}</p>
              <p className="text-xs text-[var(--text-subtle)]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-[var(--text)] text-lg mb-4">Order Summary</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-3 border-b border-[var(--border)] last:border-0">
              <Link href={`/products/${item.product.slug}`} className="text-[var(--brand)] hover:underline">
                {item.product.name}
              </Link>
              <span className="text-[var(--text-muted)]">
                {formatUsd(item.unitPrice)} × {item.quantity}
              </span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-[var(--text)] mt-4 text-lg">
            <span>Total</span>
            <span className="text-[var(--accent)]">{formatUsd(order.totalUsd)}</span>
          </div>
        </div>

        {awaitingPayment && (
          <div className="card p-6 mb-6 border-2 border-[var(--brand)]/20 bg-blue-50/30">
            <h2 className="font-bold text-[var(--text)] text-lg mb-4">USDT Payment Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Amount</span>
                <span className="text-[var(--text)] font-bold font-mono text-lg">{formatUsdt(payment.expectedAmount)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Network</span>
                <span className="text-[var(--text)] font-medium">{payment.paymentNetwork}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-2">Wallet address (TRC20)</span>
                <div className="flex gap-2 items-start">
                  <code className="flex-1 bg-white border border-[var(--border)] p-3 rounded-lg text-[var(--brand)] text-xs break-all">
                    {payment.paymentAddress}
                  </code>
                  <CopyButton text={payment.paymentAddress} />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Contract</span>
                <span className="text-[var(--text-subtle)] font-mono text-xs">{PAYMENT.contract}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Min payment</span>
                <span className="text-[var(--text)]">{PAYMENT.minAmount} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Payment window</span>
                <span className="text-[var(--accent)] font-medium">{timeLeft || "—"}</span>
              </div>
            </div>
            <div className="mt-5 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
              <p className="font-semibold mb-1">Important</p>
              <p>Send the exact USDT amount via Tron TRC20. After payment, notify sales via WhatsApp or email with your order number.</p>
              <p className="mt-2">USDT payment is available after order confirmation. Sales team will confirm payment and update the order status.</p>
            </div>
          </div>
        )}

        {order.status.toLowerCase().includes("paid") && (
          <div className="card p-6 mb-6 border-green-200 bg-green-50 text-green-800">
            <p className="font-semibold">Payment received — thank you.</p>
            <p className="text-sm mt-1">Our sales team will confirm your order and update the status shortly.</p>
          </div>
        )}

        <div className="card p-6 mb-8">
          <h2 className="font-bold text-[var(--text)] mb-3">Contact Sales</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Questions about payment or shipping? Reach our Guangzhou sales team:
          </p>
          <ContactBar />
        </div>

        <Link href="/account/orders" className="btn-secondary">← Back to My Orders</Link>
      </div>
    </div>
  );
}
