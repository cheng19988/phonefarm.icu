import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyTelegramInquiry } from "@/lib/notify-telegram";
import { parseInquiryForm, resolveSourcePage, validateInquiry } from "@/lib/inquiry";

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

  const sourcePage = resolveSourcePage(data.sourcePage, req.headers.get("referer") || "");

  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        whatsapp: data.whatsapp || null,
        phone: data.phone || null,
        country: data.country || null,
        deviceQuantity: data.deviceQuantity || null,
        productInterest: data.productInterest || null,
        preferredContact: data.preferredContact || null,
        sourcePage: sourcePage || null,
        message: data.message || null,
        status: "New",
      },
    });

    await notifyTelegramInquiry({ ...data, sourcePage });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      {
        error:
          "We could not save your inquiry right now. Please contact us via WhatsApp or email directly.",
      },
      { status: 503 }
    );
  }
}
