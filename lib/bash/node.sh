#!/usr/bin/env bash

function checkNodeVersion() {

  EXPECTED_NODE_VERSION="$(head -n 1 ./.node-version)"
  CURRENT_NODE_VERSION="$(node -v)"

  if [[ "${CURRENT_NODE_VERSION}" != "v${EXPECTED_NODE_VERSION}" ]]; then

    echo "Expect NodeJS version ${EXPECTED_NODE_VERSION} but have ${CURRENT_NODE_VERSION}." >&2

    # Check and install FNM if needed
    if ! command -v "fnm" >/dev/null; then
      if command -v "brew" >/dev/null; then
        (
          set -x
          brew install "Schniz/tap/fnm"
        )
      else
        (
          set -x
          curl -fsSL "https://github.com/Schniz/fnm/raw/master/.ci/install.sh" | bash
        )
      fi
    fi

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

    (
      set -x
      eval "$(fnm env --multi)"
    )

    CURRENT_NODE_VERSION="$(node -v)"

  fi

  echo

  if [[ "${CURRENT_NODE_VERSION}" != "v${EXPECTED_NODE_VERSION}" ]]; then
    return 1
  fi
}

checkNodeVersion
