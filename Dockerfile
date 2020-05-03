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

RUN mkdir static \
    && cp -r dist/* static \
    && cp package.json dist

RUN npm run package-linux
RUN npm run package-win

RUN rm -rf desktop \
    && mkdir desktop \
    && cp -r packaged-* desktop

FROM scratch AS artifacts

COPY --from=build /app/dist /web-app
COPY --from=package /app/desktop /
