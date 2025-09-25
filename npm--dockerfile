# BASE
FROM node:20 AS base
WORKDIR /app

# DEPENDENCIES
FROM base AS dependencies

COPY package*.json ./
RUN npm i
COPY . /app
# BUILD
FROM base AS build

COPY --from=dependencies /app/node_modules /app/node_modules
COPY . .
RUN npm run build

# PRODUCTION
FROM base AS production
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY ./.env.development /app/

# START
USER node
CMD [ "node", "dist/main.js" ]
