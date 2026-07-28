import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AddListForm from "@/components/AddListForm";
import BoardView from "@/components/BoardView";
import { getToken } from "@/lib/auth";
import {
  getTrelloAuthenticatedDb,
  listBoards,
  getBoard,
  getListsForBoard,
  getCardsForList,
} from "@curriculum/surrealdb";
import type { Card } from "@curriculum/surrealdb";

interface ListWithCards {
  id: string;
  name: string;
  position: number;
  cards: Card[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const boardId = decodeURIComponent(rawId);
  const token = await getToken();
  if (!token) redirect("/signin");

  let board: { id: string; name: string; created?: string } | null = null;
  let allBoards: { id: string; name: string; created?: string }[] = [];
  let listsWithCards: ListWithCards[] = [];

  try {
    const db = await getTrelloAuthenticatedDb(token);
    try {
      // Get the board
      board = await getBoard(db, boardId);

      if (!board) {
        redirect("/boards");
      }

      // Get all boards for sidebar
      allBoards = await listBoards(db);

      // Get lists for this board
      const lists = await getListsForBoard(db, boardId);

      // Get cards for each list
      listsWithCards = [];
      for (const list of lists) {
        const cardRows = await getCardsForList(db, String(list.id));
        listsWithCards.push({
          ...list,
          id: String(list.id),
          cards: cardRows.map((c) => ({
            ...c,
            id: String(c.id),
            list: String(c.list),
          })),
        });
      }
    } finally {
      await db.close();
    }
  } catch (e: unknown) {
    console.error("Board detail DB error:", e instanceof Error ? e.message : e);
  }

  if (!board) {
    redirect("/boards");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar boards={allBoards} />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
        </div>

        <div className="flex-1 overflow-x-auto p-6 pt-2">
          <div className="flex gap-4 items-start">
            <BoardView
              boardId={boardId}
              lists={listsWithCards}
            />
            <AddListForm boardId={boardId} />
          </div>
        </div>
      </main>
    </div>
  );
}
