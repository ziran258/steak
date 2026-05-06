#!/usr/bin/env bash
set -euo pipefail

SSH_HOST="${SSH_HOST:-101.42.22.251}"
SSH_PORT="${SSH_PORT:-22}"
SSH_USER="${SSH_USER:-codex}"
APP_DIR="${APP_DIR:-/opt/steak}"
GIT_REPO="${GIT_REPO:-https://github.com/ziran258/steak.git}"
BRANCH="${BRANCH:-main}"
SITE_URL="${SITE_URL:-http://${SSH_HOST}}"

KEY_FILE=""
cleanup() {
  if [[ -n "$KEY_FILE" && -f "$KEY_FILE" ]]; then
    rm -f "$KEY_FILE"
  fi
}
trap cleanup EXIT

if [[ -n "${STEAK_SSH_KEY_PATH:-}" ]]; then
  KEY_FILE="$STEAK_SSH_KEY_PATH"
elif [[ -n "${STEAK_SSH_KEY:-}" ]]; then
  KEY_FILE="$(mktemp)"
  printf '%s\n' "$STEAK_SSH_KEY" > "$KEY_FILE"
  chmod 600 "$KEY_FILE"
elif [[ -n "${codex:-}" ]]; then
  KEY_FILE="$(mktemp)"
  printf '%s\n' "$codex" > "$KEY_FILE"
  chmod 600 "$KEY_FILE"
else
  echo "Missing SSH key. Set STEAK_SSH_KEY_PATH=/path/to/key.pem or STEAK_SSH_KEY to the private key content." >&2
  exit 1
fi

SSH_OPTS=(-i "$KEY_FILE" -p "$SSH_PORT" -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes)
REMOTE="$SSH_USER@$SSH_HOST"

ssh "${SSH_OPTS[@]}" "$REMOTE" \
  "APP_DIR='$APP_DIR' GIT_REPO='$GIT_REPO' BRANCH='$BRANCH' SITE_URL='$SITE_URL' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

sudo apt-get update
sudo apt-get install -y ca-certificates curl git openssl

if ! command -v docker >/dev/null 2>&1; then
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

sudo usermod -aG docker "$USER" || true
sudo mkdir -p "$APP_DIR"
sudo chown "$USER":"$USER" "$APP_DIR"

if [[ ! -d "$APP_DIR/.git" ]]; then
  git clone --branch "$BRANCH" "$GIT_REPO" "$APP_DIR"
else
  git -C "$APP_DIR" fetch origin "$BRANCH"
  git -C "$APP_DIR" checkout "$BRANCH"
  git -C "$APP_DIR" reset --hard "origin/$BRANCH"
fi

cd "$APP_DIR"
if [[ ! -f .env.production ]]; then
  POSTGRES_PASSWORD="$(openssl rand -base64 32 | tr -d '\n')"
  cat > .env.production <<ENVEOF
POSTGRES_USER=steak
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=steak_wiki
DATABASE_URL=postgres://steak:${POSTGRES_PASSWORD}@postgres:5432/steak_wiki
NEXT_PUBLIC_SITE_URL=${SITE_URL}
ENVEOF
  chmod 600 .env.production
fi

sudo docker compose --env-file .env.production -f docker-compose.vps.yml up -d --build
sudo docker compose --env-file .env.production -f docker-compose.vps.yml ps
curl -fsS --retry 12 --retry-delay 5 "http://127.0.0.1/" >/dev/null
REMOTE_SCRIPT

echo "Deployment completed. Open: ${SITE_URL}"
