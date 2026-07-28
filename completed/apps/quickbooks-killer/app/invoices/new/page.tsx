import Sidebar from "@/components/Sidebar";
import InvoiceForm from "@/components/InvoiceForm";

export default function NewInvoicePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Create Invoice
        </h2>
        <div className="max-w-2xl bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <InvoiceForm />
        </div>
      </main>
    </div>
  );
}
