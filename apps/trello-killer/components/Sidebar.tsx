"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signoutAction } from "@/lib/actions";

interface Board {
  id: string;
  name: string;
}

export default function Sidebar({ boards }: { boards: Board[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">Trello Killer</h1>
        <p className="text-slate-400 text-sm mt-1">Kanban Board Manager</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          href="/boards"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            pathname === "/boards"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          All Boards
        </Link>

        {boards.length > 0 && (
          <div className="mt-4">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Your Boards
            </p>
            {boards.map((board) => {
              const boardPath = `/boards/${encodeURIComponent(String(board.id))}`;
              const active = pathname === boardPath;
              return (
                <Link
                  key={String(board.id)}
                  href={boardPath}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span className="w-3 h-3 rounded-sm bg-blue-400 shrink-0" />
                  <span className="truncate">{board.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <form action={signoutAction}>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-left"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
