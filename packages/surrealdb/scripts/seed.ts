import { Surreal } from "surrealdb";
import type { User, Invoice, Expense } from "../src/types.js";

const SURREAL_URL = process.env.SURREAL_URL ?? "http://127.0.0.1:8000";

async function main() {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.signin({
    username: process.env.SURREAL_ROOT_USER ?? "root",
    password: process.env.SURREAL_ROOT_PASS ?? "root",
  });
  await db.use({ namespace: "quickbooks", database: "main" });

  // Create a demo user via direct insert (bypassing access layer for seeding)
  const email = "demo@example.com";
  const password = "password123";

  // Check if demo user exists
  const [existing] = await db.query<[User[]]>(
    `SELECT * FROM user WHERE email = $email;`,
    { email }
  );

  if (existing.length === 0) {
    await db.query(
      `CREATE user SET email = $email, password = crypto::argon2::generate($pw), name = $name;`,
      { email, pw: password, name: "Demo User" }
    );
    console.log("Created demo user: demo@example.com / password123");
  } else {
    console.log("Demo user already exists.");
  }

  // Get the demo user ID
  const [users] = await db.query<[User[]]>(
    `SELECT * FROM user WHERE email = $email;`,
    { email }
  );
  const userId = users[0].id;

  // Seed invoices
  const [existingInvoices] = await db.query<[Invoice[]]>(
    `SELECT * FROM invoice WHERE owner = $uid;`,
    { uid: userId }
  );

  if (existingInvoices.length === 0) {
    // Invoice 1 — unpaid
    const [inv1] = await db.query<[Invoice[]]>(
      `CREATE invoice SET owner = $uid, client = 'Acme Corp', due_date = <datetime>'2026-04-15T00:00:00Z', total = 2500, status = 'unpaid';`,
      { uid: userId }
    );
    await db.query(
      `CREATE line_item SET invoice = $inv, description = 'Web Design', amount = 1500;`,
      { inv: inv1[0].id }
    );
    await db.query(
      `CREATE line_item SET invoice = $inv, description = 'SEO Audit', amount = 1000;`,
      { inv: inv1[0].id }
    );

    // Invoice 2 — paid
    const [inv2] = await db.query<[Invoice[]]>(
      `CREATE invoice SET owner = $uid, client = 'StartupXYZ', due_date = <datetime>'2026-03-01T00:00:00Z', total = 4000, status = 'paid', paid_at = <datetime>'2026-03-05T00:00:00Z';`,
      { uid: userId }
    );
    await db.query(
      `CREATE line_item SET invoice = $inv, description = 'Full-stack MVP', amount = 4000;`,
      { inv: inv2[0].id }
    );

    // Invoice 3 — unpaid
    const [inv3] = await db.query<[Invoice[]]>(
      `CREATE invoice SET owner = $uid, client = 'Local Coffee Co', due_date = <datetime>'2026-04-30T00:00:00Z', total = 750, status = 'unpaid';`,
      { uid: userId }
    );
    await db.query(
      `CREATE line_item SET invoice = $inv, description = 'Logo Redesign', amount = 750;`,
      { inv: inv3[0].id }
    );

    console.log("Seeded 3 invoices with line items.");
  } else {
    console.log("Invoices already seeded.");
  }

  // Seed expenses
  const [existingExpenses] = await db.query<[Expense[]]>(
    `SELECT * FROM expense WHERE owner = $uid;`,
    { uid: userId }
  );

  if (existingExpenses.length === 0) {
    const expenses = [
      { desc: "Adobe Creative Suite", amount: 55, cat: "Software", date: "2026-03-01T00:00:00Z" },
      { desc: "Coworking Day Pass", amount: 25, cat: "Office", date: "2026-03-05T00:00:00Z" },
      { desc: "Client Lunch", amount: 42, cat: "Marketing", date: "2026-03-10T00:00:00Z" },
      { desc: "Train to Client Office", amount: 35, cat: "Travel", date: "2026-03-12T00:00:00Z" },
      { desc: "Domain Renewal", amount: 15, cat: "Software", date: "2026-03-15T00:00:00Z" },
    ];
    for (const e of expenses) {
      await db.query(
        `CREATE expense SET owner = $uid, description = $desc, amount = $amount, category = $cat, date = <datetime>$date;`,
        { uid: userId, desc: e.desc, amount: e.amount, cat: e.cat, date: e.date }
      );
    }
    console.log("Seeded 5 expenses.");
  } else {
    console.log("Expenses already seeded.");
  }

  await db.close();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
