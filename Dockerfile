FROM mhart/alpine-node:latest

RUN apk add --update \
    git \
    openssh \
    python \
    python-dev \
    build-base \
  && rm -rf /var/cache/apk/*

RUN mkdir -p $HOME/service/toga

COPY . $HOME/service/toga

WORKDIR $HOME/service/toga
RUN npm install --production
RUN ln -sfn /config/newrelic.js $HOME/newrelic.js

ENV NODE_ENV=production
EXPOSE 8080
CMD npm start -- --config './app/config/dockerOverrides.json'
