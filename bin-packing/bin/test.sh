#!/bin/bash

NODE_ENV=test \
  npx mocha \
  --exit \
  --file test/unit.js \
  --recursive \
  --bail \
  --timeout 1000 \
  --reporter spec \
  "src/**/*.test.js"

mocha_exit=$?
exit $mocha_exit

