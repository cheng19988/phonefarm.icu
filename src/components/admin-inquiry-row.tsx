"use client";

import { useState } from "react";
import { INQUIRY_STATUSES, type InquiryStatus } from "@/lib/inquiry";

type Inquiry = {
  id: string;
  createdAt: Date | string;
  name: string;
  company: string | null;
  email: string;
  whatsapp: string | null;
  phone: string | null;
  country: string | null;
  productInterest: string | null;
  deviceQuantity: string | null;
  preferredContact: string | null;
  sourcePage: string | null;
  message: string | null;
  status: string;
};

const STATUS_COLORS: Record<string, string> = {
  New: "text-cyan-400",
  Contacted: "text-yellow-400",
  Quoted: "text-green-400",
  Closed: "text-slate-500",
  Spam: "text-red-400",
};

export function AdminInquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const [status, setStatus] = useState(inquiry.status);
  const [saving, setSaving] = useState(false);

  async function updateStatus(next: InquiryStatus) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) setStatus(next);
    } finally {
      setSaving(false);
    }
  }

  const created = new Date(inquiry.createdAt).toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <tr className="border-b border-slate-800/80 align-top">
      <td className="py-3 pr-4 text-slate-500 text-xs whitespace-nowrap">{created}</td>
      <td className="py-3 pr-4">
        <p className="text-white font-medium">{inquiry.name}</p>
        {inquiry.company && <p className="text-slate-500 text-xs">{inquiry.company}</p>}
      </td>
      <td className="py-3 pr-4 text-slate-300 text-sm">{inquiry.productInterest || "—"}</td>
      <td className="py-3 pr-4 text-slate-400 text-sm">{inquiry.deviceQuantity || "—"}</td>
      <td className="py-3 pr-4 text-slate-400 text-sm">{inquiry.country || "—"}</td>
      <td className="py-3 pr-4 text-sm">
        <p className="text-slate-300">{inquiry.email}</p>
        {inquiry.whatsapp && <p className="text-slate-500 text-xs">{inquiry.whatsapp}</p>}
        {inquiry.phone && <p className="text-slate-500 text-xs">{inquiry.phone}</p>}
      </td>
      <td className="py-3 pr-4 text-slate-500 text-xs max-w-[200px]">
        <p className="line-clamp-3">{inquiry.message || "—"}</p>
        {inquiry.sourcePage && <p className="mt-1 text-slate-600">from {inquiry.sourcePage}</p>}
      </td>
      <td className="py-3">
        <select
          value={status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value as InquiryStatus)}
          className={`bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs ${STATUS_COLORS[status] || "text-white"}`}
        >
          {INQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}
