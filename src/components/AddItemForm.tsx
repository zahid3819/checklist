"use client";

import { useState } from "react";

import { PlusIcon } from "@/components/icons";

export default function AddItemForm({
  onAdd,
}: {
  onAdd: (content: string) => Promise<void> | void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    setLoading(true);
    await onAdd(trimmed);
    setContent("");
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add an item"
        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-violet-950"
      />
      <button
        disabled={loading}
        type="submit"
        className="h-11 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
      >
        <span className="inline-flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add
        </span>
      </button>
    </form>
  );
}
