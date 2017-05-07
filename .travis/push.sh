#!/bin/sh

# Set git user
git config --global user.email "hysterix3@gmail.com"
git config --global user.name "CraigCollie"

# Check out deploy branch
git checkout -b deploy
git add .
git commit --message "Adding build artifacts: $TRAVIS_BUILD_NUMBER"

# Commit branch
git remote add origin https://1457abec2e59d60904fdc06857c73dadbb11a971@github.com/craigcollie/tiny-universal.git > /dev/null 2>&1
git push --quiet --set-upstream origin deploy
