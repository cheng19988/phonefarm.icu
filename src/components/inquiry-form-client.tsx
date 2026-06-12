"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InquiryFormClientProps = {
  sourcePage: string;
  submitLabel?: string;
  className?: string;
  defaultProductInterest?: string;
  defaultMessage?: string;
};

export function InquiryFormClient({
  sourcePage,
  submitLabel = "Request a Quote",
  className = "",
  defaultProductInterest = "",
  defaultMessage = "",
}: InquiryFormClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    form.set("sourcePage", sourcePage);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Submission failed. Please try WhatsApp or email.");
        return;
      }

      router.push("/inquiry-received");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please contact us via WhatsApp or email.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`card p-6 md:p-8 space-y-4 ${className}`}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <p className="text-xs text-[var(--text-subtle)]">
        Bulk quote and configuration support — share device models, quantity, and shipping country for a written hardware quotation.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Name *</label>
          <input name="name" required maxLength={200} className="form-input" />
        </div>
        <div>
          <label className="form-label">Company</label>
          <input name="company" maxLength={200} className="form-input" />
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input name="email" type="email" required maxLength={320} className="form-input" />
        </div>
        <div>
          <label className="form-label">WhatsApp / Telegram</label>
          <input name="whatsapp" placeholder="@handle or +country code number" maxLength={120} className="form-input" />
        </div>
        <div>
          <label className="form-label">Product interest</label>
          <input
            name="productInterest"
            defaultValue={defaultProductInterest}
            placeholder="e.g. Phone Farm Box, motherboard box, package"
            maxLength={300}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Device quantity</label>
          <input name="deviceQuantity" placeholder="e.g. 20, 50, 100" maxLength={50} className="form-input" />
        </div>
        <div>
          <label className="form-label">Shipping country</label>
          <input name="country" placeholder="e.g. United States, Germany" maxLength={120} className="form-input" />
        </div>
        <div>
          <label className="form-label">Preferred contact</label>
          <select name="preferredContact" className="form-input" defaultValue="">
            <option value="">No preference</option>
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Phone">Phone</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Phone (optional)</label>
          <input name="phone" maxLength={40} className="form-input" />
        </div>
      </div>

      <div>
        <label className="form-label">Message</label>
        <textarea
          name="message"
          rows={4}
          defaultValue={defaultMessage}
          placeholder="Device models, rack layout, timeline, cooling/power requirements, compatibility questions..."
          maxLength={8000}
          className="form-input"
        />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "Submitting inquiry…" : submitLabel}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
