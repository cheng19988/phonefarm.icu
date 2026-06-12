import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { roundUsd } from "@/lib/pricing";
import {
  isValidPaymentStatus,
  orderStatusForPayment,
  type PaymentStatus,
} from "@/lib/payment-status";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: {
    paymentStatus?: string;
    receivedAmount?: number | null;
    txHash?: string | null;
    verificationStatus?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const paymentStatus = body.paymentStatus?.trim();
  if (!paymentStatus || !isValidPaymentStatus(paymentStatus)) {
    return NextResponse.json({ error: "Invalid paymentStatus" }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const receivedAmount =
    body.receivedAmount === null || body.receivedAmount === undefined
      ? payment.receivedAmount
      : roundUsd(Number(body.receivedAmount));

  const txHash =
    body.txHash === null || body.txHash === undefined ? payment.txHash : body.txHash.trim() || null;

  let verificationStatus = body.verificationStatus?.trim() || payment.verificationStatus;
  if (paymentStatus === "paid") verificationStatus = "verified";
  if (paymentStatus === "manual_review") verificationStatus = "manual_review";
  if (paymentStatus === "underpaid") verificationStatus = "underpaid";
  if (paymentStatus === "overpaid") verificationStatus = "overpaid";
  if (paymentStatus === "expired") verificationStatus = "expired";
  if (paymentStatus === "pending") verificationStatus = "unverified";

  const paidAt = paymentStatus === "paid" ? payment.paidAt ?? new Date() : payment.paidAt;

  try {
    const updated = await prisma.payment.update({
      where: { id },
      data: {
        paymentStatus,
        verificationStatus,
        receivedAmount,
        txHash,
        paidAt,
      },
    });

    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: orderStatusForPayment(paymentStatus as PaymentStatus) },
    });

    return NextResponse.json({ ok: true, payment: updated });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
