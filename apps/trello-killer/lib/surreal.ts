import { Surreal } from "surrealdb";

const SURREAL_URL = process.env.SURREAL_URL ?? "http://127.0.0.1:8000";
const SURREAL_NS = process.env.SURREAL_NS ?? "trello";
const SURREAL_DB = process.env.SURREAL_DB ?? "main";

/**
 * Get a SurrealDB connection authenticated with the user's JWT token.
 */
export async function getAuthenticatedDb(token: string): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.use({ namespace: SURREAL_NS, database: SURREAL_DB });
  await db.authenticate(token);
  return db;
}

/**
 * Get an unauthenticated connection (for signup/signin).
 */
export async function getDb(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.use({ namespace: SURREAL_NS, database: SURREAL_DB });
  return db;
}

export { SURREAL_URL, SURREAL_NS, SURREAL_DB };
