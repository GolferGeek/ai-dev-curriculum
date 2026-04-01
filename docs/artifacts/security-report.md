# Security Report -- 2026-04-01

## Summary

The codebase has a **moderate risk** security posture. The two Next.js SaaS apps (quickbooks-killer, trello-killer) follow reasonable patterns -- parameterized SurrealQL queries, httpOnly cookies, server-side auth checks in actions. However, there are **two critical findings**: hardcoded JWT signing keys committed in schema files, and overly permissive `FOR create FULL` database permissions that allow any authenticated user to create records owned by other users. The middleware layer checks for cookie existence but does not validate the JWT, meaning a forged or expired token bypasses the route guard (though SurrealDB itself will reject it at query time). No security headers are configured.

## Findings

### Critical

**C-1. Hardcoded JWT signing keys in schema files**
- **Files:**
  - `packages/surrealdb/schema/000-quickbooks.surql:31` -- `KEY 'quickbooks-killer-secret-key-change-in-prod'`
  - `packages/surrealdb/schema/001-trello.surql:31` -- `KEY 'trello-killer-secret-key-change-in-prod'`
- **Risk:** These keys are committed to version control. Anyone with repo access can forge valid JWT tokens and impersonate any user. The `TODO` comment acknowledges this but the keys are live in the schema that gets applied to the database.
- **Fix:** Read the JWT key from an environment variable at schema-apply time. Use a script that interpolates `$JWT_SECRET` into the DEFINE ACCESS statement. Never commit secrets to source control.

**C-2. Overly permissive `FOR create FULL` on all data tables**
- **Files:**
  - `packages/surrealdb/schema/000-quickbooks.surql:38` -- invoice table
  - `packages/surrealdb/schema/000-quickbooks.surql:52` -- line_item table
  - `packages/surrealdb/schema/000-quickbooks.surql:62` -- expense table
  - `packages/surrealdb/schema/001-trello.surql:37` -- board table
  - `packages/surrealdb/schema/001-trello.surql:48` -- list table
  - `packages/surrealdb/schema/001-trello.surql:59` -- card table
- **Risk:** `FOR create FULL` means any authenticated user can create records with an arbitrary `owner` field, assigning data to another user. For example, User A can create an invoice with `owner = user:B`, polluting User B's data. For line_items and cards, a user can attach items to another user's invoice or board.
- **Fix:** Change to `FOR create WHERE owner = $auth` (or the appropriate parent-ownership check for child tables). The `DEFAULT $auth` on the owner field is not a security control -- it only sets a default; the client can override it.

### High

**H-1. Middleware does not validate JWT tokens -- only checks cookie existence**
- **Files:**
  - `apps/trello-killer/middleware.ts:14` -- `const token = request.cookies.get("trello_token")?.value;`
  - `apps/quickbooks-killer/middleware.ts:14` -- `const token = request.cookies.get("qb_token")?.value;`
- **Risk:** The middleware only checks if the cookie is present, not whether the JWT is valid or expired. A user with an expired or malformed token will pass the middleware and reach server components. The server components do call `authenticateWithToken()` which will fail at the SurrealDB level, but this creates confusing error states rather than clean redirects.
- **Mitigating factor:** SurrealDB itself validates the token at query time, so no actual data breach occurs. But the user experience is an unhandled error rather than a redirect to signin.
- **Fix:** Decode and validate the JWT in middleware (check expiry at minimum). If invalid, redirect to signin.

**H-2. Hardcoded root credentials with weak defaults**
- **File:** `packages/surrealdb/src/connection.ts:25-26`
  ```typescript
  username: process.env.SURREAL_ROOT_USER ?? "root",
  password: process.env.SURREAL_ROOT_PASS ?? "root",
  ```
- **Risk:** If environment variables are not set, the application falls back to `root`/`root` credentials. In a misconfigured production deployment, this would grant full database access.
- **Fix:** Remove the fallback defaults. Throw an error if `SURREAL_ROOT_USER` or `SURREAL_ROOT_PASS` are not set, or restrict `getRootConnection()` to scripts only (not importable by app code).

**H-3. User type includes password field -- potential data exposure**
- **File:** `packages/surrealdb/src/types.ts:32`
  ```typescript
  export interface User {
    id: string;
    email: string;
    password?: string;  // <-- argon2 hash
    name: string;
  }
  ```
- **Risk:** The `SELECT * FROM user` in SIGNIN queries returns the password hash. While it is an argon2 hash (not plaintext), and the SIGNIN is handled server-side by SurrealDB, the TypeScript type explicitly models the password field. If any future code does `SELECT * FROM user` via an authenticated connection and returns that to a client component, the hash leaks.
- **Fix:** Add a `PERMISSIONS FOR select` on the user table that excludes the password field, or define a computed field that omits it. At minimum, remove `password` from the `User` TypeScript interface to prevent accidental use.

### Medium

**M-1. No security headers configured**
- **Files:**
  - `apps/quickbooks-killer/next.config.js` -- no `headers()` configuration
  - `apps/trello-killer/next.config.js` -- no `headers()` configuration
