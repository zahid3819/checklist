import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-violet-50 to-white px-6 py-5 dark:border-slate-800/60 dark:from-violet-950/30 dark:to-slate-950">
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Customize your experience.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-6 py-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Preferences</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">These will become functional as we add more features.</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Email notifications</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Receive updates about your activity.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">Soon</span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Theme</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Light/dark theme toggle.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">Soon</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Session</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Signed in as:</p>

            <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 px-4 py-4 dark:border-violet-900/40 dark:bg-violet-950/30">
              <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">{session.user.email}</p>
              <p className="mt-1 text-xs text-violet-800/80 dark:text-violet-200/80">Keep your account secure and sign out on shared devices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
