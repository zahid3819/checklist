"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import AddItemForm from "@/components/AddItemForm";
import { ArrowLeftIcon, CheckIcon, PencilIcon, RefreshIcon, TrashIcon, XIcon } from "@/components/icons";
import type { ChecklistDTO, ChecklistItemDTO } from "@/lib/types";

async function parseError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error ?? "Request failed";
}

export default function ChecklistDetailClient({ initial }: { initial: ChecklistDTO }) {
  const router = useRouter();

  const [checklist, setChecklist] = useState<ChecklistDTO>(initial);
  const [error, setError] = useState<string | null>(null);
  const [deletingChecklist, setDeletingChecklist] = useState(false);

  const stats = useMemo(() => {
    const total = checklist.items.length;
    const done = checklist.items.filter((i) => i.completed).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, percent };
  }, [checklist.items]);

  async function refresh() {
    const res = await fetch(`/api/checklists/${checklist.id}`, { cache: "no-store" });
    if (!res.ok) {
      setError(await parseError(res));
      return;
    }
    const data = (await res.json()) as ChecklistDTO;
    setChecklist(data);
  }

  async function addItem(content: string) {
    setError(null);

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checklistId: checklist.id, content }),
    });

    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    const item = (await res.json()) as ChecklistItemDTO;
    setChecklist((prev) => ({ ...prev, items: [item, ...prev.items] }));
  }

  async function toggleItem(itemId: string, completed: boolean) {
    setError(null);

    const res = await fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    setChecklist((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === itemId ? { ...i, completed } : i)),
    }));
  }

  async function updateItem(itemId: string, content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;

    setError(null);

    const res = await fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: trimmed }),
    });

    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    setChecklist((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === itemId ? { ...i, content: trimmed } : i)),
    }));
  }

  async function deleteItem(itemId: string) {
    setError(null);

    const res = await fetch(`/api/items/${itemId}`, { method: "DELETE" });
    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    setChecklist((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== itemId),
    }));
  }

  async function deleteChecklist() {
    setDeletingChecklist(true);
    setError(null);

    const res = await fetch(`/api/checklists/${checklist.id}`, { method: "DELETE" });

    setDeletingChecklist(false);

    if (!res.ok) {
      setError(await parseError(res));
      return;
    }

    router.push("/checklists");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-violet-50 to-white px-6 py-5 dark:border-slate-800/60 dark:from-violet-950/30 dark:to-slate-950">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{checklist.title}</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {stats.total === 0 ? "No items yet" : `${stats.done}/${stats.total} completed`} • Created{" "}
                {new Date(checklist.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              type="button"
              onClick={deleteChecklist}
              disabled={deletingChecklist}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span className="inline-flex items-center gap-2">
                <TrashIcon className="h-4 w-4" />
                {deletingChecklist ? "Deleting..." : "Delete checklist"}
              </span>
            </button>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${stats.percent}%` }} />
          </div>
        </div>

        <div className="px-6 py-5">
          <AddItemForm onAdd={addItem} />

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          ) : null}

          {checklist.items.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 dark:border-slate-700 dark:bg-slate-900/40">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">No items yet</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Add your first item above.</p>
            </div>
          ) : (
            <motion.ul layout className="mt-4 space-y-2">
              <AnimatePresence initial={false}>
                {checklist.items.map((item) => (
                  <EditableItemRow
                    key={item.id}
                    item={item}
                    onToggle={toggleItem}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                router.push("/checklists");
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowLeftIcon className="h-4 w-4" />
                Back to list
              </span>
            </button>

            <button
              type="button"
              onClick={refresh}
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <span className="inline-flex items-center gap-2">
                <RefreshIcon className="h-4 w-4" />
                Refresh
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditableItemRow({
  item,
  onToggle,
  onUpdate,
  onDelete,
}: {
  item: ChecklistItemDTO;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.content);
  const [saving, setSaving] = useState(false);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={
        "group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900/40 " +
        (item.completed ? "opacity-80" : "")
      }
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={(e) => onToggle(item.id, e.target.checked)}
          className="h-4 w-4 accent-violet-600"
        />

        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-violet-950"
          />
        ) : (
          <span
            className={
              "truncate text-sm " +
              (item.completed ? "text-slate-500 line-through dark:text-slate-400" : "text-slate-900 dark:text-slate-100")
            }
          >
            {item.content}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                await onUpdate(item.id, value);
                setSaving(false);
                setEditing(false);
              }}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
            >
              <span className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setValue(item.content);
                setEditing(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span className="inline-flex items-center gap-2">
                <XIcon className="h-4 w-4" />
                Cancel
              </span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-slate-600 opacity-0 transition hover:border-slate-200 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-800 dark:hover:bg-slate-950 dark:hover:text-slate-100 group-hover:opacity-100"
            >
              <span className="inline-flex items-center gap-2">
                <PencilIcon className="h-4 w-4" />
                Edit
              </span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-slate-600 opacity-0 transition hover:border-slate-200 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-800 dark:hover:bg-slate-950 dark:hover:text-slate-100 group-hover:opacity-100"
            >
              <span className="inline-flex items-center gap-2">
                <TrashIcon className="h-4 w-4" />
                Delete
              </span>
            </button>
          </>
        )}
      </div>
    </motion.li>
  );
}
