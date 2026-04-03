import { Surreal } from "surrealdb";

const SURREAL_URL = process.env.SURREAL_URL ?? "http://127.0.0.1:8000";
const TRELLO_NS = "trello";
const TRELLO_DB = "main";

/**
 * Get a fresh SurrealDB connection for the Trello namespace.
 */
export async function getTrelloConnection(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.use({ namespace: TRELLO_NS, database: TRELLO_DB });
  return db;
}

/**
 * Sign up a new user in the Trello namespace. Returns a JWT token.
 */
export async function trelloSignup(params: {
  email: string;
  password: string;
  name: string;
}): Promise<string> {
  const db = await getTrelloConnection();
  try {
    const token = await db.signup({
      namespace: TRELLO_NS,
      database: TRELLO_DB,
      access: "user_access",
      variables: {
        email: params.email,
        password: params.password,
        name: params.name,
      },
    });
    return typeof token === "string" ? token : (token as { access: string }).access;
  } finally {
    await db.close();
  }
}

/**
 * Sign in an existing user in the Trello namespace. Returns a JWT token.
 */
export async function trelloSignin(params: {
  email: string;
  password: string;
}): Promise<string> {
  const db = await getTrelloConnection();
  try {
    const token = await db.signin({
      namespace: TRELLO_NS,
      database: TRELLO_DB,
      access: "user_access",
      variables: {
        email: params.email,
        password: params.password,
      },
    });
    return typeof token === "string" ? token : (token as { access: string }).access;
  } finally {
    await db.close();
  }
}

/**
 * Get an authenticated connection for the Trello namespace.
 */
export async function getTrelloAuthenticatedDb(token: string): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.use({ namespace: TRELLO_NS, database: TRELLO_DB });
  await db.authenticate(token);
  return db;
}

export { TRELLO_NS, TRELLO_DB };
