#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v xcodebuild >/dev/null 2>&1; then
  echo "SKIP: xcodebuild is unavailable. Native iOS references require macOS with Xcode." >&2
  exit 0
fi

DESTINATION="${IOS_TEST_DESTINATION:-platform=iOS Simulator,name=iPhone 17}"

run_ios_suite() {
  local directory="$1"
  local scheme="$2"

  echo "IOS BUILD+TEST: $directory ($scheme)"
  xcodebuild \
    -project "$directory/$scheme.xcodeproj" \
    -scheme "$scheme" \
    -destination "$DESTINATION" \
    -parallel-testing-enabled NO \
    build test
}

# Run serially because both suites share simulator resources.
run_ios_suite "completed/apps/twitter-killer" "twitter-killer"
run_ios_suite "completed/apps/facebook-killer" "facebook-killer"

echo "OK: optional native iOS reference applications build and test."
