"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { parseInquiryForm, validateInquiry } from "./inquiry";
import { saveInquiry } from "./inquiry-submit";

export async function submitInquiryAction(formData: FormData) {
  const data = parseInquiryForm(formData);

  if (data.website) {
    redirect("/inquiry-received");
  }

  const validationError = validateInquiry(data);
  if (validationError) {
    redirect(`/contact?inquiry_error=${encodeURIComponent(validationError)}`);
  }

  const referer = (await headers()).get("referer") || "";

  try {
    await saveInquiry(data, referer);
    redirect("/inquiry-received");
  } catch (err) {
    console.error("Inquiry server action failed:", err);
    redirect(
      `/contact?inquiry_error=${encodeURIComponent(
        "We could not save your inquiry. Please contact us via WhatsApp or email.",
      )}`,
    );
  }
}
