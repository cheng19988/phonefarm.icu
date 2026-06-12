import { PAYMENT } from "./config";
import { roundUsd } from "./pricing";
import { prisma } from "./prisma";
import {
  classifyReceivedAmount,
  isAutoPaymentVerificationEnabled,
  orderStatusForPayment,
  type PaymentStatus,
} from "./payment-status";

export { usdToUsdt } from "./pricing";

export type TronTransaction = {
  txHash: string;
  amount: number;
  to: string;
  confirmed: boolean;
};

/** TronGrid / Tronscan TRC20 transfer check — enabled only when PAYMENT_AUTO_VERIFY=true. */
export async function verifyTronPayment(
  _address: string,
  _expectedAmount: number,
  _since: Date,
): Promise<TronTransaction | null> {
  if (!isAutoPaymentVerificationEnabled()) {
    return null;
  }

  // TODO: Integrate TronGrid TRC20 transfer check
  // Example: https://api.trongrid.io/v1/accounts/{address}/transactions/trc20
  // Match USDT contract TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
  return null;
}

async function markExpired(paymentId: string, orderId: string) {
  await prisma.payment.update({
    where: { id: paymentId },
    data: { paymentStatus: "expired", verificationStatus: "expired" },
  });
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "Expired" },
  });
}

export async function checkAndUpdatePayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });
  if (!payment) return null;

  const awaitingPayment = ["pending", "manual_review", "underpaid"] as const;
  if (
    new Date() > payment.expiresAt &&
    (awaitingPayment as readonly string[]).includes(payment.paymentStatus)
  ) {
    await markExpired(payment.id, payment.orderId);
    return { status: "expired" as const, mode: isAutoPaymentVerificationEnabled() ? "auto" : "manual" };
  }

  if (payment.paymentStatus === "expired") {
    return { status: "expired" as const, mode: isAutoPaymentVerificationEnabled() ? "auto" : "manual" };
  }

  if (payment.paymentStatus === "paid") {
    return { status: "paid" as const, mode: isAutoPaymentVerificationEnabled() ? "auto" : "manual" };
  }

  if (!isAutoPaymentVerificationEnabled()) {
    return { status: payment.paymentStatus as PaymentStatus, mode: "manual" as const, payment };
  }

  const tx = await verifyTronPayment(
    payment.paymentAddress,
    payment.expectedAmount,
    payment.createdAt,
  );

  if (!tx) {
    return { status: payment.paymentStatus as PaymentStatus, mode: "auto" as const, payment };
  }

  const { paymentStatus, verificationStatus } = classifyReceivedAmount(tx.amount, payment.expectedAmount);
  const now = new Date();

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      paymentStatus,
      verificationStatus,
      receivedAmount: roundUsd(tx.amount),
      txHash: tx.txHash,
      paidAt: paymentStatus === "paid" ? now : payment.paidAt,
    },
  });
  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: orderStatusForPayment(paymentStatus) },
  });

  return { status: paymentStatus, mode: "auto" as const };
}

export function createPaymentExpiry() {
  return new Date(Date.now() + PAYMENT.expiryMinutes * 60 * 1000);
}

export function initialVerificationStatus(): "unverified" {
  return "unverified";
}
