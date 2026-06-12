import { NextRequest, NextResponse } from "next/server";
import { checkAndUpdatePayment } from "@/lib/payment";
import { isAutoPaymentVerificationEnabled } from "@/lib/payment-status";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("paymentId");
  if (!paymentId) {
    return NextResponse.json({ error: "paymentId required" }, { status: 400 });
  }

  const result = await checkAndUpdatePayment(paymentId);
  if (!result) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: { select: { orderNumber: true, totalUsd: true } } },
  });

  return NextResponse.json({
    status: result.status,
    mode: result.mode,
    autoVerifyEnabled: isAutoPaymentVerificationEnabled(),
    payment: payment
      ? {
          paymentStatus: payment.paymentStatus,
          verificationStatus: payment.verificationStatus,
          expectedAmount: payment.expectedAmount,
          receivedAmount: payment.receivedAmount,
          paymentAddress: payment.paymentAddress,
          paymentNetwork: payment.paymentNetwork,
          txHash: payment.txHash,
          expiresAt: payment.expiresAt,
          paidAt: payment.paidAt,
          orderNumber: payment.order.orderNumber,
          orderTotalUsd: payment.order.totalUsd,
        }
      : null,
  });
}
