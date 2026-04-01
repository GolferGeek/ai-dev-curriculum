-- QuickBooks Killer — SurrealDB schema (SurrealDB 3.x)

DEFINE NAMESPACE IF NOT EXISTS quickbooks;
USE NS quickbooks;

DEFINE DATABASE IF NOT EXISTS main;
USE DB main;

-- ─── User table ───────────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS user SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS email    ON TABLE user TYPE string ASSERT string::is_email($value);
DEFINE FIELD IF NOT EXISTS password ON TABLE user TYPE string;
DEFINE FIELD IF NOT EXISTS name     ON TABLE user TYPE string;
DEFINE FIELD IF NOT EXISTS created  ON TABLE user TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS idx_user_email ON TABLE user COLUMNS email UNIQUE;

-- ─── Record-level access (replaces old SCOPE syntax) ─────────
DEFINE ACCESS IF NOT EXISTS user_access ON DATABASE TYPE RECORD
  SIGNUP (
    CREATE user SET
      email    = $email,
      password = crypto::argon2::generate($password),
      name     = $name
  )
  SIGNIN (
    SELECT * FROM user
    WHERE email = $email
      AND crypto::argon2::compare(password, $password)
  )
  -- TODO: Replace with env-injected secret in production
  WITH JWT ALGORITHM HS256 KEY 'quickbooks-killer-secret-key-change-in-prod'
  DURATION FOR TOKEN 24h, FOR SESSION 7d;

-- ─── Invoice table ────────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS invoice SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE owner = $auth
    FOR create FULL;

DEFINE FIELD IF NOT EXISTS owner      ON TABLE invoice TYPE record<user> DEFAULT $auth;
DEFINE FIELD IF NOT EXISTS client     ON TABLE invoice TYPE string;
DEFINE FIELD IF NOT EXISTS due_date   ON TABLE invoice TYPE datetime;
DEFINE FIELD IF NOT EXISTS paid_at    ON TABLE invoice TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS status     ON TABLE invoice TYPE string DEFAULT 'unpaid';
DEFINE FIELD IF NOT EXISTS total      ON TABLE invoice TYPE number DEFAULT 0;
DEFINE FIELD IF NOT EXISTS created    ON TABLE invoice TYPE datetime DEFAULT time::now();

-- ─── Line-item table ─────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS line_item SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE invoice.owner = $auth
    FOR create FULL;

DEFINE FIELD IF NOT EXISTS invoice     ON TABLE line_item TYPE record<invoice>;
DEFINE FIELD IF NOT EXISTS description ON TABLE line_item TYPE string;
DEFINE FIELD IF NOT EXISTS amount      ON TABLE line_item TYPE number;

-- ─── Expense table ───────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS expense SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE owner = $auth
    FOR create FULL;

DEFINE FIELD IF NOT EXISTS owner       ON TABLE expense TYPE record<user> DEFAULT $auth;
DEFINE FIELD IF NOT EXISTS description ON TABLE expense TYPE string;
DEFINE FIELD IF NOT EXISTS amount      ON TABLE expense TYPE number;
DEFINE FIELD IF NOT EXISTS category    ON TABLE expense TYPE string
  ASSERT $value IN ['Office', 'Travel', 'Software', 'Marketing', 'Other'];
DEFINE FIELD IF NOT EXISTS date        ON TABLE expense TYPE datetime;
DEFINE FIELD IF NOT EXISTS created     ON TABLE expense TYPE datetime DEFAULT time::now();
