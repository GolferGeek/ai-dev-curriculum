# Commands — Phase 07
## Inspect and validate the program

```bash
npm run ai:program:check
npm run docs:links
npm run ai:check
```

Use the equivalent harness invocation for the canonical advisor:

```text
ai-program-advisor ask "How is our governance?"
ai-program-advisor ask "What are we lacking?"
ai-program-advisor ask "What's changing?"
ai-program-advisor ask "What's missing?"
ai-program-advisor ask "What's old?"
ai-program-advisor ask "What's wrong?"
```

## Run the completed reference

```bash
cd completed/apps/ai-program
npm install
npm run dev
```

Open <http://localhost:3300>. For a relocated program:

```bash
AI_PROGRAM_ROOT=/absolute/path/to/docs/ai-program npm run dev
```

## Verify the reference

```bash
cd completed/apps/ai-program
npm run lint
npm run test:unit
npm run build
npm test
```

## Apply an approved program change

1. Edit the governing document under `docs/ai-program/`.
2. If behavior changes, edit canonical `ai/` in the same review.
3. Regenerate harness projections.

```bash
npm run ai:generate
npm run ai:check
npm run ai:program:check
npm run docs:links
```

Generating a proposal in the application does not authorize these edits.
Apply only the proposal the organization's authorized reviewer accepted.
