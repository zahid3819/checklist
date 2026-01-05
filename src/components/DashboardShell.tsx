"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import DashboardSidebar from "@/components/DashboardSidebar";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const header = useMemo(() => {
    if (pathname.startsWith("/checklists")) {
      return {
        title: "My Checklists",
        subtitle: pathname === "/checklists" ? "Browse and manage your lists" : "Edit checklist items",
      };
    }

    if (pathname.startsWith("/account")) {
      return { title: "Account", subtitle: "Profile and security" };
    }

    if (pathname.startsWith("/settings")) {
      return { title: "Settings", subtitle: "Preferences and session" };
    }

    return { title: "Dashboard", subtitle: "Overview" };
  }, [pathname]);

  const initials = useMemo(() => {
    const v = userEmail.trim();
    if (!v) return "U";
    return v[0]?.toUpperCase() ?? "U";
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-violet-950/20 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        <DashboardSidebar open={open} setOpen={setOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/70">
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 lg:hidden"
                  aria-label="Open menu"
                >
                  <span className="text-xl leading-none">≡</span>
                </button>

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{header.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{header.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />

                <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 sm:flex">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                    {initials}
                  </span>
                  <span className="max-w-[220px] truncate">{userEmail}</span>
                </div>

                <SignOutButton />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
