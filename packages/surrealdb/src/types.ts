// ─── QuickBooks domain types ─────────────────────────────────

export interface Invoice {
  id: string;
  owner?: string;
  client: string;
  due_date: string;
  total: number;
  status: "unpaid" | "paid";
  paid_at?: string;
  created?: string;
}

export interface LineItem {
  id: string;
  invoice: string;
  description: string;
  amount: number;
}

export interface Expense {
  id: string;
  owner?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
}

/** Aggregation row returned by GROUP ALL queries */
export interface AggregateRow {
  cnt?: number;
  total?: number;
}

// ─── Trello domain types ────────────────────────────────────

export interface Board {
  id: string;
  owner?: string;
  name: string;
  created?: string;
}

export interface TrelloList {
  id: string;
  board: string;
  name: string;
  position: number;
}

export interface Card {
  id: string;
  list: string;
  title: string;
  description?: string | null;
  position: number;
}
