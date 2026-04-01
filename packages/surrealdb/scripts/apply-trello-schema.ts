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
  await db.signin({ username: "root", password: "root" });

  // Create namespace and database
  try {
    await db.query("DEFINE NAMESPACE IF NOT EXISTS trello;");
    await db.query("USE NS trello;");
    await db.query("DEFINE DATABASE IF NOT EXISTS main;");
  } catch (e: any) {
    console.log("Namespace/DB setup note:", e.message ?? e);
  }

  await db.use({ namespace: "trello", database: "main" });

  // Read and apply the Trello schema
  const schemaPath = join(__dirname, "..", "schema", "001-trello.surql");
  const schema = readFileSync(schemaPath, "utf-8");

  // Split on semicolons and execute each statement
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  for (const stmt of statements) {
    try {
      await db.query(stmt + ";");
    } catch (e: any) {
      const msg = e.message ?? String(e);
      if (
        msg.includes("already exists") ||
        msg.includes("already defined")
      ) {
        console.log(`  (skipped, already exists): ${stmt.slice(0, 60)}...`);
      } else {
        console.error(`Error applying: ${stmt.slice(0, 80)}...`);
        console.error(e);
      }
    }
  }

  console.log("Trello schema applied successfully.");
  await db.close();
}

main().catch((err) => {
  console.error("Failed to apply Trello schema:", err);
  process.exit(1);
});
