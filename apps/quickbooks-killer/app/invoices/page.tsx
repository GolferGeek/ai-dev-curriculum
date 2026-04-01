import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getToken } from "@/lib/auth";
import { getAuthenticatedDb } from "@/lib/surreal";

export default async function InvoicesPage() {
  const token = await getToken();
  if (!token) redirect("/signin");

  let invoices: any[] = [];

  try {
    const db = await getAuthenticatedDb(token);
    try {
      const [rows] = await db.query<[any[]]>(
        `SELECT * FROM invoice ORDER BY created DESC;`
      );
      invoices = rows ?? [];
    } finally {
      await db.close();
    }
  } catch {
    // DB unavailable
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
          <Link
            href="/invoices/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            + New Invoice
          </Link>
        </div>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-lg">No invoices yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first invoice to get started.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Client
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Total
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Due Date
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv: any) => {
                  const id =
                    typeof inv.id === "object" ? inv.id.toString() : inv.id;
                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {inv.client}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        ${Number(inv.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(inv.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            inv.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/invoices/${encodeURIComponent(id)}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
