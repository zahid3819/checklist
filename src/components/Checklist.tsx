"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { ChecklistDTO, ChecklistItemDTO } from "@/lib/types";
import AddItemForm from "@/components/AddItemForm";
import ChecklistItem from "@/components/ChecklistItem";

export default function Checklist({
  checklist,
  onDeleteChecklist,
  onAddItem,
  onToggleItem,
  onDeleteItem,
}: {
  checklist: ChecklistDTO;
  onDeleteChecklist: (checklistId: string) => void;
  onAddItem: (checklistId: string, content: string) => Promise<void> | void;
  onToggleItem: (itemId: string, completed: boolean) => Promise<void> | void;
  onDeleteItem: (itemId: string) => Promise<void> | void;
}) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{checklist.title}</h2>
          <p className="mt-1 text-xs text-slate-500">Created {new Date(checklist.createdAt).toLocaleString()}</p>
        </div>
        <button
          type="button"
          onClick={() => onDeleteChecklist(checklist.id)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Delete
        </button>
      </div>

      <div className="px-6 py-5">
        <AddItemForm onAdd={(content) => onAddItem(checklist.id, content)} />

        <motion.ul layout className="mt-4 space-y-2">
          <AnimatePresence initial={false}>
            {checklist.items.map((item: ChecklistItemDTO) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={onToggleItem}
                onDelete={onDeleteItem}
              />
            ))}
          </AnimatePresence>
        </motion.ul>

        {checklist.items.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
            <p className="text-sm font-medium text-slate-800">No items yet</p>
            <p className="mt-1 text-sm text-slate-600">Add your first item above.</p>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
