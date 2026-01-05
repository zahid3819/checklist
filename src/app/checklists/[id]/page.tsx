import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import ChecklistDetailClient from "@/components/ChecklistDetailClient";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function ChecklistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const checklist = await prisma.checklist.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: {
        orderBy: { id: "asc" },
      },
    },
  });

  if (!checklist) {
    notFound();
  }

  const initial = {
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
  };

  return <ChecklistDetailClient initial={initial} />;
}
