FROM node:12 AS base

RUN dpkg --add-architecture i386 \
    && apt-get update \
    && apt-get install wine wine32 -y

WORKDIR /app

FROM base AS node_modules

COPY package*.json ./

RUN npm ci

FROM node_modules AS build

COPY ./ .

RUN npm run build-modern

FROM build AS package

RUN cp package.json dist \
    && npm run package

FROM scratch AS artifacts

COPY --from=build /app/dist /dist
COPY --from=package /app/desktop /
