"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Progressive enhancement — native form submit works without JS via server action. */
export function InquiryFormEnhance({ formId = "hardware-inquiry-form" }: { formId?: string }) {
  const router = useRouter();

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form || !(form instanceof HTMLFormElement)) return;

    const handler = async (e: SubmitEvent) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = true;

      const formData = new FormData(form);
      let errorEl = form.querySelector("[data-inquiry-error]");
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.setAttribute("data-inquiry-error", "");
        errorEl.setAttribute("role", "alert");
        errorEl.className =
          "text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2";
        form.appendChild(errorEl);
      }
      errorEl.textContent = "";

      try {
        const res = await fetch("/api/contact", { method: "POST", body: formData });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          (errorEl as HTMLElement).textContent =
            data.error || "Submission failed. Please try WhatsApp or email.";
          return;
        }
        router.push("/inquiry-received");
      } catch {
        (errorEl as HTMLElement).textContent =
          "Network error. Please contact us via WhatsApp or email.";
      } finally {
        if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = false;
      }
    };

    form.addEventListener("submit", handler);
    return () => form.removeEventListener("submit", handler);
  }, [formId, router]);

  return null;
}
