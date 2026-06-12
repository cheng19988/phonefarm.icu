"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PAYMENT } from "@/lib/config";
import { formatUsd, formatUsdt } from "@/lib/pricing";
import {
  paymentAmountSummary,
  paymentStatusBadgeClass,
  paymentStatusLabel,
} from "@/lib/payment-status";
import { CopyButton } from "@/components/ui/copy-button";
import { ContactBar } from "@/components/shared";

type PaymentInfo = {
  id: string;
  expectedAmount: number;
  receivedAmount: number | null;
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

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [timeLeft, setTimeLeft] = useState("");
  const [autoVerify, setAutoVerify] = useState(false);
  const [txHashInput, setTxHashInput] = useState("");
  const [txSubmitting, setTxSubmitting] = useState(false);
  const [txError, setTxError] = useState("");

  async function reloadOrder() {
    const r = await fetch(`/api/orders/${orderId}`);
    if (r.ok) {
      const data = await r.json();
      setOrder(data);
    }
  }

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

    const tick = async () => {
      const res = await fetch(`/api/payment/verify?paymentId=${order.payment!.id}`);
      const data = await res.json();
      setAutoVerify(Boolean(data.autoVerifyEnabled));

      if (data.payment) {
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status:
                  data.status === "paid"
                    ? "Paid"
                    : data.status === "expired"
                      ? "Expired"
                      : data.status === "manual_review"
                        ? "Payment Under Review"
                        : prev.status,
                payment: {
                  ...prev.payment!,
                  paymentStatus: data.payment.paymentStatus,
                  verificationStatus: data.payment.verificationStatus,
                  receivedAmount: data.payment.receivedAmount,
                  txHash: data.payment.txHash,
                },
              }
            : prev,
        );
      }

      if (["paid", "expired", "manual_review", "underpaid", "overpaid"].includes(data.status)) {
        await reloadOrder();
      }

      const expires = new Date(order.payment!.expiresAt).getTime() - Date.now();
      if (expires <= 0) {
        setTimeLeft("Expired");
      } else {
        const mins = Math.floor(expires / 60000);
        const secs = Math.floor((expires % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    };

    tick();
    const interval = setInterval(tick, 5000);
    return () => clearInterval(interval);
  }, [order?.payment?.id, orderId]);

  async function submitTxHash(e: React.FormEvent) {
    e.preventDefault();
    if (!order?.payment) return;
    setTxSubmitting(true);
    setTxError("");
    try {
      const res = await fetch("/api/payment/submit-tx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: order.payment.id, txHash: txHashInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTxError(data.error || "Could not submit transaction hash.");
        return;
      }
      setTxHashInput("");
      await reloadOrder();
    } catch {
      setTxError("Network error. Please try again.");
    } finally {
      setTxSubmitting(false);
    }
  }

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
  const amountSummary = payment ? paymentAmountSummary(order.totalUsd, payment.expectedAmount) : null;
  const showPaymentPanel =
    payment && (payment.paymentStatus === "pending" || payment.paymentStatus === "underpaid");
  const isManualMode = !autoVerify;

  return (
    <div className="section section-light">
      <div className="container-hero max-w-2xl">
        <nav className="text-sm text-[var(--text-subtle)] mb-6">
          <Link href="/account/orders" className="hover:text-[var(--brand)]">← My Orders</Link>
        </nav>

        <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wide mb-2">Order Confirmation</p>
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Order {order.orderNumber}</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="badge-yellow capitalize">{order.status}</span>
          {payment && (
            <span className={`${paymentStatusBadgeClass(payment.paymentStatus)} capitalize`}>
              Payment: {paymentStatusLabel(payment.paymentStatus)}
            </span>
          )}
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
            <span>Order total (USD)</span>
            <span className="text-[var(--accent)]">{formatUsd(order.totalUsd)}</span>
          </div>
        </div>

        {payment && amountSummary && (
          <div className="card p-6 mb-6 border border-[var(--border)]">
            <h2 className="font-bold text-[var(--text)] text-lg mb-4">Amount Reconciliation</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Order total (USD)</span>
                <span className="font-medium">{formatUsd(amountSummary.totalUsd)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">USDT amount due (TRC20)</span>
                <span className="font-bold font-mono text-lg text-[var(--accent)]">
                  {formatUsdt(amountSummary.expectedUsdt)} USDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Conversion rule</span>
                <span className="text-[var(--text-subtle)]">1 USD = 1 USDT reference</span>
              </div>
            </div>
            <p
              className={`mt-3 text-sm ${amountSummary.consistent ? "text-green-800 bg-green-50 border-green-200" : "text-red-800 bg-red-50 border-red-200"} p-3 rounded-lg border`}
            >
              {amountSummary.note}
            </p>
          </div>
        )}

        {isManualMode && payment && payment.paymentStatus !== "paid" && payment.paymentStatus !== "expired" && (
          <div className="card p-5 mb-6 border-2 border-amber-300 bg-amber-50 text-amber-950">
            <p className="font-bold text-base mb-1">Manual confirmation</p>
            <p className="text-sm">
              USDT payments are verified by our sales team on-chain. Automatic TRC20 matching is not enabled on this
              site. After you send USDT, submit your transaction hash below or notify sales with order number{" "}
              <strong>{order.orderNumber}</strong>.
            </p>
          </div>
        )}

        {autoVerify && payment && payment.paymentStatus === "pending" && (
          <div className="card p-5 mb-6 border border-blue-200 bg-blue-50 text-blue-900 text-sm">
            <p className="font-semibold mb-1">Automatic verification enabled</p>
            <p>
              TRC20 transfers to the wallet below are checked automatically. Send the exact USDT amount within the
              payment window.
            </p>
          </div>
        )}

        {showPaymentPanel && (
          <div className="card p-6 mb-6 border-2 border-[var(--brand)]/20 bg-blue-50/30">
            <h2 className="font-bold text-[var(--text)] text-lg mb-4">USDT Payment Instructions</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Pay exactly</span>
                <span className="text-[var(--text)] font-bold font-mono text-lg">
                  {formatUsdt(payment!.expectedAmount)} USDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Order reference (include in memo if possible)</span>
                <span className="font-mono font-semibold">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Network</span>
                <span className="text-[var(--text)] font-medium">{payment!.paymentNetwork}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-2">Wallet address (TRC20)</span>
                <div className="flex gap-2 items-start">
                  <code className="flex-1 bg-white border border-[var(--border)] p-3 rounded-lg text-[var(--brand)] text-xs break-all">
                    {payment!.paymentAddress}
                  </code>
                  <CopyButton text={payment!.paymentAddress} />
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[var(--text-muted)] shrink-0">USDT contract (TRC20)</span>
                <code className="text-[var(--text-subtle)] font-mono text-xs break-all text-right">
                  {PAYMENT.contract}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Payment window</span>
                <span className="text-[var(--accent)] font-medium">{timeLeft || "—"}</span>
              </div>
              {payment!.txHash && (
                <div>
                  <span className="text-[var(--text-muted)] block mb-1">Submitted tx hash</span>
                  <code className="block bg-white border border-[var(--border)] p-2 rounded text-xs break-all font-mono">
                    {payment!.txHash}
                  </code>
                </div>
              )}
            </div>

            {payment!.paymentStatus === "pending" && (
              <form onSubmit={submitTxHash} className="mt-5 pt-5 border-t border-[var(--border)]">
                <label className="block text-sm font-semibold text-[var(--text)] mb-2">
                  Submit TRC20 transaction hash (manual confirmation)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={txHashInput}
                    onChange={(e) => setTxHashInput(e.target.value)}
                    placeholder="64-character hex tx hash"
                    className="flex-1 border border-[var(--border)] rounded-lg px-3 py-2 text-sm font-mono"
                    maxLength={64}
                  />
                  <button type="submit" disabled={txSubmitting} className="btn-secondary px-4 py-2 disabled:opacity-50">
                    {txSubmitting ? "Submitting…" : "Submit tx hash"}
                  </button>
                </div>
                {txError && <p className="text-red-600 text-xs mt-2">{txError}</p>}
              </form>
            )}
          </div>
        )}

        {payment?.paymentStatus === "manual_review" && (
          <div className="card p-6 mb-6 border-amber-200 bg-amber-50 text-amber-950">
            <p className="font-semibold">Payment under manual review</p>
            <p className="text-sm mt-1">
              We received your transaction reference. Sales will confirm the TRC20 transfer and update this order.
            </p>
          </div>
        )}

        {payment?.paymentStatus === "underpaid" && (
          <div className="card p-6 mb-6 border-orange-200 bg-orange-50 text-orange-950">
            <p className="font-semibold">Underpaid</p>
            <p className="text-sm mt-1">
              Received {payment.receivedAmount != null ? `${formatUsdt(payment.receivedAmount)} USDT` : "amount pending"} — expected{" "}
              {formatUsdt(payment.expectedAmount)} USDT. Contact sales to complete payment.
            </p>
          </div>
        )}

        {payment?.paymentStatus === "overpaid" && (
          <div className="card p-6 mb-6 border-orange-200 bg-orange-50 text-orange-950">
            <p className="font-semibold">Overpaid</p>
            <p className="text-sm mt-1">
              Received {payment.receivedAmount != null ? `${formatUsdt(payment.receivedAmount)} USDT` : "amount pending"} — expected{" "}
              {formatUsdt(payment.expectedAmount)} USDT. Sales will reconcile the difference.
            </p>
          </div>
        )}

        {payment?.paymentStatus === "expired" && (
          <div className="card p-6 mb-6 border-red-200 bg-red-50 text-red-900">
            <p className="font-semibold">Payment window expired</p>
            <p className="text-sm mt-1">Contact sales to reopen payment or place a new order.</p>
          </div>
        )}

        {payment?.paymentStatus === "paid" && (
          <div className="card p-6 mb-6 border-green-200 bg-green-50 text-green-800">
            <p className="font-semibold">Payment confirmed</p>
            <p className="text-sm mt-1">
              {payment.receivedAmount != null
                ? `Received ${formatUsdt(payment.receivedAmount)} USDT. `
                : ""}
              Our sales team will confirm shipping details shortly.
            </p>
            {payment.txHash && (
              <code className="block mt-2 text-xs font-mono break-all opacity-80">{payment.txHash}</code>
            )}
          </div>
        )}

        <div className="card p-6 mb-8">
          <h2 className="font-bold text-[var(--text)] mb-3">Contact Sales</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Questions about payment or shipping? Reach our Guangzhou sales team with order {order.orderNumber}:
          </p>
          <ContactBar />
        </div>

        <Link href="/account/orders" className="btn-secondary">← Back to My Orders</Link>
      </div>
    </div>
  );
}
