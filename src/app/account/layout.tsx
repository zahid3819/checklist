import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import { authOptions } from "@/lib/auth";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <DashboardShell userEmail={session.user.email ?? ""}>{children}</DashboardShell>;
}
