import { Surreal } from "surrealdb";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SURREAL_URL = process.env.SURREAL_URL ?? "http://127.0.0.1:8000";

async function main() {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.signin({
    username: process.env.SURREAL_ROOT_USER ?? "root",
    password: process.env.SURREAL_ROOT_PASS ?? "root",
  });

  // Create namespace and database
  try {
    await db.query("DEFINE NAMESPACE IF NOT EXISTS trello;");
    await db.query("USE NS trello;");
    await db.query("DEFINE DATABASE IF NOT EXISTS main;");
  } catch (e: unknown) {
    console.log("Namespace/DB setup note:", e instanceof Error ? e.message : String(e));
  }

  await db.use({ namespace: "trello", database: "main" });

  // Read and apply the Trello schema as a single multi-statement query.
  // Splitting on semicolons would break DEFINE ACCESS and other compound
  // statements that contain inner semicolons.
  const schemaPath = join(__dirname, "..", "schema", "001-trello.surql");
  const rawSchema = readFileSync(schemaPath, "utf-8");

  // Inject JWT secret from env var (falls back to a dev-only default)
  const jwtSecret =
    process.env.JWT_SECRET ?? "dev-only-secret-change-in-prod";
  const schema = rawSchema.replace(/__JWT_SECRET__/g, jwtSecret);

  // Strip the DEFINE NAMESPACE / USE NS / DEFINE DATABASE / USE DB lines
  // since we already set them above via db.use().
  const stripped = schema
    .split("\n")
    .filter((line) => {
      const t = line.trim().toUpperCase();
      return (
        !t.startsWith("DEFINE NAMESPACE") &&
        !t.startsWith("USE NS") &&
        !t.startsWith("DEFINE DATABASE") &&
        !t.startsWith("USE DB")
      );
    })
    .join("\n");

  try {
    await db.query(stripped);
  } catch (e: unknown) {
    console.error("Error applying trello schema:", e instanceof Error ? e.message : String(e));
    throw e;
  }

  console.log("Trello schema applied successfully.");
  await db.close();
}

main().catch((err) => {
  console.error("Failed to apply Trello schema:", err);
  process.exit(1);
});
