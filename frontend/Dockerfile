FROM node:latest

RUN npm install webpack webpack-dev-server -g

# stash node_modules in tmp so we can copy it over on build, this prevents mounting the host node_modules
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

COPY . /src
WORKDIR /src

RUN cp -a /tmp/node_modules /src
RUN npm run production

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD [ "node", "server.js" ]
