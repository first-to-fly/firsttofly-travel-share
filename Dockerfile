ARG NODE_VERSION="lts"


# ===== Builder =====
FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app

RUN \
  apk add \
  --virtual "shared-dependencies" \
  "bash" \
  "ca-certificates" \
  "curl" \
  "jq"

RUN curl -s "https://raw.githubusercontent.com/envkey/envkey-source/master/install.sh" | bash

# Core
COPY "./lib/bash/core.sh" "./lib/bash/core.sh"
COPY "./lib/bash/node.sh" "./lib/bash/node.sh"

RUN \
  apk add \
  --virtual "build-dependencies" \
  "alpine-sdk" \
  "build-base" \
  "gcc" \
  "git" \
  "go" \
  "libc-dev" \
  "make" \
  "python" \
  "wget"

RUN curl -sfL "https://install.goreleaser.com/github.com/tj/node-prune.sh" | bash

# Install
COPY "./.node-version" "./.node-version"
COPY "./package.json" "./package.json"
COPY "./package-lock.json" "./package-lock.json"
COPY "./patches" "./patches"
COPY "./pipeline/install" "./pipeline/install"
RUN ./pipeline/install

# Build
COPY "./tsconfig.json" "./tsconfig.json"
COPY "./src" "./src"
COPY "./pipeline/build" "./pipeline/build"
RUN ./pipeline/build

# Install (Production)
RUN rm -rf "./node_modules"
RUN ./pipeline/install --production

# Prune
RUN ./bin/node-prune "./node_modules"


# ===== Production =====
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

RUN \
  apk add \
  --virtual "shared-dependencies" \
  "bash" \
  "ca-certificates" \
  "curl" \
  "jq"

RUN curl -s "https://raw.githubusercontent.com/envkey/envkey-source/master/install.sh" | bash

# Core
COPY "./lib/bash/core.sh" "./lib/bash/core.sh"
COPY "./lib/bash/node.sh" "./lib/bash/node.sh"

# Run
COPY "./.node-version" "./.node-version"
COPY "./package.json" "./package.json"
COPY "./package-lock.json" "./package-lock.json"
COPY "./pipeline/run" "./pipeline/run"

# Built
COPY --from=builder "/app/node_modules" "./node_modules"
COPY --from=builder "/app/build" "./build"

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
