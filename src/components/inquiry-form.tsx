import Link from "next/link";
import { submitInquiryAction } from "@/lib/inquiry-action";
import { INQUIRY_CONNECTION_MODES, INQUIRY_PLATFORMS } from "@/lib/inquiry";
import { InquiryFormEnhance } from "./inquiry-form-enhance";

type InquiryFormProps = {
  sourcePage: string;
  submitLabel?: string;
  className?: string;
  defaultProductInterest?: string;
  defaultMessage?: string;
};

const FORM_ID = "hardware-inquiry-form";

/**
 * Server-rendered RFQ form — all fields are in the first HTML response for SEO and no-JS users.
 * JS enhancement intercepts submit for in-page feedback; without JS, server action handles POST.
 */
export function InquiryForm({
  sourcePage,
  submitLabel = "Request a Quote",
  className = "",
  defaultProductInterest = "",
  defaultMessage = "",
}: InquiryFormProps) {
  return (
    <form
      id={FORM_ID}
      action={submitInquiryAction}
      method="POST"
      className={`card p-6 md:p-8 space-y-4 ${className}`}
    >
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <p className="text-xs text-[var(--text-subtle)]">
        Guangzhou factory-direct hardware RFQ — share device models, node count, platform, and shipping
        country for a written BOM-style quotation. Final configuration and price are confirmed before any
        payment.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-name" className="form-label">
            Name *
          </label>
          <input id="inq-name" name="name" required maxLength={200} className="form-input" />
        </div>
        <div>
          <label htmlFor="inq-company" className="form-label">
            Company
          </label>
          <input id="inq-company" name="company" maxLength={200} className="form-input" />
        </div>
        <div>
          <label htmlFor="inq-email" className="form-label">
            Email *
          </label>
          <input id="inq-email" name="email" type="email" required maxLength={320} className="form-input" />
        </div>
        <div>
          <label htmlFor="inq-whatsapp" className="form-label">
            WhatsApp / Telegram *
          </label>
          <input
            id="inq-whatsapp"
            name="whatsapp"
            required
            placeholder="@handle or +country code number"
            maxLength={120}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="inq-country" className="form-label">
            Shipping country *
          </label>
          <input
            id="inq-country"
            name="country"
            required
            placeholder="e.g. United States, Germany, UAE"
            maxLength={120}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="inq-product" className="form-label">
            Product interest *
          </label>
          <input
            id="inq-product"
            name="productInterest"
            required
            defaultValue={defaultProductInterest}
            placeholder="e.g. Phone Farm Box, motherboard box, USB hub package"
            maxLength={300}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="inq-qty" className="form-label">
            Quantity / node count *
          </label>
          <input
            id="inq-qty"
            name="deviceQuantity"
            required
            placeholder="e.g. 1 sample rack, 20 nodes, 5× motherboard box"
            maxLength={80}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="inq-platform" className="form-label">
            Platform *
          </label>
          <select id="inq-platform" name="platform" required className="form-input" defaultValue="">
            <option value="" disabled>
              Select device platform
            </option>
            {INQUIRY_PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="inq-connection" className="form-label">
            Connection mode *
          </label>
          <select id="inq-connection" name="connectionMode" required className="form-input" defaultValue="">
            <option value="" disabled>
              Select USB / LAN path
            </option>
            {INQUIRY_CONNECTION_MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="inq-budget" className="form-label">
            Budget (optional)
          </label>
          <input
            id="inq-budget"
            name="budget"
            placeholder="e.g. USD 3,000–5,000 all-in"
            maxLength={120}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="inq-contact-pref" className="form-label">
            Preferred contact
          </label>
          <select id="inq-contact-pref" name="preferredContact" className="form-input" defaultValue="">
            <option value="">No preference</option>
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inq-message" className="form-label">
          Message
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={4}
          defaultValue={defaultMessage}
          placeholder="Device models (Samsung, Oppo, Xiaomi, Pixel…), rack layout, timeline, power/cooling, export requirements…"
          maxLength={8000}
          className="form-input"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--text-muted)] cursor-pointer">
        <input
          type="checkbox"
          name="privacyConsent"
          required
          value="on"
          className="mt-1 shrink-0"
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy" className="text-[var(--brand)] hover:underline">
            Privacy Policy
          </Link>{" "}
          and consent to PhoneFarm ICU storing this inquiry for sales follow-up. *
        </span>
      </label>

      <button type="submit" className="btn-primary w-full">
        {submitLabel}
      </button>

      <noscript>
        <p className="text-xs text-[var(--text-subtle)]">
          JavaScript is disabled — submit the form above and you will be redirected after we receive your
          inquiry.
        </p>
      </noscript>

      <InquiryFormEnhance formId={FORM_ID} />
    </form>
  );
}