- **Risk:** Missing `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, and `Referrer-Policy` headers. This leaves apps vulnerable to clickjacking, MIME-type sniffing, and makes XSS exploitation easier if a vector is found.
- **Fix:** Add a `headers()` function to `next.config.js` with standard security headers.

**M-2. No CSRF protection on server actions beyond Next.js defaults**
- **Files:** `apps/trello-killer/lib/actions.ts`, `apps/quickbooks-killer/lib/actions.ts`
- **Risk:** Server actions in Next.js 14 have built-in origin checking, but the `sameSite: "lax"` cookie setting allows GET-based cross-site requests. Since all mutations use POST (via form actions), this is largely mitigated by Next.js internals, but there is no explicit CSRF token pattern.
- **Mitigating factor:** Next.js server actions automatically reject cross-origin POST requests.
- **Fix:** This is acceptable for the current architecture but should be documented as a known limitation.

**M-3. No rate limiting on authentication endpoints**
- **Files:** `apps/quickbooks-killer/lib/actions.ts:18-58`, `apps/trello-killer/lib/actions.ts:21-61`
- **Risk:** The signup and signin actions have no rate limiting. An attacker can brute-force passwords or create mass spam accounts without throttling.
- **Fix:** Add rate limiting middleware or use a service like Upstash ratelimit.

**M-4. Trello middleware excludes `/api` routes from auth check**
- **File:** `apps/trello-killer/middleware.ts:25`
  ```
  "/((?!_next/static|_next/image|favicon.ico|api).*)"
  ```
- **Risk:** Any future API routes added under `/api/` will be unprotected by default. Currently no API routes exist, so this is not immediately exploitable, but it is a footgun.
- **Fix:** Remove the `api` exclusion from the matcher, or add explicit auth checks to any future API routes.

### Low

**L-1. Seed scripts log credentials to stdout**
- **Files:**
  - `packages/surrealdb/scripts/seed.ts:30` -- `console.log("Created demo user: demo@example.com / password123")`
  - `packages/surrealdb/scripts/seed-trello.ts:29` -- same pattern
- **Risk:** Low -- these are development-only seed scripts. But if CI/CD logs are public, demo credentials are exposed. The password `password123` is used consistently across seed scripts.
- **Informational:** The passwords in `e2e/auth.spec.ts` and `e2e/full-flow.spec.ts` (`testpass123`) are test fixtures, not real credentials. Not a finding.

**L-2. Cookie `secure` flag only set in production**
- **Files:**
  - `apps/trello-killer/lib/auth.ts:14` -- `secure: process.env.NODE_ENV === "production"`
  - `apps/quickbooks-killer/lib/auth.ts:14` -- same
- **Risk:** In development, the cookie is sent over HTTP without the secure flag. This is standard practice and acceptable, but worth noting for awareness.

**L-3. dist/ directories with build artifacts committed or present**
- **Files:** `apps/team-wiki/dist/`, `apps/http-workspace/dist/`, `apps/ops-pulse/dist/`, `apps/pipeline-crm/dist/`
- **Risk:** Build artifacts contain minified source code. While not a direct vulnerability, they increase repo size and could theoretically leak internal patterns. The `.gitignore` includes `dist/` so these may be untracked.
- **Fix:** Verify these are gitignored and not committed. Run `git ls-files apps/*/dist/` to check.

**L-4. No input length validation on form fields**
- **Files:** All server actions in both apps
- **Risk:** There is no server-side validation of input length for fields like `name`, `client`, `description`, etc. While SurrealDB schema validation provides some protection (fields are typed as `string`), extremely long inputs could cause performance issues.
- **Fix:** Add reasonable max-length checks in server actions.

## Statistics

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 3 |
| Medium | 4 |
| Low | 4 |

## Positive findings

- All SurrealQL queries use **parameterized variables** (`$client`, `$name`, `$id`, etc.) -- no string interpolation or concatenation in queries. Injection risk is minimal.
- Passwords are hashed with **argon2** via `crypto::argon2::generate()` in the database layer.
- Auth cookies are set with **httpOnly: true** and **sameSite: "lax"** -- no XSS-based cookie theft.
- No `dangerouslySetInnerHTML` usage in application source code (only in build artifacts/reports).
- Server actions consistently check `getToken()` and redirect to signin if missing.
- No `.env` files are tracked in git (`.gitignore` properly excludes them).
- No exposed API routes exist that bypass authentication.

## Recommended next steps

1. **Immediately** replace hardcoded JWT keys with environment-variable-injected secrets (C-1)
2. **Immediately** fix `FOR create FULL` permissions to `FOR create WHERE owner = $auth` (C-2)
3. Add JWT validation in middleware (H-1)
4. Remove fallback root credentials in `connection.ts` (H-2)
5. Add security headers to `next.config.js` (M-1)
6. Add rate limiting to auth actions (M-3)
7. Run `/git-story` to analyze change history for any previously committed secrets
