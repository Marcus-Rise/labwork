FROM node:12 AS base

RUN dpkg --add-architecture i386 \
    && echo "deb http://download.mono-project.com/repo/debian beta main" | tee /etc/apt/sources.list.d/mono-xamarin-beta.list \
    && apt-get update \
    && apt-get install \
        mono-xsp4 \
        wine \
        wine32 \
        wine64 \
        fakeroot \
        -y --allow-unauthenticated

WORKDIR /app

FROM base AS node_modules

COPY package*.json ./

RUN npm ci

FROM node_modules AS build

COPY ./public ./public
COPY ./src ./src
COPY ./tests ./tests
COPY ./.browserslistrc ./
COPY ./*.js* ./
COPY ./*.ts ./

RUN npm run build-modern

FROM build AS package

RUN cp package.json dist \
    && npm run package
RUN npm run create-installer-debian
RUN npm run create-installer-win
RUN zip -r "dist.zip" dist
RUN for i in */desktop; do zip -r "${i%/}.zip" "$i"; done

FROM scratch AS artifacts

COPY --from=build /app/dist /dist
COPY --from=package /app/desktop /
