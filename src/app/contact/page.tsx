"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ContactBar } from "@/components/shared";
import { CONTACT, SITE } from "@/lib/config";

function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-slate-800 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Name *</label>
          <input name="name" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Company</label>
          <input name="company" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Email *</label>
          <input name="email" type="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">WhatsApp / Telegram</label>
          <input name="whatsapp" placeholder="Your WhatsApp or Telegram handle" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Phone</label>
          <input name="phone" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Shipping Country</label>
          <input name="country" placeholder="e.g. United States, Germany" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Product Interest</label>
          <input name="productInterest" defaultValue={searchParams.get("product") || searchParams.get("service") || ""} placeholder="e.g. phone farm rack, motherboard box" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Device Quantity</label>
          <input name="deviceQuantity" placeholder="e.g. 20, 50, 100" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Message</label>
        <textarea name="message" rows={4} placeholder="Device models, use case, timeline, cooling/power requirements..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "Sending..." : "Request a Quote"}
      </button>
      {status === "success" && <p className="text-green-400 text-sm">Thank you. Our sales team will reply within one business day.</p>}
      {status === "error" && <p className="text-red-400 text-sm">Failed to send. Please contact us via WhatsApp.</p>}
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Sales</h1>
        <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
          Request a hardware quote from our {SITE.location} team. Include device quantity, product interest, shipping country, and timeline. We typically reply within one business day.
        </p>

        <div className="p-6 rounded-lg border border-slate-800 mb-8">
          <h2 className="font-bold text-white mb-2">Direct Contact</h2>
          <p className="text-slate-500 text-sm mb-4">WhatsApp is fastest for urgent inquiries. Email works well for spec attachments and bulk quote requests.</p>
          <ContactBar />
        </div>

        <Suspense fallback={<div className="p-6 text-slate-400 border border-slate-800 rounded-lg">Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
