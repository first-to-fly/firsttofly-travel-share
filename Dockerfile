ARG NODE_VERSION="lts"


# ===== Node Builder =====
FROM node:${NODE_VERSION}-alpine as node_builder

RUN \
  apk add \
  --virtual "shared-dependencies" \
  "bash" \
  "ca-certificates"

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

WORKDIR /app

# Install
COPY "./.nvmrc" "."
COPY "./package.json" "."
COPY "./package-lock.json" "."
COPY "./lib/bash" "./lib/bash"
COPY "./pipeline" "./pipeline"
RUN ./pipeline/install

# Build
COPY "./tsconfig.json" "."
COPY "./src" "./src"
RUN ./pipeline/build

# Install (Production)
RUN rm -rf "./node_modules"
RUN ./pipeline/install --production


# ===== Production =====
FROM node:${NODE_VERSION}-alpine

RUN \
  apk add \
  --virtual "shared-dependencies" \
  "bash" \
  "ca-certificates"

WORKDIR /app

COPY "./.nvmrc" "."
COPY "./package.json" "."
COPY "./package-lock.json" "."
COPY "./lib/bash" "./lib/bash"
COPY "./pipeline" "./pipeline"

COPY --from=node_builder "/app/node_modules" "./node_modules"
COPY --from=node_builder "/app/build" "./build"

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
