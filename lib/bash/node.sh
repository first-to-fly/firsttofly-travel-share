#!/usr/bin/env bash

function checkNodeVersion() {

  dependency "node"

  local EXPECTED_NODE_VERSION
  EXPECTED_NODE_VERSION="$(head -n 1 ./.node-version)"

  local CURRENT_NODE_VERSION
  CURRENT_NODE_VERSION="$(node -v)"

  if [[ "${CURRENT_NODE_VERSION}" != "v${EXPECTED_NODE_VERSION}" ]]; then

    echo "Expect NodeJS version v${EXPECTED_NODE_VERSION} but have ${CURRENT_NODE_VERSION}." >&2

    dependency "fnm"

    eval "$(fnm env --multi)"

    # Check if expected version is already installed
    if ! fnm ls | grep "${EXPECTED_NODE_VERSION}" >/dev/null; then
      (
        set -x
        fnm install "${EXPECTED_NODE_VERSION}"
      )
    fi

    (
      set -x
      fnm use "${EXPECTED_NODE_VERSION}"
    )

    command -v node
    node -v

    CURRENT_NODE_VERSION="$(node -v)"

  fi

  echo

  if [[ "${CURRENT_NODE_VERSION}" != "v${EXPECTED_NODE_VERSION}" ]]; then
    echo "After installing, expect NodeJS version v${EXPECTED_NODE_VERSION} but have ${CURRENT_NODE_VERSION}." >&2
    return 1
  fi
}

checkNodeVersion
