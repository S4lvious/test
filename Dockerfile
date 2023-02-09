FROM node:18.10.0 AS build

# Updating base image to prevent known vunerabilities
RUN apt-get update -y

RUN mkdir -p /build
COPY --chown=node:node . /build

# Must copy .npmrc in order to get private packages
WORKDIR /build
RUN yarn && \
  yarn build

RUN yarn install --frozen-lockfile --production && yarn cache clean
USER node



FROM node:18.10.0-slim AS production

RUN apt-get update -y

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/node_modules
RUN mkdir -p /usr/src/app/dist

COPY --chown=node:node --from=build /build/dist /usr/src/app/dist
COPY --chown=node:node --from=build /build/node_modules /usr/src/app/node_modules

WORKDIR /usr/src/app

# Setting up ENVs
ENV NODE_ENV=production \
  PORT=3000 \
  DATABASE_HOST=salvatore-mysql \
  DATABASE_PORT=3306 \
  DATABASE_NAME=test \
  DATABASE_USER=root \
  DATABASE_PASSWORD=AsdNOD..02 
# Seeting up start command
CMD ["node", "--inspect=0.0.0.0:9229", "./dist/main.js"]

