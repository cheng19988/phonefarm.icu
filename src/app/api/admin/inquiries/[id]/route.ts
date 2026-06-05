import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { INQUIRY_STATUSES } from "@/lib/inquiry";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = body.status?.trim();
  if (!status || !INQUIRY_STATUSES.includes(status as (typeof INQUIRY_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, inquiry: updated });
  } catch {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }
}
