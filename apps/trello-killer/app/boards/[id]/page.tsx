import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AddListForm from "@/components/AddListForm";
import BoardView from "@/components/BoardView";
import { getToken } from "@/lib/auth";
import { getAuthenticatedDb } from "@/lib/surreal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const boardId = decodeURIComponent(rawId);
  const token = await getToken();
  if (!token) redirect("/signin");

  let board: any = null;
  let allBoards: any[] = [];
  let listsWithCards: any[] = [];

  try {
    const db = await getAuthenticatedDb(token);
    try {
      // Get the board
      const [boardRows] = await db.query<[any[]]>(
        `SELECT * FROM type::thing($id);`,
        { id: boardId }
      );
      board = boardRows[0] ?? null;

      if (!board) {
        redirect("/boards");
      }

      // Get all boards for sidebar
      const [boardsRows] = await db.query<[any[]]>(
        `SELECT * FROM board ORDER BY created DESC;`
      );
      allBoards = boardsRows;

      // Get lists for this board
      const [listRows] = await db.query<[any[]]>(
        `SELECT * FROM list WHERE board = type::thing($bid) ORDER BY position ASC;`,
        { bid: boardId }
      );

      // Get cards for each list
      listsWithCards = [];
      for (const list of listRows) {
        const [cardRows] = await db.query<[any[]]>(
          `SELECT * FROM card WHERE list = type::thing($lid) ORDER BY position ASC;`,
          { lid: String(list.id) }
        );
        listsWithCards.push({
          ...list,
          id: String(list.id),
          cards: cardRows.map((c: any) => ({
            ...c,
            id: String(c.id),
            list: String(c.list),
          })),
        });
      }
    } finally {
      await db.close();
    }
  } catch (e) {
    // If DB fails, show empty
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
