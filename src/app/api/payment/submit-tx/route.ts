import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TX_HASH_RE = /^[0-9a-fA-F]{64}$/;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { paymentId?: string; txHash?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const paymentId = body.paymentId?.trim();
  const txHash = body.txHash?.trim();

  if (!paymentId || !txHash) {
    return NextResponse.json({ error: "paymentId and txHash required" }, { status: 400 });
  }

  if (!TX_HASH_RE.test(txHash)) {
    return NextResponse.json({ error: "Invalid TRC20 transaction hash (64 hex characters)" }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });

  if (!payment || payment.order.userId !== session.id) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  if (payment.paymentStatus === "paid") {
    return NextResponse.json({ error: "Payment already confirmed" }, { status: 409 });
  }

  if (payment.paymentStatus === "expired" || new Date() > payment.expiresAt) {
    return NextResponse.json({ error: "Payment window expired" }, { status: 409 });
  }

  const updated = await prisma.payment.update({
    where: { id: paymentId },
    data: {
      txHash,
      paymentStatus: "manual_review",
      verificationStatus: "manual_review",
    },
  });

  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: "Payment Under Review" },
  });

  return NextResponse.json({
    ok: true,
    payment: {
      paymentStatus: updated.paymentStatus,
      verificationStatus: updated.verificationStatus,
      txHash: updated.txHash,
    },
  });
}
