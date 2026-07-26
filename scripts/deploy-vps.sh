#!/usr/bin/env bash
# Déploiement production Next.js sur le VPS OVH (3dstoreconcept.com)
# Usage:
#   export VPS_HOST=213.32.20.152
#   export VPS_USER=root
#   export VPS_SSH_KEY=~/.ssh/id_ed25519
#   ./scripts/deploy-vps.sh
set -euo pipefail

VPS_HOST="${VPS_HOST:-213.32.20.152}"
VPS_USER="${VPS_USER:-root}"
VPS_SSH_KEY="${VPS_SSH_KEY:-}"
APP_DIR="${APP_DIR:-/var/www/3dstoreconcept}"
APP_NAME="${APP_NAME:-3dstoreconcept}"
APP_PORT="${APP_PORT:-3000}"

SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o ConnectTimeout=10)
if [[ -n "$VPS_SSH_KEY" ]]; then
  SSH_OPTS+=(-i "$VPS_SSH_KEY")
fi

ssh_cmd() {
  ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" "$@"
}

echo "==> Build local (mode serveur, pas GitHub Pages)"
unset GITHUB_PAGES
export DATABASE_URL="${DATABASE_URL:-file:./prisma/dev.db}"
npm ci
npx prisma generate
npm run build

echo "==> Archive de déploiement"
TMP_DIR="$(mktemp -d)"
ARCHIVE="$TMP_DIR/app.tar.gz"
tar -czf "$ARCHIVE" \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=out \
  --exclude=.next/cache \
  .next public prisma package.json package-lock.json next.config.ts tsconfig.json .env

echo "==> Connexion ${VPS_USER}@${VPS_HOST}"
ssh_cmd "mkdir -p '$APP_DIR'"

echo "==> Upload"
scp "${SSH_OPTS[@]}" "$ARCHIVE" "${VPS_USER}@${VPS_HOST}:/tmp/${APP_NAME}.tar.gz"

echo "==> Install + restart sur le VPS"
ssh_cmd bash -s <<REMOTE
set -euo pipefail
APP_DIR='$APP_DIR'
APP_NAME='$APP_NAME'
APP_PORT='$APP_PORT'
cd "\$APP_DIR"
tar -xzf "/tmp/\${APP_NAME}.tar.gz"
npm ci --omit=dev
npx prisma generate
# PM2 si dispo, sinon nohup
if command -v pm2 >/dev/null 2>&1; then
  pm2 delete "\$APP_NAME" >/dev/null 2>&1 || true
  PORT="\$APP_PORT" pm2 start npm --name "\$APP_NAME" -- start
  pm2 save || true
else
  pkill -f "next start -p \$APP_PORT" >/dev/null 2>&1 || true
  nohup npm run start -- -p "\$APP_PORT" >/var/log/\${APP_NAME}.log 2>&1 &
fi
echo "Deploy OK on port \$APP_PORT"
REMOTE

rm -rf "$TMP_DIR"
echo "==> Terminé. Vérifiez https://3dstoreconcept.com/admin/products"
