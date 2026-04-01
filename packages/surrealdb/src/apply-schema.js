#!/usr/bin/env node
/**
 * Apply SurrealDB schema using the HTTP /sql endpoint.
 * Usage: node src/apply-schema.js
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaDir = join(__dirname, '..', 'schema');
const endpoint = process.env.SURREAL_URL || 'http://localhost:8000';
const user = process.env.SURREAL_ROOT_USER || 'root';
const pass = process.env.SURREAL_ROOT_PASS || 'root';
const ns = process.env.SURREAL_NS || 'quickbooks';
const db = process.env.SURREAL_DB || 'main';

const schemaFile = join(schemaDir, '000-schema.surql');
const sql = readFileSync(schemaFile, 'utf-8');

console.log(`Applying schema to ${endpoint} (ns=${ns}, db=${db})...`);

try {
  // Ensure namespace and database exist (SurrealDB 3.x doesn't auto-create them)
  const initRes = await fetch(`${endpoint}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64'),
    },
    body: `DEFINE NAMESPACE IF NOT EXISTS ${ns}; USE NS ${ns}; DEFINE DATABASE IF NOT EXISTS ${db};`,
  });
  if (!initRes.ok) {
    const text = await initRes.text();
    throw new Error(`Failed to init ns/db: HTTP ${initRes.status}: ${text}`);
  }

  const res = await fetch(`${endpoint}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64'),
      'surreal-ns': ns,
      'surreal-db': db,
    },
    body: sql,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  const errors = data.filter((r) => r.status === 'ERR' && r.kind !== 'AlreadyExists' && !r.result?.includes('already exists'));
  if (errors.length > 0) {
    console.error('Schema errors:', JSON.stringify(errors, null, 2));
    process.exit(1);
  }

  console.log(`Schema applied successfully. ${data.length} statements executed.`);
} catch (err) {
  console.error('Failed to apply schema:', err.message);
  process.exit(1);
}
