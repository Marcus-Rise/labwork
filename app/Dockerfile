FROM node:11.5-alpine

RUN mkdir -p /usr/src/app \
	&& yarn global add @vue/cli -g

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN apk add --no-cache --virtual .gyp \
		python \
		make \
		g++

RUN yarn

COPY . ./

CMD yarn build && cp -r ./dist/* /static &&  cp ./package.json ./dist && yarn package-linux && cp -r packaged-* /desktop && yarn serve
