"use client";

import { useState } from "react";

interface CardData {
  id: string;
  title: string;
  description?: string | null;
  list: string;
  position: number;
}

interface CardItemProps {
  card: CardData;
  boardId: string;
  onOpenDetail: (card: CardData) => void;
}

export default function CardItem({ card, boardId, onOpenDetail }: CardItemProps) {
  return (
    <button
      onClick={() => onOpenDetail(card)}
      className="w-full text-left bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
    >
      <p className="text-sm font-medium text-gray-900">{card.title}</p>
      {card.description && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {card.description}
        </p>
      )}
    </button>
  );
}
