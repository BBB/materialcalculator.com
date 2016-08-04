FROM mhart/alpine-node:5

# install python for node-sass
RUN apk add --no-cache \
    python \
    python-dev \
    py-pip \
    build-base

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

RUN npm run build && \
  npm prune --production

EXPOSE 8080

CMD []
ENTRYPOINT ["npm", "start"]
