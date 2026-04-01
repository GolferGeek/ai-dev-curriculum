import { Surreal } from "surrealdb";
import { getConnection } from "./connection";

export interface SignupParams {
  email: string;
  password: string;
  name: string;
}

export interface SigninParams {
  email: string;
  password: string;
}

/**
 * Sign up a new user. Returns a JWT token string.
 */
export async function signup(params: SignupParams): Promise<string> {
  const db = await getConnection();
  try {
    const result = await db.signup({
      namespace: "quickbooks",
      database: "main",
      access: "user_access",
      variables: {
        email: params.email,
        password: params.password,
        name: params.name,
      },
    });
    return typeof result === "string" ? result : (result as { access: string }).access;
  } finally {
    await db.close();
  }
}

/**
 * Sign in an existing user. Returns a JWT token string.
 */
export async function signin(params: SigninParams): Promise<string> {
  const db = await getConnection();
  try {
    const result = await db.signin({
      namespace: "quickbooks",
      database: "main",
      access: "user_access",
      variables: {
        email: params.email,
        password: params.password,
      },
    });
    return typeof result === "string" ? result : (result as { access: string }).access;
  } finally {
    await db.close();
  }
}

/**
 * Authenticate an existing connection with a token.
 */
export async function authenticateWithToken(
  db: Surreal,
  token: string
): Promise<void> {
  await db.authenticate(token);
}
