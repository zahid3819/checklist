import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { ArrowRightIcon, ChecklistNavIcon, DashboardNavIcon, PlusIcon } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAuthed = Boolean(session?.user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-violet-950/20 dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <Image src="/logo.png" alt="Checklist" width={40} height={40} className="h-10 w-10 object-contain" priority />
            </span>
            <div>
              <p className="text-sm font-semibold leading-5 text-slate-900 dark:text-slate-100">Checklist</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fast, focused, and personal</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthed ? (
              <>
                <Link
                  href="/checklists"
                  className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:inline-flex"
                >
                  <span className="inline-flex items-center gap-2">
                    <ChecklistNavIcon />
                    My Checklists
                  </span>
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                >
                  <span className="inline-flex items-center gap-2">
                    <DashboardNavIcon />
                    Go to dashboard
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                >
                  <span className="inline-flex items-center gap-2">
                    Get started
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-900">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              Save checklists to the cloud (Neon)
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Turn tasks into momentum.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Create checklists, add items, and track progress with a clean dashboard. Everything is saved per user,
              so your lists stay private and available anywhere.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {isAuthed ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                  >
                    <DashboardNavIcon />
                    Open dashboard
                  </Link>
                  <Link
                    href="/checklists"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    <ChecklistNavIcon />
                    Browse checklists
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Create an account
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Log in
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">User-scoped data</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Each account sees only its own checklists.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Item progress</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Check items off and watch the progress bar fill.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Fast CRUD</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Create, update, and delete checklists & items.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Modern UI</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Violet/emerald theme, animations, and clean layout.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="border-b border-slate-200/60 bg-gradient-to-r from-violet-50 to-white px-6 py-5 dark:border-slate-800/60 dark:from-violet-950/30 dark:to-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Preview</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">What a checklist looks like inside the app.</p>
              </div>

              <div className="px-6 py-6">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-slate-50 to-white px-6 py-5 dark:from-slate-900/40 dark:to-slate-950">
                    <div>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Launch checklist</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">3 items • 1 completed</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      33%
                    </span>
                  </div>

                  <div className="px-6 py-5">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
                      <div className="h-full w-1/3 rounded-full bg-emerald-500" />
                    </div>

                    <ul className="mt-5 space-y-2">
                      <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <span className="inline-flex items-center gap-3">
                          <span className="h-4 w-4 rounded border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950" />
                          Create database & env vars
                        </span>
                      </li>
                      <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <span className="inline-flex items-center gap-3">
                          <span className="h-4 w-4 rounded bg-emerald-500" />
                          <span className="text-slate-500 line-through dark:text-slate-400">Build dashboard shell</span>
                        </span>
                      </li>
                      <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <span className="inline-flex items-center gap-3">
                          <span className="h-4 w-4 rounded border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950" />
                          Add items + progress
                        </span>
                      </li>
                    </ul>

                    <div className="mt-6 rounded-xl border border-violet-100 bg-violet-50 px-4 py-4 dark:border-violet-900/40 dark:bg-violet-950/30">
                      <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">Tip</p>
                      <p className="mt-1 text-sm text-violet-800/80 dark:text-violet-200/80">
                        Keep lists short and focused. Create separate checklists for routines, projects, and errands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t border-slate-200/60 pt-8 dark:border-slate-800/60">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">© {new Date().getFullYear()} Checklist</p>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/login" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                Log in
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/signup" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                Sign up
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
