"use client";

import { useState } from "react";
import AddCardForm from "./AddCardForm";
import CardItem from "./CardItem";
import CardDetailModal from "./CardDetailModal";
import MoveCardSelect from "./MoveCardSelect";

interface Card {
  id: string;
  title: string;
  description?: string | null;
  list: string;
  position: number;
}

interface List {
  id: string;
  name: string;
  position: number;
  cards: Card[];
}

interface BoardViewProps {
  boardId: string;
  lists: List[];
}

export default function BoardView({ boardId, lists }: BoardViewProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <>
      {lists.map((list) => (
        <div
          key={String(list.id)}
          className="shrink-0 w-72 bg-gray-100 rounded-xl flex flex-col max-h-[calc(100vh-12rem)]"
        >
          <div className="p-3 pb-1">
            <h3 className="font-semibold text-gray-900 text-sm px-1">
              {list.name}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-2">
            {list.cards.map((card) => (
              <div key={String(card.id)}>
                <CardItem
                  card={card}
                  onOpenDetail={setSelectedCard}
                />
                <MoveCardSelect
                  cardId={String(card.id)}
                  boardId={boardId}
                  currentListId={String(list.id)}
                  lists={lists.map((l) => ({
                    id: String(l.id),
                    name: l.name,
                  }))}
                />
              </div>
            ))}
          </div>

          <div className="p-2">
            <AddCardForm listId={String(list.id)} boardId={boardId} />
          </div>
        </div>
      ))}

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          boardId={boardId}
          lists={lists.map((l) => ({ id: String(l.id), name: l.name }))}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}
