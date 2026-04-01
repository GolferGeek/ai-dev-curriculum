import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { getToken } from "@/lib/auth";
import { getAuthenticatedDb } from "@/lib/surreal";

interface Expense {
  description: string;
  category: string;
  date: string;
  amount: number;
}

interface AggregateRow {
  cnt?: number;
  total?: number;
}

function formatCurrency(n: number): string {
  return "$" + Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default async function DashboardPage() {
  const token = await getToken();
  if (!token) redirect("/signin");

  let data = {
    outstandingCount: 0,
    outstandingTotal: 0,
    totalIncome: 0,
    totalExpenses: 0,
    netProfitLoss: 0,
    recentExpenses: [] as Expense[],
  };

  try {
    const db = await getAuthenticatedDb(token);
    try {
      const [outstanding] = await db.query<[AggregateRow[]]>(
        `SELECT count() AS cnt, math::sum(total) AS total FROM invoice WHERE status = 'unpaid' GROUP ALL;`
      );
      const [income] = await db.query<[AggregateRow[]]>(
        `SELECT math::sum(total) AS total FROM invoice WHERE status = 'paid' GROUP ALL;`
      );
      const [expenses] = await db.query<[AggregateRow[]]>(
        `SELECT math::sum(amount) AS total FROM expense GROUP ALL;`
      );
      const [recent] = await db.query<[Expense[]]>(
        `SELECT * FROM expense ORDER BY date DESC LIMIT 5;`
      );

      data = {
        outstandingCount: outstanding[0]?.cnt ?? 0,
        outstandingTotal: outstanding[0]?.total ?? 0,
        totalIncome: income[0]?.total ?? 0,
        totalExpenses: expenses[0]?.total ?? 0,
        netProfitLoss: (income[0]?.total ?? 0) - (expenses[0]?.total ?? 0),
        recentExpenses: recent ?? [],
      };
    } finally {
      await db.close();
    }
  } catch {
    // If DB is unavailable, show zeroes
  }

  const profitVariant: "success" | "danger" =
    data.netProfitLoss >= 0 ? "success" : "danger";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Outstanding Invoices"
            value={String(data.outstandingCount)}
            subtitle={formatCurrency(data.outstandingTotal) + " total"}
            variant="warning"
          />
          <DashboardCard
            title="Total Income"
            value={formatCurrency(data.totalIncome)}
            subtitle="From paid invoices"
            variant="success"
          />
          <DashboardCard
            title="Total Expenses"
            value={formatCurrency(data.totalExpenses)}
            subtitle="All categories"
            variant="danger"
          />
          <DashboardCard
            title="Net Profit / Loss"
            value={
              (data.netProfitLoss >= 0 ? "+" : "-") +
              formatCurrency(data.netProfitLoss)
            }
            variant={profitVariant}
          />
        </div>

        {/* Visual: Profit/Loss bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Income vs Expenses
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Income</span>
                <span className="font-medium text-green-700">
                  {formatCurrency(data.totalIncome)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{
                    width:
                      data.totalIncome + data.totalExpenses > 0
                        ? `${(data.totalIncome / (data.totalIncome + data.totalExpenses)) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Expenses</span>
                <span className="font-medium text-red-700">
                  {formatCurrency(data.totalExpenses)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-red-500 h-4 rounded-full transition-all"
                  style={{
                    width:
                      data.totalIncome + data.totalExpenses > 0
                        ? `${(data.totalExpenses / (data.totalIncome + data.totalExpenses)) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Recent Expenses
          </h3>
          {data.recentExpenses.length === 0 ? (
            <p className="text-gray-400 text-sm">No expenses logged yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {data.recentExpenses.map((exp: Expense, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {exp.description}
                    </p>
                    <p className="text-sm text-gray-500">{exp.category}</p>
                  </div>
                  <span className="font-semibold text-red-600">
                    -${Number(exp.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
