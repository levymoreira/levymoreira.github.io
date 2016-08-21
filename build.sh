#!/usr/bin/env bash

if [ $# -eq 0 ] ; then
    echo "ERROR! Please specify the commit message."
    exit 1
fi

args=("$@")
COMMIT_MESSAGE = ${args[0]}

# Build
bundle exec jekyll build

# Copy to github.io project
rsync -u -a _site/ ../levymoreira.github.io/

# Push to github
cd ../levymoreira.github.io/
git add *
git commit -m $COMMIT_MESSAGE
git push --porcelain --progress --recurse-submodules=check origin refs/heads/master:refs/heads/master


# Purge cache
curl https://www.cloudflare.com/api_json.html \
  -d 'a=fpurge_ts' \
  -d 'tkn=58b0f3d2eae7105b7d937ed759327a3587598' \
  -d 'email=levymoreira.ce@gmail.com' \
  -d 'z=levymoreira.com' \
  -d 'v=1'