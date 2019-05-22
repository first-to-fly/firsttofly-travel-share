#!/usr/bin/env bash

function checkNodeVersion() {

  if [[ ! -f "./.nvmrc" ]]; then
    return
  fi

  NODE_VERSION="v$(head -n 1 "./.nvmrc")"
  CURRENT_NODE_VERSION="$(node -v)"

  if [[ "${NODE_VERSION}" != "${CURRENT_NODE_VERSION}" ]]; then
    echo "Expect NodeJS version ${NODE_VERSION} but have ${CURRENT_NODE_VERSION}." >&2
    exit 1
  fi
}
