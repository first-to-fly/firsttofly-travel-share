FROM alpine:latest

RUN \
  apk add \
  "bash"

WORKDIR /app

COPY ./lib/bash ./lib/bash
COPY ./pipeline ./pipeline

RUN ./pipeline/install --production

# RUN find . -type f

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
