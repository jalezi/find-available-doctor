FROM node:23 AS builder

WORKDIR /app
ADD . /app
RUN yarn
RUN yarn run build

FROM caddy:2-alpine

WORKDIR /app
COPY --from=builder /app/build /app
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
