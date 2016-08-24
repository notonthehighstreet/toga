FROM mhart/alpine-node:latest

RUN apk add --update \
    git \
    openssh \
    python \
    python-dev \
    build-base \
  && rm -rf /var/cache/apk/*

COPY package.json $HOME/

RUN npm install --production
RUN ln -sfn /config/newrelic.js $HOME/newrelic.js

COPY . $HOME/

ENV NODE_ENV=production
EXPOSE 8080
CMD npm run precache -- --config './app/config/application.json' && npm start -- --config './app/config/application.json'
