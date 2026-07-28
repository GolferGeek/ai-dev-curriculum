"use client";

import { useState } from "react";
import { createListAction } from "@/lib/actions";

export default function AddListForm({ boardId }: { boardId: string }) {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="shrink-0 w-72 bg-white/50 hover:bg-white/80 text-gray-600 rounded-xl p-4 transition-colors text-left border-2 border-dashed border-gray-300"
      >
        <span className="text-sm font-medium">+ Add another list</span>
      </button>
    );
  }

  return (
    <div className="shrink-0 w-72 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <form action={createListAction}>
        <input type="hidden" name="boardId" value={boardId} />
        <input
          type="text"
          name="name"
          placeholder="Enter list title..."
          required
          autoFocus
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add List
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
