"use client";

import { motion } from "framer-motion";

import type { ChecklistItemDTO } from "@/lib/types";

export default function ChecklistItem({
  item,
  onToggle,
  onDelete,
}: {
  item: ChecklistItemDTO;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={
        "group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-50/50 " +
        (item.completed ? "opacity-80" : "")
      }
    >
      <label className="flex flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={(e) => onToggle(item.id, e.target.checked)}
          className="h-4 w-4 accent-violet-600"
        />
        <span className={item.completed ? "text-slate-500 line-through" : "text-slate-900"}>{item.content}</span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-slate-600 opacity-0 transition hover:border-slate-200 hover:bg-white hover:text-slate-900 group-hover:opacity-100"
      >
        Delete
      </button>
    </motion.li>
  );
}
