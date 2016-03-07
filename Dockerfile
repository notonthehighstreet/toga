FROM hub.noths.com/node:4.2

RUN apt-get update && \
    apt-get install -y git-core python make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . $HOME/

EXPOSE 8080

RUN npm install --production && \
    ln -sfn /config/newrelic.js $HOME/newrelic.js
