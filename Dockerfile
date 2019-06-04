ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}-alpine

RUN \
  apk add \
  "bash"

WORKDIR /app

COPY ./.nvmrc .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./pipeline ./pipeline

RUN ./pipeline/install --production

COPY ./build ./build

# RUN find . -type f

ENTRYPOINT [ \
  "./pipeline/run" \
  ]
