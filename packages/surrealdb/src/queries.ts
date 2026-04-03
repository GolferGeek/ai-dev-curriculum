import { Surreal } from "surrealdb";
import type { Invoice, LineItem, Expense, AggregateRow } from "./types";

// ─── Invoice queries ──────────────────────────────────────────

export interface CreateInvoiceInput {
  client: string;
  due_date: string; // ISO date
  line_items: { description: string; amount: number }[];
}

export async function createInvoice(
  db: Surreal,
  input: CreateInvoiceInput
): Promise<Invoice> {
  const total = input.line_items.reduce((s, li) => s + li.amount, 0);

  const [invoice] = await db.query<[Invoice[]]>(
    `CREATE invoice SET client = $client, due_date = <datetime>$due_date, total = $total;`,
    { client: input.client, due_date: input.due_date, total }
  );

  const invoiceId = invoice[0].id;

  for (const li of input.line_items) {
    await db.query(
      `CREATE line_item SET invoice = $invoice, description = $desc, amount = $amount;`,
      { invoice: invoiceId, desc: li.description, amount: li.amount }
    );
  }

  return invoice[0];
}

export async function listInvoices(db: Surreal): Promise<Invoice[]> {
  const [rows] = await db.query<[Invoice[]]>(
    `SELECT * FROM invoice ORDER BY created DESC;`
  );
  return rows;
}

export async function getInvoice(db: Surreal, id: string): Promise<Invoice | null> {
  const [rows] = await db.query<[Invoice[]]>(
    `SELECT * FROM type::record($id);`,
    { id }
  );
  return rows[0] ?? null;
}

export async function getLineItems(
  db: Surreal,
  invoiceId: string
): Promise<LineItem[]> {
  const [rows] = await db.query<[LineItem[]]>(
    `SELECT * FROM line_item WHERE invoice = type::record($id);`,
    { id: invoiceId }
  );
  return rows;
}

export async function markInvoicePaid(db: Surreal, id: string): Promise<void> {
  await db.query(
    `UPDATE type::record($id) SET status = 'paid', paid_at = time::now();`,
    { id }
  );
}

// ─── Expense queries ──────────────────────────────────────────

export interface CreateExpenseInput {
  description: string;
  amount: number;
  category: string;
  date: string; // ISO date
}

export async function createExpense(
  db: Surreal,
  input: CreateExpenseInput
): Promise<Expense> {
  const [rows] = await db.query<[Expense[]]>(
    `CREATE expense SET description = $desc, amount = $amount, category = $cat, date = <datetime>$date;`,
    {
      desc: input.description,
      amount: input.amount,
      cat: input.category,
      date: input.date,
    }
  );
  return rows[0];
}

export async function listExpenses(db: Surreal): Promise<Expense[]> {
  const [rows] = await db.query<[Expense[]]>(
    `SELECT * FROM expense ORDER BY date DESC;`
  );
  return rows;
}

// ─── Dashboard queries ────────────────────────────────────────

export interface DashboardData {
  outstandingCount: number;
  outstandingTotal: number;
  totalIncome: number;
  totalExpenses: number;
  netProfitLoss: number;
  recentExpenses: Expense[];
}

export async function getDashboardData(
  db: Surreal
): Promise<DashboardData> {
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

  const outstandingCount = outstanding[0]?.cnt ?? 0;
  const outstandingTotal = outstanding[0]?.total ?? 0;
  const totalIncome = income[0]?.total ?? 0;
  const totalExpenses = expenses[0]?.total ?? 0;

  return {
    outstandingCount,
    outstandingTotal,
    totalIncome,
    totalExpenses,
    netProfitLoss: totalIncome - totalExpenses,
    recentExpenses: recent ?? [],
  };
}
