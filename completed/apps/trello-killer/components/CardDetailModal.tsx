"use client";

import { updateCardAction, deleteCardAction } from "@/lib/actions";

interface CardDetailModalProps {
  card: {
    id: string;
    title: string;
    description?: string | null;
    list: string;
  };
  boardId: string;
  lists: { id: string; name: string }[];
  onClose: () => void;
}

export default function CardDetailModal({
  card,
  boardId,
  lists,
  onClose,
}: CardDetailModalProps) {
  const currentListId = typeof card.list === "object" ? String(card.list) : card.list;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">Card Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Close"
            >
              x
            </button>
          </div>

          <form action={updateCardAction} className="space-y-4">
            <input type="hidden" name="cardId" value={String(card.id)} />
            <input type="hidden" name="boardId" value={boardId} />

            <div>
              <label
                htmlFor="card-title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="card-title"
                defaultValue={card.title}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="card-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="card-description"
                defaultValue={card.description ?? ""}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                placeholder="Add a more detailed description..."
              />
            </div>

            <div>
              <label
                htmlFor="card-list"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Move to List
              </label>
              <select
                name="listId"
                id="card-list"
                defaultValue={currentListId}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {lists.map((list) => (
                  <option key={String(list.id)} value={String(list.id)}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <form action={deleteCardAction}>
              <input type="hidden" name="cardId" value={String(card.id)} />
              <input type="hidden" name="boardId" value={boardId} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete this card
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
