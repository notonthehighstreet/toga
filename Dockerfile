FROM mhart/alpine-node:latest

RUN apk add --update \
    git \
    openssh \
    python \
    python-dev \
    build-base \
  && rm -rf /var/cache/apk/*

RUN mkdir -p $HOME/service/toga
WORKDIR $HOME/service/toga

COPY package.json ./

RUN npm install --production

COPY . ./

ENV NODE_ENV=production
EXPOSE 8080
CMD npm start -- --config './app/config/dockerOverrides.json'
