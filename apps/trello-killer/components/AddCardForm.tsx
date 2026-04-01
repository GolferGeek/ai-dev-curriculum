"use client";

import { useState } from "react";
import { createCardAction } from "@/lib/actions";

export default function AddCardForm({
  listId,
  boardId,
}: {
  listId: string;
  boardId: string;
}) {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        + Add a card
      </button>
    );
  }

  return (
    <div className="px-1 pb-2">
      <form action={createCardAction}>
        <input type="hidden" name="listId" value={listId} />
        <input type="hidden" name="boardId" value={boardId} />
        <textarea
          name="title"
          placeholder="Enter a title for this card..."
          required
          autoFocus
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 mb-2 resize-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add Card
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
