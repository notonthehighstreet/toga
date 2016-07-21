FROM hub.noths.com/node:6-alpine

RUN apk add --update \
    python \
    python-dev \
    build-base \
  && rm -rf /var/cache/apk/*

COPY packages $HOME/packages
COPY package.json $HOME/

RUN npm install --production
RUN ln -sfn /config/newrelic.js $HOME/newrelic.js

COPY . $HOME/

EXPOSE 8080
