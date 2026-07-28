#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

build_package() {
  local directory="$1"

  if [[ ! -f "$directory/package-lock.json" ]]; then
    echo "FAIL: missing lockfile: $directory/package-lock.json" >&2
    return 1
  fi

  echo "BUILD: $directory"
  npm ci --ignore-scripts --prefix "$directory"
  npm run build --prefix "$directory"
}

build_package "completed/apps/agent-to-agent/shared"

for directory in \
  completed/apps/agent-to-agent/booking-agent \
  completed/apps/agent-to-agent/orchestrator \
  completed/apps/agent-to-agent/premium-data-service \
  completed/apps/agent-to-agent/restaurant-agent \
  completed/apps/agent-to-agent/web \
  completed/apps/http-workspace \
  completed/apps/model-eval \
  completed/apps/ops-pulse \
  completed/apps/pipeline-crm \
  completed/apps/quickbooks-killer \
  completed/apps/team-wiki \
  completed/apps/trello-killer; do
  build_package "$directory"
done

for directory in \
  completed/apps/model-eval \
  completed/apps/quickbooks-killer \
  completed/apps/trello-killer; do
  echo "LINT: $directory"
  npm run lint --prefix "$directory"
done

for directory in \
  completed/apps/http-workspace \
  completed/apps/ops-pulse \
  completed/apps/pipeline-crm \
  completed/apps/team-wiki; do
  echo "BROWSER: $directory"
  PLAYWRIGHT_BROWSERS_PATH="$ROOT/node_modules/playwright-core/.local-browsers" \
    npm test --prefix "$directory"
done

echo "OK: completed reference applications build, lint, and browser-test."
