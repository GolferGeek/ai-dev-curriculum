import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import BoardCard from "@/components/BoardCard";
import NewBoardForm from "@/components/NewBoardForm";
import { getToken } from "@/lib/auth";
import { getAuthenticatedDb } from "@/lib/surreal";

export default async function BoardsPage() {
  const token = await getToken();
  if (!token) redirect("/signin");

  let boards: any[] = [];

  try {
    const db = await getAuthenticatedDb(token);
    try {
      const [rows] = await db.query<[any[]]>(
        `SELECT * FROM board ORDER BY created DESC;`
      );
      boards = rows;
    } finally {
      await db.close();
    }
  } catch {
    // If DB is unavailable, show empty
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar boards={boards} />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Boards</h2>

        {boards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              You don&apos;t have any boards yet. Create one to get started!
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boards.map((board) => (
            <BoardCard
              key={String(board.id)}
              id={String(board.id)}
              name={board.name}
            />
          ))}
          <NewBoardForm />
        </div>
      </main>
    </div>
  );
}
