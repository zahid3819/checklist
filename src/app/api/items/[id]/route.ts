import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ApiError, toErrorResponse } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateItemSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const { id } = await params;
    const body = await req.json();
    const input = updateItemSchema.parse(body);

    const existing = await prisma.checklistItem.findFirst({
      where: {
        id,
        checklist: {
          userId: session.user.id,
        },
      },
      select: { id: true },
    });

    if (!existing) throw new ApiError(404, "Item not found");

    const updated = await prisma.checklistItem.update({
      where: { id },
      data: {
        content: input.content,
        completed: input.completed,
      },
    });

    return NextResponse.json({
      id: updated.id,
      content: updated.content,
      completed: updated.completed,
      checklistId: updated.checklistId,
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const { id } = await params;

    const existing = await prisma.checklistItem.findFirst({
      where: {
        id,
        checklist: {
          userId: session.user.id,
        },
      },
      select: { id: true },
    });

    if (!existing) throw new ApiError(404, "Item not found");

    await prisma.checklistItem.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return toErrorResponse(err);
  }
}
