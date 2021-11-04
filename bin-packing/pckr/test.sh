#!/bin/bash

# set the working dir as the current dir
cd "$(dirname "$0")"
pwd

NODE_ENV=test \
  npx mocha \
  --exit \
  --file test.js \
  --recursive \
  --bail \
  --timeout 1000 \
  --reporter spec \
  "src/**/*.test.js"

mocha_exit=$?
exit $mocha_exit
