"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { ArrowRightIcon, PlusIcon, TrashIcon } from "@/components/icons";
import type { ChecklistDTO } from "@/lib/types";

async function parseError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error ?? "Request failed";
}

function progress(items: ChecklistDTO["items"]) {
  const total = items.length;
  const done = items.filter((i) => i.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, percent };
}

export default function ChecklistsClient({ initial }: { initial: ChecklistDTO[] }) {
  const [checklists, setChecklists] = useState<ChecklistDTO[]>(initial);
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/checklists", { cache: "no-store" });
    if (!res.ok) {
      setError(await parseError(res));
      return;
    }
    const data = (await res.json()) as ChecklistDTO[];
    setChecklists(data);
  }

  async function createChecklist() {
    const trimmed = title.trim();
    if (!trimmed) return;

    setCreating(true);
    setError(null);

    const res = await fetch("/api/checklists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });

    setCreating(false);

    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    setTitle("");
    await refresh();
  }

  async function deleteChecklist(checklistId: string) {
    setError(null);

    const res = await fetch(`/api/checklists/${checklistId}`, { method: "DELETE" });
    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    await refresh();
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-violet-50 to-white px-6 py-5 dark:border-slate-800/60 dark:from-violet-950/30 dark:to-slate-950">
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">My Checklists</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Open any checklist to manage its items.</p>
        </div>

        <div className="px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">New checklist</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grocery list"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-violet-950"
              />
            </div>
            <div className="flex items-end">
              <button
                disabled={creating}
                type="button"
                onClick={createChecklist}
                className="h-11 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
              >
                <span className="inline-flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  {creating ? "Creating..." : "Create"}
                </span>
              </button>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          ) : null}
        </div>
      </div>

      {checklists.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">No checklists yet</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Create your first checklist to start tracking items.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatePresence initial={false}>
            {checklists.map((c) => {
              const p = progress(c.items);
              return (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-slate-50 to-white px-6 py-5 dark:from-slate-900/40 dark:to-slate-950">
                    <div className="min-w-0">
                      <Link href={`/checklists/${c.id}`} className="block">
                        <p className="truncate text-base font-semibold text-slate-900 group-hover:text-violet-700 dark:text-slate-100 dark:group-hover:text-violet-300">
                          {c.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {p.total === 0 ? "No items" : `${p.done}/${p.total} completed`} • Created {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteChecklist(c.id)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                      <span className="inline-flex items-center gap-2">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </span>
                    </button>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-[width]"
                        style={{ width: `${p.percent}%` }}
                      />
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/checklists/${c.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                      >
                        Open
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
