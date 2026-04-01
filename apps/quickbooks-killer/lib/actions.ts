"use server";

import { redirect } from "next/navigation";
import { getDb, getAuthenticatedDb } from "./surreal";
import { getToken, setToken, clearToken } from "./auth";

// ─── Auth actions ─────────────────────────────────────────────

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const db = await getDb();
  try {
    const token = await db.signup({
      namespace: "quickbooks",
      database: "main",
      access: "user_access",
      variables: { email, password, name },
    });
    await setToken(token as unknown as string);
  } finally {
    await db.close();
  }
  redirect("/dashboard");
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const db = await getDb();
  try {
    const token = await db.signin({
      namespace: "quickbooks",
      database: "main",
      access: "user_access",
      variables: { email, password },
    });
    await setToken(token as unknown as string);
  } finally {
    await db.close();
  }
  redirect("/dashboard");
}

export async function signoutAction() {
  await clearToken();
  redirect("/signin");
}

// ─── Invoice actions ──────────────────────────────────────────

export async function createInvoiceAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const client = formData.get("client") as string;
  const due_date = formData.get("due_date") as string;
  const descriptionsRaw = formData.getAll("li_description") as string[];
  const amountsRaw = formData.getAll("li_amount") as string[];

  const line_items = descriptionsRaw.map((desc, i) => ({
    description: desc,
    amount: parseFloat(amountsRaw[i]) || 0,
  }));

  const total = line_items.reduce((s, li) => s + li.amount, 0);

  const db = await getAuthenticatedDb(token);
  try {
    const [invoice] = await db.query<[any[]]>(
      `CREATE invoice SET client = $client, due_date = <datetime>$due_date, total = $total;`,
      { client, due_date: due_date + "T00:00:00Z", total }
    );

    const invoiceId = invoice[0].id;
    for (const li of line_items) {
      await db.query(
        `CREATE line_item SET invoice = $inv, description = $desc, amount = $amount;`,
        { inv: invoiceId, desc: li.description, amount: li.amount }
      );
    }
  } finally {
    await db.close();
  }
  redirect("/invoices");
}

export async function markInvoicePaidAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const id = formData.get("id") as string;
  const db = await getAuthenticatedDb(token);
  try {
    await db.query(
      `UPDATE type::thing($id) SET status = 'paid', paid_at = time::now();`,
      { id }
    );
  } finally {
    await db.close();
  }
  redirect(`/invoices/${encodeURIComponent(id)}`);
}

// ─── Expense actions ──────────────────────────────────────────

export async function createExpenseAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;

  const db = await getAuthenticatedDb(token);
  try {
    await db.query(
      `CREATE expense SET description = $desc, amount = $amount, category = $cat, date = <datetime>$date;`,
      { desc: description, amount, cat: category, date: date + "T00:00:00Z" }
    );
  } finally {
    await db.close();
  }
  redirect("/expenses");
}
