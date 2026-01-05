"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  icon,
  children,
  onNavigate,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={
        "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition " +
        (active
          ? "bg-violet-600 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900")
      }
    >
      <span className="flex items-center gap-3">
        {icon ? <span className={active ? "text-white" : "text-slate-500"}>{icon}</span> : null}
        <span>{children}</span>
      </span>
      {active ? <span className="text-xs opacity-90">●</span> : null}
    </Link>
  );
}
