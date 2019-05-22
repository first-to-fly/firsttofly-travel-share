ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}-alpine

RUN \
  apk add \
  "bash"

WORKDIR /app

COPY ./pipeline ./pipeline
COPY ./package.json .
COPY ./package-lock.json .

RUN ./pipeline/install --production

COPY ./src ./src

# RUN find . -type f

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
