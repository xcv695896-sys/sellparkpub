#!/bin/sh
# Push SellPark project to GitHub
# Run: sh push-to-github.sh   (or chmod +x push-to-github.sh && ./push-to-github.sh)
# Requires: Git installed and GitHub auth (SSH or HTTPS)

REPO_URL="https://github.com/xcv695896-sys/sellparkpub.git"
cd "$(dirname "$0")"

if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit: SellPark website (Next.js, Tailwind, Vercel-ready)"
  git branch -M main
  git remote add origin "$REPO_URL"
fi

git add .
git status --short | grep -q . && git commit -m "Update SellPark website" || true
git remote get-url origin 2>/dev/null || git remote add origin "$REPO_URL"
git push -u origin main
echo "Done. Repo: https://github.com/xcv695896-sys/sellparkpub"
