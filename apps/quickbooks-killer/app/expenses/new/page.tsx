import Sidebar from "@/components/Sidebar";
import ExpenseForm from "@/components/ExpenseForm";

export default function NewExpensePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Add Expense</h2>
        <div className="max-w-lg bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <ExpenseForm />
        </div>
      </main>
    </div>
  );
}
