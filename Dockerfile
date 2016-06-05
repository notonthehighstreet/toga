FROM hub.noths.com/node:4.2

COPY packages $HOME/packages
COPY package.json $HOME/

RUN apt-get update && \
    apt-get install -y git-core python make g++ && \
    npm install --production && \
    apt-get purge -y make g++ git-core && \
    apt-get -y autoremove --purge && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    ln -sfn /config/newrelic.js $HOME/newrelic.js

COPY . $HOME/

EXPOSE 8080
