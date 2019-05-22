FROM alpine:latest

RUN \
  apk add \
  "bash"

WORKDIR /app

COPY ./pipeline ./pipeline

RUN ./pipeline/install

# RUN find . -type f

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
