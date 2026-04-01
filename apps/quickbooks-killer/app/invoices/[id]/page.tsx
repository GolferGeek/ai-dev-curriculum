import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getToken } from "@/lib/auth";
import { getAuthenticatedDb } from "@/lib/surreal";
import { markInvoicePaidAction } from "@/lib/actions";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const token = await getToken();
  if (!token) redirect("/signin");

  let invoice: any = null;
  let lineItems: any[] = [];

  try {
    const db = await getAuthenticatedDb(token);
    try {
      const [invRows] = await db.query<[any[]]>(
        `SELECT * FROM type::thing($id);`,
        { id: decodedId }
      );
      invoice = invRows[0] ?? null;

      if (invoice) {
        const [liRows] = await db.query<[any[]]>(
          `SELECT * FROM line_item WHERE invoice = type::thing($id);`,
          { id: decodedId }
        );
        lineItems = liRows ?? [];
      }
    } finally {
      await db.close();
    }
  } catch {
    // DB unavailable
  }

  if (!invoice) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <p className="text-gray-500">Invoice not found.</p>
          <Link href="/invoices" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Invoices
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Link
          href="/invoices"
          className="text-blue-600 hover:underline text-sm mb-6 inline-block"
        >
          &larr; Back to Invoices
        </Link>

        <div className="max-w-2xl bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Invoice for {invoice.client}
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                invoice.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {invoice.status}
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            Due: {new Date(invoice.due_date).toLocaleDateString()}
            {invoice.paid_at && (
              <span className="ml-4">
                Paid: {new Date(invoice.paid_at).toLocaleDateString()}
              </span>
            )}
          </div>

          <table className="w-full mb-6">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Description
                </th>
                <th className="text-right py-2 text-sm font-medium text-gray-500">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lineItems.map((li: any, i: number) => (
                <tr key={i}>
                  <td className="py-3 text-gray-900">{li.description}</td>
                  <td className="py-3 text-right text-gray-700">
                    ${Number(li.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 font-bold text-gray-900">Total</td>
                <td className="py-3 text-right font-bold text-gray-900">
                  ${Number(invoice.total).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          {invoice.status !== "paid" && (
            <form action={markInvoicePaidAction}>
              <input type="hidden" name="id" value={decodedId} />
              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-green-700 transition-colors"
              >
                Mark as Paid
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
