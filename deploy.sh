#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Endow Tech — Production Re-Deploy Script (Server-Side / PM2)
# Usage:
#   ./deploy.sh                # deploys 'main' branch and reloads PM2
#   ./deploy.sh develop        # deploys a specific branch
#   PM2_APP_NAME=my-app ./deploy.sh
# ==============================================================================

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="${DEPLOY_BRANCH:-${1:-main}}"
APP_NAME="${PM2_APP_NAME:-endowtech-v2}"
DEFAULT_PORT="${PORT:-3000}"

log() {
  printf "\n\033[1;31m[deploy]\033[0m %s\n" "$1"
}

cd "$APP_DIR"

# Load Node/npm/pm2 paths for non-interactive SSH shells (NVM / global npm)
if [ -s "${HOME}/.nvm/nvm.sh" ]; then
  set +u
  # shellcheck source=/dev/null
  . "${HOME}/.nvm/nvm.sh"
  set -u
fi
export PATH="${HOME}/.npm-global/bin:${HOME}/.local/bin:/usr/local/bin:${PATH}"

for cmd in git node npm pm2; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    printf "\033[1;31m[error]\033[0m Required command not found: %s\n" "$cmd" >&2
    exit 1
  fi
done

log "Starting deployment for '${APP_NAME}' (branch: ${BRANCH}) in ${APP_DIR}..."

# 1. Pull latest code cleanly
log "[1/4] Fetching and pulling origin/${BRANCH}..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

# 2. Install dependencies cleanly (keep devDependencies required for Next.js build)
log "[2/4] Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci --include=dev --no-audit
else
  npm install --include=dev --no-audit
fi

# 3. Build optimized Next.js production bundle
log "[3/4] Building Next.js production bundle..."
npm run build

# 4. Detect existing PM2 process for this directory if default name differs, then reload/start
if ! pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  DETECTED_NAME="$(
    (pm2 jlist 2>/dev/null || true) | node -e '
      let raw = "";
      process.stdin.on("data", c => raw += c);
      process.stdin.on("end", () => {
        try {
          const list = JSON.parse(raw);
          const dir = process.argv[1];
          const match = list.find(p => p.pm2_env && p.pm2_env.pm_cwd === dir);
          if (match && match.name) console.log(match.name);
        } catch {}
      });
    ' "$APP_DIR"
  )"
  if [ -n "${DETECTED_NAME:-}" ]; then
    APP_NAME="$DETECTED_NAME"
  fi
fi

log "[4/4] Reloading PM2 process '${APP_NAME}'..."
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload "$APP_NAME" --update-env || pm2 restart "$APP_NAME" --update-env
else
  log "PM2 process '${APP_NAME}' not found — starting new instance on port ${DEFAULT_PORT}..."
  PORT="$DEFAULT_PORT" pm2 start npm --name "$APP_NAME" -- start
fi

pm2 save

log "Deployment complete! Current PM2 status:"
pm2 status "$APP_NAME"
