import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ApiError, toErrorResponse } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createChecklistSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const checklists = await prisma.checklist.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          orderBy: { id: "asc" },
        },
      },
    });

    return NextResponse.json(
      checklists.map((c) => ({
        id: c.id,
        title: c.title,
        userId: c.userId,
        createdAt: c.createdAt.toISOString(),
        items: c.items.map((i) => ({
          id: i.id,
          content: i.content,
          completed: i.completed,
          checklistId: i.checklistId,
        })),
      }))
    );
  } catch (err) {
    return toErrorResponse(err);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new ApiError(401, "Unauthorized");

    const body = await req.json();
    const input = createChecklistSchema.parse(body);

    const checklist = await prisma.checklist.create({
      data: {
        title: input.title,
        userId: session.user.id,
      },
      include: { items: true },
    });

    return NextResponse.json(
      {
        id: checklist.id,
        title: checklist.title,
        userId: checklist.userId,
        createdAt: checklist.createdAt.toISOString(),
        items: [],
      },
      { status: 201 }
    );
  } catch (err) {
    return toErrorResponse(err);
  }
}
