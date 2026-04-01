-- Trello Killer — SurrealDB schema (SurrealDB 3.x)

DEFINE NAMESPACE IF NOT EXISTS trello;
USE NS trello;

DEFINE DATABASE IF NOT EXISTS main;
USE DB main;

-- ─── User table (same pattern as QuickBooks) ─────────────────
DEFINE TABLE IF NOT EXISTS user SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS email    ON TABLE user TYPE string ASSERT string::is::email($value);
DEFINE FIELD IF NOT EXISTS password ON TABLE user TYPE string;
DEFINE FIELD IF NOT EXISTS name     ON TABLE user TYPE string;
DEFINE FIELD IF NOT EXISTS created  ON TABLE user TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS idx_user_email ON TABLE user COLUMNS email UNIQUE;

-- ─── Record-level access (reused pattern) ────────────────────
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
  WITH JWT ALGORITHM HS256 KEY 'trello-killer-secret-key-change-in-prod'
  DURATION FOR TOKEN 24h, FOR SESSION 7d;

-- ─── Board table ─────────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS board SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE owner = $auth.id
    FOR create FULL;

DEFINE FIELD IF NOT EXISTS owner   ON TABLE board TYPE record<user> DEFAULT $auth.id;
DEFINE FIELD IF NOT EXISTS name    ON TABLE board TYPE string;
DEFINE FIELD IF NOT EXISTS created ON TABLE board TYPE datetime DEFAULT time::now();

-- ─── List table ──────────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS list SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE board.owner = $auth.id
    FOR create FULL;

DEFINE FIELD IF NOT EXISTS board    ON TABLE list TYPE record<board>;
DEFINE FIELD IF NOT EXISTS name     ON TABLE list TYPE string;
DEFINE FIELD IF NOT EXISTS position ON TABLE list TYPE int DEFAULT 0;
DEFINE FIELD IF NOT EXISTS created  ON TABLE list TYPE datetime DEFAULT time::now();

-- ─── Card table ──────────────────────────────────────────────
DEFINE TABLE IF NOT EXISTS card SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE list.board.owner = $auth.id
    FOR create FULL;

DEFINE FIELD IF NOT EXISTS list        ON TABLE card TYPE record<list>;
DEFINE FIELD IF NOT EXISTS title       ON TABLE card TYPE string;
DEFINE FIELD IF NOT EXISTS description ON TABLE card TYPE option<string>;
DEFINE FIELD IF NOT EXISTS position    ON TABLE card TYPE int DEFAULT 0;
DEFINE FIELD IF NOT EXISTS created     ON TABLE card TYPE datetime DEFAULT time::now();
