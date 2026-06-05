"use client";

import { useState } from "react";
import Link from "next/link";

export function HomeLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <section className="section bg-slate-900/50">
      <div className="container-wide max-w-3xl">
        <h2 className="section-title text-center">Get Deployment Consultation</h2>
        <p className="section-subtitle text-center">
          Tell us your device count and deployment goals — our sales engineers in Guangzhou typically reply within one business day.
        </p>
        {status === "success" ? (
          <div className="card p-8 text-center">
            <p className="text-green-400 mb-4">Thank you. We will reach out via email or WhatsApp shortly.</p>
            <Link href="/contact" className="btn-primary">View Contact Options</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Name *</label>
                <input name="name" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email *</label>
                <input name="email" type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Country</label>
                <input name="country" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">WhatsApp / Telegram</label>
                <input name="whatsapp" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Device Quantity</label>
                <input name="deviceQuantity" placeholder="e.g. 20, 100" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Product Interest</label>
                <select name="productInterest" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
                  <option value="Phone Farm Box">Phone Farm Box</option>
                  <option value="Motherboard Box">Motherboard Box</option>
                  <option value="Android Phone Farm">Android Phone Farm</option>
                  <option value="iPhone Phone Farm">iPhone Phone Farm</option>
                  <option value="Enterprise Package">Enterprise Package</option>
                  <option value="Custom Quote">Custom Quote</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Message</label>
              <textarea name="message" rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
            <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
              {status === "loading" ? "Sending..." : "Request Consultation"}
            </button>
            {status === "error" && <p className="text-red-400 text-sm text-center">Failed to send. Please use WhatsApp or Telegram.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
