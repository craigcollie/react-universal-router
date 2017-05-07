#!/bin/sh

setup_git() {
  git config --global user.email "hysterix3@gmail.com"
  git config --global user.name "CraigCollie"
}

commit_website_files() {
  git checkout -b deploy
  git add .
  git commit --message "Adding build artifacts: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://1457abec2e59d60904fdc06857c73dadbb11a971@github.com/MVSE-outreach/resources.git > /dev/null 2>&1
  git push --quiet --set-upstream origin deploy
}

setup_git
commit_website_files
upload_files
