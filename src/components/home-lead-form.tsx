"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/config";

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
    <section className="py-16 border-t border-slate-800 bg-slate-900/30">
      <div className="container-wide max-w-3xl">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Get a Hardware Recommendation</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Tell us your device count and deployment goals. Our Guangzhou sales engineers typically reply within one business day.
        </p>
        {status === "success" ? (
          <div className="p-8 rounded-lg border border-slate-800 text-center">
            <p className="text-green-400 mb-4">Thank you. We will reach out via email or WhatsApp shortly.</p>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">WhatsApp Sales</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-slate-800 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Name *</label>
                <input name="name" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email *</label>
                <input name="email" type="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Company</label>
                <input name="company" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Device Quantity</label>
                <input name="deviceQuantity" placeholder="e.g. 20, 100" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Product Interest</label>
                <select name="productInterest" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white">
                  <option value="Phone Farm Rack">Phone Farm Rack</option>
                  <option value="Motherboard Box">Motherboard Box</option>
                  <option value="Cooling & Power">Cooling & Power</option>
                  <option value="USB Hub & Cables">USB Hub & Cables</option>
                  <option value="Custom Cabinet">Custom Cabinet</option>
                  <option value="Hardware Package">Hardware Package</option>
                  <option value="Custom Quote">Custom Quote</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Message</label>
              <textarea name="message" rows={3} placeholder="Shipping country, device models, use case..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
            <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
              {status === "loading" ? "Sending..." : "Request a Quote"}
            </button>
            {status === "error" && <p className="text-red-400 text-sm text-center">Failed to send. Please use <Link href="/contact" className="text-cyan-400">contact form</Link> or WhatsApp.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
