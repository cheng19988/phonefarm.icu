import { PAYMENT } from "./config";
import { roundUsd, usdToUsdt } from "./pricing";

/** Customer-facing payment lifecycle statuses. */
export const PAYMENT_STATUSES = [
  "pending",
  "manual_review",
  "paid",
  "underpaid",
  "overpaid",
  "expired",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const VERIFICATION_STATUSES = [
  "unverified",
  "manual_review",
  "verified",
  "underpaid",
  "overpaid",
  "expired",
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

/** Automatic on-chain matching — disabled until Tron integration is enabled in production. */
export function isAutoPaymentVerificationEnabled(): boolean {
  return process.env.PAYMENT_AUTO_VERIFY === "true" && Boolean(process.env.TRON_API_KEY);
}

export function isValidPaymentStatus(value: string): value is PaymentStatus {
  return (PAYMENT_STATUSES as readonly string[]).includes(value);
}

export function paymentStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Pending";
    case "manual_review":
      return "Manual review";
    case "paid":
      return "Paid";
    case "underpaid":
      return "Underpaid";
    case "overpaid":
      return "Overpaid";
    case "expired":
      return "Expired";
    default:
      return status;
  }
}

export function paymentStatusBadgeClass(status: string): string {
  switch (status) {
    case "paid":
      return "badge-green";
    case "pending":
      return "badge-yellow";
    case "manual_review":
      return "badge-yellow";
    case "underpaid":
    case "overpaid":
      return "badge-yellow";
    case "expired":
      return "badge-red";
    default:
      return "badge-red";
  }
}

export function orderStatusForPayment(paymentStatus: PaymentStatus): string {
  switch (paymentStatus) {
    case "paid":
      return "Paid";
    case "expired":
      return "Expired";
    case "underpaid":
    case "overpaid":
    case "manual_review":
      return "Payment Under Review";
    case "pending":
    default:
      return "Waiting for Payment";
  }
}

export type PaymentAmountSummary = {
  totalUsd: number;
  expectedUsdt: number;
  derivedUsdt: number;
  consistent: boolean;
  minimumApplied: boolean;
  note: string | null;
};

/** Ensures displayed USD total and stored USDT expected amount use the same conversion rule. */
export function paymentAmountSummary(totalUsd: number, expectedUsdt: number): PaymentAmountSummary {
  const total = roundUsd(totalUsd);
  const expected = roundUsd(expectedUsdt);
  const derived = usdToUsdt(total);
  const consistent = derived === expected;
  const minimumApplied = derived > total;

  let note: string | null = null;
  if (minimumApplied) {
    note = `Minimum USDT payment is ${PAYMENT.minAmount} USDT (order total is ${total} USD).`;
  } else if (consistent) {
    note = "USDT amount matches order total (1:1 USD reference).";
  } else {
    note = "USDT amount does not match order total — contact sales before paying.";
  }

  return {
    totalUsd: total,
    expectedUsdt: expected,
    derivedUsdt: derived,
    consistent,
    minimumApplied,
    note,
  };
}

export function classifyReceivedAmount(
  received: number,
  expected: number,
): { paymentStatus: PaymentStatus; verificationStatus: VerificationStatus } {
  const r = roundUsd(received);
  const e = roundUsd(expected);
  if (r < e) {
    return { paymentStatus: "underpaid", verificationStatus: "underpaid" };
  }
  if (r > e) {
    return { paymentStatus: "overpaid", verificationStatus: "overpaid" };
  }
  return { paymentStatus: "paid", verificationStatus: "verified" };
}
