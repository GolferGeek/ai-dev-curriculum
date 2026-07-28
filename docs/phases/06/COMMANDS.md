# Commands — Phase 06

```text
/intention docs/artifacts/intention-model-eval.md
/prd docs/artifacts/intention-model-eval.md
/plan docs/artifacts/prd-model-eval.md
/run-plan docs/artifacts/plan-model-eval.md
/scan-errors model-eval
/commit pr
```

Suggested application commands:

```bash
cd apps/model-eval
npm run eval
npm run eval -- --models gemma4
npm run eval -- --round2
```

Suggested local-runtime checks:

```bash
ollama list
curl http://localhost:11434/api/tags
```

Exact commands depend on the generated plan and current model roster.
