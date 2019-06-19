ARG VERSION="latest"


# ===== Builder =====
FROM alpine:${VERSION} as builder

WORKDIR /app

RUN \
  apk add \
  --virtual "shared-dependencies" \
  "bash"

# Core
COPY "./lib/bash/core.sh" "./lib/bash/core.sh"

# Install
COPY "./pipeline/install" "./pipeline/install"
RUN ./pipeline/install

# Build
COPY "./pipeline/build" "./pipeline/build"
RUN ./pipeline/build


# ===== Production =====
FROM alpine:${VERSION}

WORKDIR /app

RUN \
  apk add \
  --virtual "shared-dependencies" \
  "bash"

# Core
COPY "./lib/bash/core.sh" "./lib/bash"

# RUN
COPY "./pipeline/run" "./pipeline/run"

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
