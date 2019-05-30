#!/usr/bin/env bash

function checkNodeVersion() {

  NODE_VERSION="$(jq --raw-output ".devDependencies.node" "./package.json")"
  CURRENT_NODE_VERSION="$(node -v)"

  if [[ "v${NODE_VERSION}" != "${CURRENT_NODE_VERSION}" ]]; then
    echo "Expect NodeJS version ${NODE_VERSION} but have ${CURRENT_NODE_VERSION}." >&2
    exit 1
  fi
}

if [[ -d "./node_modules" ]]; then
  PATH="${PWD}/node_modules/.bin:${PATH}"
fi

checkNodeVersion
