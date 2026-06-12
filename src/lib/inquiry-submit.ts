import { prisma } from "./prisma";
import { notifyTelegramInquiry } from "./notify-telegram";
import type { InquiryPayload } from "./inquiry";
import { resolveSourcePage } from "./inquiry";

export async function saveInquiry(data: InquiryPayload, referer = "") {
  const sourcePage = resolveSourcePage(data.sourcePage, referer);

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
      platform: data.platform || null,
      connectionMode: data.connectionMode || null,
      budget: data.budget || null,
      preferredContact: data.preferredContact || null,
      sourcePage: sourcePage || null,
      message: data.message || null,
      status: "New",
    },
  });

  await notifyTelegramInquiry({ ...data, sourcePage });
}
