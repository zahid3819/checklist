import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-violet-50 to-white px-6 py-5 dark:border-slate-800/60 dark:from-violet-950/30 dark:to-slate-950">
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">Account</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Manage your profile details and security.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 px-6 py-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Profile</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Your basic account information.</p>

            <div className="mt-5 space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Email</p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{session.user.email}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Name</p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{session.user.name ?? "—"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Security</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Password updates will be added next.</p>

            <div className="mt-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Current password</label>
                <input
                  type="password"
                  disabled
                  placeholder="********"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">New password</label>
                <input
                  type="password"
                  disabled
                  placeholder="********"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                />
              </div>

              <button
                type="button"
                disabled
                className="mt-2 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm opacity-60"
              >
                Update password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
