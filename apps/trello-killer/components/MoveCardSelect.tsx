"use client";

import { moveCardAction } from "@/lib/actions";

interface MoveCardSelectProps {
  cardId: string;
  boardId: string;
  currentListId: string;
  lists: { id: string; name: string }[];
}

export default function MoveCardSelect({
  cardId,
  boardId,
  currentListId,
  lists,
}: MoveCardSelectProps) {
  const otherLists = lists.filter((l) => l.id !== currentListId);
  if (otherLists.length === 0) return null;

  return (
    <form action={moveCardAction} className="mt-1">
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="boardId" value={boardId} />
      <div className="flex items-center gap-1">
        <select
          name="newListId"
          className="text-xs border border-gray-200 rounded px-1 py-0.5 text-gray-500 bg-white flex-1"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) {
              e.target.form?.requestSubmit();
            }
          }}
        >
          <option value="" disabled>
            Move to...
          </option>
          {otherLists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
