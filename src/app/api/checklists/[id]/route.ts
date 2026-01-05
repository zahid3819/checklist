import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ApiError, toErrorResponse } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateChecklistSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const { id } = await params;

    const checklist = await prisma.checklist.findFirst({
      where: { id, userId: session.user.id },
      include: {
        items: {
          orderBy: { id: "asc" },
        },
      },
    });

    if (!checklist) throw new ApiError(404, "Checklist not found");

    return NextResponse.json({
      id: checklist.id,
      title: checklist.title,
      userId: checklist.userId,
      createdAt: checklist.createdAt.toISOString(),
      items: checklist.items.map((i) => ({
        id: i.id,
        content: i.content,
        completed: i.completed,
        checklistId: i.checklistId,
      })),
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const { id } = await params;
    const body = await req.json();
    const input = updateChecklistSchema.parse(body);

    const existing = await prisma.checklist.findFirst({
      where: { id, userId: session.user.id },
      select: { id: true },
    });

    if (!existing) throw new ApiError(404, "Checklist not found");

    const updated = await prisma.checklist.update({
      where: { id },
      data: {
        title: input.title,
      },
    });

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
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

    const existing = await prisma.checklist.findFirst({
      where: { id, userId: session.user.id },
      select: { id: true },
    });

    if (!existing) throw new ApiError(404, "Checklist not found");

    await prisma.checklist.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return toErrorResponse(err);
  }
}
