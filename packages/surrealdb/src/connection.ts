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
 * In production, SURREAL_ROOT_USER and SURREAL_ROOT_PASS must be set explicitly.
 */
export async function getRootConnection(): Promise<Surreal> {
  const isProduction = process.env.NODE_ENV === "production";
  const rootUser = process.env.SURREAL_ROOT_USER;
  const rootPass = process.env.SURREAL_ROOT_PASS;

  if (isProduction && (!rootUser || !rootPass)) {
    throw new Error(
      "SURREAL_ROOT_USER and SURREAL_ROOT_PASS must be set in production. " +
        "Refusing to use default credentials.",
    );
  }

  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.signin({
    username: rootUser ?? "root",
    password: rootPass ?? "root",
  });
  await db.use({ namespace: SURREAL_NS, database: SURREAL_DB });
  return db;
}

export { SURREAL_URL, SURREAL_NS, SURREAL_DB };
