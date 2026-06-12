import { NextRequest, NextResponse } from "next/server";
import { parseInquiryForm, validateInquiry } from "@/lib/inquiry";
import { saveInquiry } from "@/lib/inquiry-submit";

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const data = parseInquiryForm(form);

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validateInquiry(data);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await saveInquiry(data, req.headers.get("referer") || "");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      {
        error:
          "We could not save your inquiry right now. Please contact us via WhatsApp or email directly.",
      },
      { status: 503 },
    );
  }
}
