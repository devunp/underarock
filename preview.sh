#!/usr/bin/env bash
# preview.sh — serve the site locally so you can see the CURRENT branch in a
# browser before it goes live. Uses http (not file://) so terrain.html's
# Three.js modules and fetches work correctly.
#
# usage: ./preview.sh          serves at http://localhost:8000
#        ./preview.sh 3000     serves at http://localhost:3000
set -euo pipefail
cd "$(dirname "$0")"

PORT="${1:-8000}"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
echo ">> serving branch '$BRANCH' at http://localhost:$PORT  (Ctrl-C to stop)"
python3 -m http.server "$PORT"
