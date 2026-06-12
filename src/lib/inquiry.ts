import { HARDWARE_PACKAGES } from "@/data/packages";
import { PRODUCT_SEEDS } from "@/data/products";
import { SERVICES } from "@/data/services";

export const INQUIRY_STATUSES = ["New", "Contacted", "Quoted", "Closed", "Spam"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const INQUIRY_PLATFORMS = [
  "Android phones",
  "iPhone / iOS",
  "Motherboard nodes (screenless)",
  "Mixed Android + iPhone",
  "Not decided yet",
] as const;

export const INQUIRY_CONNECTION_MODES = [
  "USB / ADB",
  "LAN / Ethernet",
  "USB + LAN hybrid",
  "Not decided yet",
] as const;

export type InquiryPayload = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  phone: string;
  country: string;
  productInterest: string;
  deviceQuantity: string;
  platform: string;
  connectionMode: string;
  budget: string;
  preferredContact: string;
  message: string;
  sourcePage: string;
  privacyConsent: string;
  website?: string;
};

export function resolveProductInterest(slugOrLabel: string): string {
  const key = slugOrLabel.trim();
  if (!key) return "";
  const product = PRODUCT_SEEDS.find((p) => p.slug === key);
  if (product) return product.name;
  const pkg = HARDWARE_PACKAGES.find((p) => p.slug === key);
  if (pkg) return `${pkg.name} (package)`;
  const service = SERVICES.find((s) => s.slug === key);
  if (service) return service.title;
  return key;
}

export function resolveSourcePage(formSource: string, referer: string): string {
  const fromForm = formSource.trim();
  if (fromForm) return fromForm;
  if (!referer.trim()) return "";
  try {
    return new URL(referer).pathname;
  } catch {
    return "";
  }
}

export function parseInquiryForm(form: FormData): InquiryPayload {
  return {
    name: String(form.get("name") || "").trim(),
    company: String(form.get("company") || "").trim(),
    email: String(form.get("email") || "").trim(),
    whatsapp: String(form.get("whatsapp") || "").trim(),
    phone: String(form.get("phone") || "").trim(),
    country: String(form.get("country") || "").trim(),
    productInterest: String(form.get("productInterest") || "").trim(),
    deviceQuantity: String(form.get("deviceQuantity") || "").trim(),
    platform: String(form.get("platform") || "").trim(),
    connectionMode: String(form.get("connectionMode") || "").trim(),
    budget: String(form.get("budget") || "").trim(),
    preferredContact: String(form.get("preferredContact") || "").trim(),
    message: String(form.get("message") || "").trim(),
    sourcePage: String(form.get("sourcePage") || "").trim(),
    privacyConsent: String(form.get("privacyConsent") || "").trim(),
    website: String(form.get("website") || "").trim(),
  };
}

export function validateInquiry(data: InquiryPayload): string | null {
  if (!data.name) return "Name is required.";
  if (!data.email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Please enter a valid email address.";
  if (!data.whatsapp) return "WhatsApp or Telegram handle is required.";
  if (!data.country) return "Shipping country is required.";
  if (!data.productInterest) return "Product interest is required.";
  if (!data.deviceQuantity) return "Quantity / node count is required.";
  if (!data.platform) return "Platform (device type) is required.";
  if (!data.connectionMode) return "Connection mode is required.";
  if (data.privacyConsent !== "on" && data.privacyConsent !== "true") {
    return "Please accept the privacy policy to submit your inquiry.";
  }
  if (data.name.length > 200) return "Name is too long.";
  if (data.email.length > 320) return "Email is too long.";
  if (data.message.length > 8000) return "Message is too long.";
  return null;
}
