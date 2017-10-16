#!/usr/bin/env bash
fuser -k 4000/tcp
jekyll serve --watch
