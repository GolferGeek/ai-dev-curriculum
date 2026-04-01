import { Surreal } from "surrealdb";

const SURREAL_URL = process.env.SURREAL_URL ?? "http://127.0.0.1:8000";
const SURREAL_NS = process.env.SURREAL_NS ?? "quickbooks";
const SURREAL_DB = process.env.SURREAL_DB ?? "main";

/**
 * Get a fresh SurrealDB connection.
 * Caller is responsible for closing it when done.
 */
export async function getConnection(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.use({ namespace: SURREAL_NS, database: SURREAL_DB });
  return db;
}

/**
 * Get a root-authenticated connection (for schema ops, seeding, etc.).
 */
export async function getRootConnection(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.signin({
    username: process.env.SURREAL_ROOT_USER ?? "root",
    password: process.env.SURREAL_ROOT_PASS ?? "root",
  });
  await db.use({ namespace: SURREAL_NS, database: SURREAL_DB });
  return db;
}

export { SURREAL_URL, SURREAL_NS, SURREAL_DB };
