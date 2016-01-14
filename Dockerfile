FROM hub.noths.com/node:4.2

EXPOSE 8080

RUN apt-get update && \
    apt-get install -y git-core python make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD . $HOME/

RUN npm install
