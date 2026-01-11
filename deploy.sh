#!/bin/bash

set -e

echo "🚀 Starting deployment..."

echo "📦 Building project..."
npm run build

CURRENT_BRANCH=$(git branch --show-current)

echo "📦 Saving build to temp..."
rm -rf /tmp/portfolio-build-tmp
cp -r build /tmp/portfolio-build-tmp

echo "🔄 Switching to gh-pages..."
git checkout gh-pages

echo "🧹 Cleaning gh-pages..."
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

echo "📋 Copying build files..."
cp -r /tmp/portfolio-build-tmp/* .

echo "💾 Committing changes..."
git add -A
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

echo "⬆️  Pushing to GitHub..."
git push origin gh-pages

echo "🔙 Returning to $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "🧹 Cleaning temp..."
rm -rf /tmp/portfolio-build-tmp

echo "✅ Deployment complete!"
echo "🌐 Check: https://bolshakovandrey.github.io/personal_portfolio/"
