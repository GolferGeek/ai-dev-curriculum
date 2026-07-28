import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getToken } from "@/lib/auth";
import { getConnection, authenticateWithToken, listExpenses } from "@curriculum/surrealdb";
import type { Expense } from "@curriculum/surrealdb";

export default async function ExpensesPage() {
  const token = await getToken();
  if (!token) redirect("/signin");

  let expenses: Expense[] = [];

  try {
    const db = await getConnection();
    try {
      await authenticateWithToken(db, token);
      expenses = await listExpenses(db);
    } finally {
      await db.close();
    }
  } catch (e: unknown) {
    console.error("Expenses DB error:", e instanceof Error ? e.message : e);
  }

  // Calculate running total (cumulative from oldest to newest, displayed newest first)
  const reversed = [...expenses].reverse();
  const runningTotals: number[] = [];
  let cumulative = 0;
  for (const exp of reversed) {
    cumulative += Number(exp.amount);
    runningTotals.push(cumulative);
  }
  runningTotals.reverse();

  const grandTotal = cumulative;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
            {grandTotal > 0 && (
              <p className="text-gray-500 text-sm mt-1">
                Total: ${grandTotal.toFixed(2)}
              </p>
            )}
          </div>
          <Link
            href="/expenses/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            + New Expense
          </Link>
        </div>

        {expenses.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-lg">No expenses yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Log your first expense to start tracking.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Description
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Category
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Running Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.map((exp: Expense, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {exp.description}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {exp.category}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(exp.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium">
                      ${Number(exp.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700 font-medium">
                      ${runningTotals[i].toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
