#!/bin/bash

# 1. Build the project
echo "Building project..."
npm run build

# 2. Go into the build output directory
cd dist

# 3. Initialize a new git repo for deployment
git init
git checkout -b gh-pages

# 4. Add all files
git add -A
git commit -m 'deploy'

# 5. Add the remote (using the publicly known URL)
git remote add origin https://github.com/sagar-arora80/refund-manager-prototype.git

# 6. Push to the gh-pages branch (force to overwrite old history)
echo "Pushing to GitHub..."
git push -f origin gh-pages

# 7. cleanup
cd ..
echo "Deployment Complete!"
