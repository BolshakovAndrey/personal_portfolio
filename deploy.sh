#!/bin/bash

# Portfolio deployment script
set -e

echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Switch to gh-pages
echo "🔄 Switching to gh-pages branch..."
git checkout gh-pages

# Clean everything except .git and node_modules
echo "🧹 Cleaning gh-pages..."
find . -maxdepth 1 ! -name '.git' ! -name 'node_modules' ! -name '.' ! -name '..' -exec rm -rf {} +

# Copy build files
echo "📋 Copying build files..."
cp -r build/* .

# Remove build directory from gh-pages
rm -rf build

# Add and commit
echo "💾 Committing changes..."
git add -A
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin gh-pages

# Return to original branch
echo "🔙 Returning to $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "✅ Deployment complete!"
echo "🌐 Check: https://bolshakovandrey.github.io/personal_portfolio/"
