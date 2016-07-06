FROM hub.noths.com/node:6-alpine

COPY packages $HOME/packages
COPY package.json $HOME/

RUN apk add --update \
    python \
    python-dev \
    build-base \
  && rm -rf /var/cache/apk/* \
  && npm install --production \
  && ln -sfn /config/newrelic.js $HOME/newrelic.js

COPY . $HOME/

EXPOSE 8080
