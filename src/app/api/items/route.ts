import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ApiError, toErrorResponse } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createItemSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const body = await req.json();
    const input = createItemSchema.parse(body);

    const checklist = await prisma.checklist.findFirst({
      where: { id: input.checklistId, userId: session.user.id },
      select: { id: true },
    });

    if (!checklist) throw new ApiError(404, "Checklist not found");

    const item = await prisma.checklistItem.create({
      data: {
        checklistId: input.checklistId,
        content: input.content,
      },
    });

    return NextResponse.json(
      {
        id: item.id,
        content: item.content,
        completed: item.completed,
        checklistId: item.checklistId,
      },
      { status: 201 }
    );
  } catch (err) {
    return toErrorResponse(err);
  }
}
