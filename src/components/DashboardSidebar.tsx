"use client";

import Image from "next/image";
import Link from "next/link";

import NavLink from "@/components/NavLink";
import { AccountNavIcon, ChecklistNavIcon, DashboardNavIcon, SettingsNavIcon } from "@/components/icons";

export default function DashboardSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu overlay"
        />
      ) : null}

      <aside
        className={
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200/60 bg-white/90 backdrop-blur transition-transform dark:border-slate-800/60 dark:bg-slate-950/80 lg:static lg:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <Image src="/logo.png" alt="Checklist" width={36} height={36} className="h-9 w-9 object-contain" priority />
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Checklist</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 lg:hidden"
            aria-label="Close menu"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="px-4 pb-4">
          <nav className="mt-5 space-y-1">
            <NavLink href="/dashboard" icon={<DashboardNavIcon />} onNavigate={() => setOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink href="/checklists" icon={<ChecklistNavIcon />} onNavigate={() => setOpen(false)}>
              My Checklists
            </NavLink>
            <NavLink href="/account" icon={<AccountNavIcon />} onNavigate={() => setOpen(false)}>
              Account
            </NavLink>
            <NavLink href="/settings" icon={<SettingsNavIcon />} onNavigate={() => setOpen(false)}>
              Settings
            </NavLink>
          </nav>

          <div className="mt-6 rounded-xl border border-violet-100 bg-violet-50 p-4 dark:border-violet-900/40 dark:bg-violet-950/30">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">Tips</p>
            <p className="mt-1 text-xs leading-5 text-violet-800/80 dark:text-violet-200/80">
              Create separate checklists for projects, errands, and routines.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
