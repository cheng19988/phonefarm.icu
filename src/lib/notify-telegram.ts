import type { InquiryPayload } from "./inquiry";

function enabled() {
  return (
    process.env.INQUIRY_NOTIFY_ENABLED === "true" &&
    !!process.env.TELEGRAM_BOT_TOKEN &&
    !!process.env.TELEGRAM_CHAT_ID
  );
}

function truncate(text: string, max = 280) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

export async function notifyTelegramInquiry(data: InquiryPayload) {
  if (!enabled()) return;

  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  const lines = [
    "📋 New hardware inquiry — PhoneFarm ICU",
    "",
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : null,
    `Product: ${data.productInterest || "—"}`,
    `Qty: ${data.deviceQuantity || "—"}`,
    `Country: ${data.country || "—"}`,
    `Email: ${data.email}`,
    data.whatsapp ? `WhatsApp/TG: ${data.whatsapp}` : null,
    data.preferredContact ? `Preferred: ${data.preferredContact}` : null,
    data.sourcePage ? `Source: ${data.sourcePage}` : null,
    data.message ? `\nMessage:\n${truncate(data.message)}` : null,
  ].filter(Boolean);

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        disable_web_page_preview: true,
      }),
    });
  } catch {
    /* notification failure must not block inquiry */
  }
}
