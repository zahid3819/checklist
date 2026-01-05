import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const checklists = await prisma.checklist.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        orderBy: { id: "asc" },
      },
    },
  });

  const initial = checklists.map((c) => ({
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
  }));

  return (
    <DashboardClient initial={initial} />
  );
}
