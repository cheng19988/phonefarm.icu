"use client";

import { useState } from "react";
import Link from "next/link";
import { PAYMENT_STATUSES, paymentStatusLabel } from "@/lib/payment-status";

type PaymentRow = {
  id: string;
  orderId: string;
  orderNumber: string;
  userEmail: string;
  totalUsd: number;
  expectedAmount: number;
  receivedAmount: number | null;
  paymentAddress: string;
  paymentStatus: string;
  verificationStatus: string;
  txHash: string | null;
  expiresAt: Date | string;
  createdAt: Date | string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400",
  manual_review: "text-amber-400",
  paid: "text-green-400",
  underpaid: "text-orange-400",
  overpaid: "text-orange-400",
  expired: "text-red-400",
};

export function AdminPaymentRow({ payment }: { payment: PaymentRow }) {
  const [status, setStatus] = useState(payment.paymentStatus);
  const [received, setReceived] = useState(payment.receivedAmount?.toString() ?? "");
  const [txHash, setTxHash] = useState(payment.txHash ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/payments/${payment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentStatus: status,
          receivedAmount: received === "" ? null : Number(received),
          txHash: txHash.trim() || null,
        }),
      });
      if (res.ok) {
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not update payment.");
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  const expires = new Date(payment.expiresAt).toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <tr className="border-b border-slate-800/80 align-top text-xs">
      <td className="py-3 pr-3 whitespace-nowrap text-slate-500">
        {new Date(payment.createdAt).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}
      </td>
      <td className="py-3 pr-3">
        <Link href={`/orders/${payment.orderId}`} className="text-cyan-400 font-medium">
          {payment.orderNumber}
        </Link>
        <p className="text-slate-500 mt-0.5">{payment.userEmail}</p>
      </td>
      <td className="py-3 pr-3 text-slate-300">
        <p>${payment.totalUsd.toFixed(2)} USD</p>
        <p className="text-cyan-300/90">{payment.expectedAmount.toFixed(2)} USDT due</p>
      </td>
      <td className="py-3 pr-3">
        <input
          type="number"
          step="0.01"
          min="0"
          value={received}
          onChange={(e) => setReceived(e.target.value)}
          placeholder="—"
          className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
        />
      </td>
      <td className="py-3 pr-3">
        <p className={`font-medium capitalize ${STATUS_COLORS[status] || "text-white"}`}>
          {paymentStatusLabel(status)}
        </p>
        <p className="text-slate-600 mt-0.5">{payment.verificationStatus}</p>
      </td>
      <td className="py-3 pr-3">
        <input
          type="text"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="tx hash"
          className="w-full min-w-[140px] bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-300 font-mono"
        />
      </td>
      <td className="py-3 pr-3 text-slate-500 whitespace-nowrap">{expires}</td>
      <td className="py-3 pr-3">
        <p className="font-mono text-slate-500 break-all max-w-[120px]">{payment.paymentAddress.slice(0, 8)}…</p>
      </td>
      <td className="py-3">
        <div className="flex flex-col gap-1">
          <select
            value={status}
            disabled={saving}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
          >
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {paymentStatusLabel(s)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="text-cyan-400 hover:text-cyan-300 text-left disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </td>
    </tr>
  );
}
