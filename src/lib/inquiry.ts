import { HARDWARE_PACKAGES } from "@/data/packages";
import { PRODUCT_SEEDS } from "@/data/products";

export const INQUIRY_STATUSES = ["New", "Contacted", "Quoted", "Closed", "Spam"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export type InquiryPayload = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  phone: string;
  country: string;
  productInterest: string;
  deviceQuantity: string;
  preferredContact: string;
  message: string;
  sourcePage: string;
  website?: string;
};

export function resolveProductInterest(slugOrLabel: string): string {
  const key = slugOrLabel.trim();
  if (!key) return "";
  const product = PRODUCT_SEEDS.find((p) => p.slug === key);
  if (product) return product.name;
  const pkg = HARDWARE_PACKAGES.find((p) => p.slug === key);
  if (pkg) return `${pkg.name} (package)`;
  return key;
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
    preferredContact: String(form.get("preferredContact") || "").trim(),
    message: String(form.get("message") || "").trim(),
    sourcePage: String(form.get("sourcePage") || "").trim(),
    website: String(form.get("website") || "").trim(),
  };
}

export function validateInquiry(data: InquiryPayload): string | null {
  if (!data.name) return "Name is required.";
  if (!data.email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Please enter a valid email address.";
  if (data.name.length > 200) return "Name is too long.";
  if (data.email.length > 320) return "Email is too long.";
  if (data.message.length > 8000) return "Message is too long.";
  return null;
}
