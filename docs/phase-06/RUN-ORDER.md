# Run order — Phase 06

## Before you start

- [ ] Phase 05 complete
- [ ] Ollama installed and running (`ollama serve`)
- [ ] Models downloaded (run `ollama list` to check)
- [ ] Anthropic API key available (for Claude models as contestants + judge)

## Download models (if needed)

```bash
# Contestants
ollama pull gemma4:e2b
ollama pull gemma4:e4b
ollama pull gemma4:26b
ollama pull gemma4:31b
ollama pull qwen3.5
ollama pull qwen3.5:9b
ollama pull qwen3:8b
ollama pull qwq
ollama pull deepseek-r1
ollama pull gpt-oss:20b
ollama pull llama3.2:3b
```

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | `/intention docs/artifacts/intention-model-eval.md` | Review the intention |
| 2 | `/prd docs/artifacts/intention-model-eval.md` | Generate PRD |
| 3 | `/plan docs/artifacts/prd-model-eval.md` | Create implementation plan |
| 4 | `/run-plan docs/artifacts/plan-model-eval.md` | Build the harness + dashboard |
| 5 | Run the evaluation | See below |
| 6 | Open the dashboard | See results |
| 7 | `/commit pr` | Ship it |

## Running the evaluation

```bash
cd apps/model-eval
npm run eval              # run all 13 models × 10 prompts × 4 judges
npm run eval -- --models gemma4  # test only Gemma 4 models
npm run eval -- --round2  # run Round 2 on existing Round 1 results
```

## If something fails

- **Ollama not running** → `ollama serve` in a separate terminal
- **Model not found** → `ollama pull <model-name>`
- **Timeout on large models** → Increase timeout in harness config. Some 30B+ models may take minutes per prompt.
- **Anthropic API error** → Check `ANTHROPIC_API_KEY` env var
- **Partial results** → The harness saves intermediate results. Re-run and it picks up where it left off.
