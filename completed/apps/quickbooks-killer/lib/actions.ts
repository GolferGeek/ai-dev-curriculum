"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  signup,
  signin,
  authenticateWithToken,
  getConnection,
  createInvoice,
  markInvoicePaid,
  createExpense,
} from "@curriculum/surrealdb";
import { getToken, setToken, clearToken } from "./auth";

// ─── Auth actions ─────────────────────────────────────────────

export async function signupAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    redirect("/signup?error=Missing+required+fields");
  }

  try {
    const token = await signup({
      email: email.toString(),
      password: password.toString(),
      name: name.toString(),
    });
    await setToken(token);
  } catch {
    redirect("/signup?error=Signup+failed.+Email+may+already+be+in+use.");
  }
  redirect("/dashboard");
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect("/signin?error=Missing+required+fields");
  }

  try {
    const token = await signin({
      email: email.toString(),
      password: password.toString(),
    });
    await setToken(token);
  } catch {
    redirect("/signin?error=Invalid+email+or+password");
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

  const client = formData.get("client")?.toString() ?? "";
  const due_date = formData.get("due_date")?.toString() ?? "";
  const descriptionsRaw = formData.getAll("li_description").map(String);
  const amountsRaw = formData.getAll("li_amount").map(String);

  const line_items = descriptionsRaw.map((desc, i) => ({
    description: desc,
    amount: parseFloat(amountsRaw[i]) || 0,
  }));

  const db = await getConnection();
  try {
    await authenticateWithToken(db, token!);
    await createInvoice(db, {
      client,
      due_date: due_date + "T00:00:00Z",
      line_items,
    });
  } finally {
    await db.close();
  }
  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function markInvoicePaidAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const id = formData.get("id")?.toString() ?? "";
  const db = await getConnection();
  try {
    await authenticateWithToken(db, token!);
    await markInvoicePaid(db, id);
  } finally {
    await db.close();
  }
  revalidatePath(`/invoices/${encodeURIComponent(id)}`);
  redirect(`/invoices/${encodeURIComponent(id)}`);
}

// ─── Expense actions ──────────────────────────────────────────

export async function createExpenseAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const description = formData.get("description")?.toString() ?? "";
  const amount = parseFloat(formData.get("amount")?.toString() ?? "0") || 0;
  const category = formData.get("category")?.toString() ?? "";
  const date = formData.get("date")?.toString() ?? "";

  const db = await getConnection();
  try {
    await authenticateWithToken(db, token!);
    await createExpense(db, {
      description,
      amount,
      category,
      date: date + "T00:00:00Z",
    });
  } finally {
    await db.close();
  }
  revalidatePath("/expenses");
  redirect("/expenses");
}
