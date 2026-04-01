"use client";

import { useState } from "react";
import { createBoardAction } from "@/lib/actions";

export default function NewBoardForm() {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="block bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-xl p-6 shadow-sm transition-colors min-h-[120px] w-full text-left"
      >
        <span className="text-lg font-medium">+ Create new board</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 min-h-[120px]">
      <form action={createBoardAction}>
        <input
          type="text"
          name="name"
          placeholder="Board name"
          required
          autoFocus
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 mb-3"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Create
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
