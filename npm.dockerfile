FROM node:20 AS base
WORKDIR /app



FROM base AS dependencies

COPY package*.json ./
RUN npm i
COPY . /app



FROM base AS build

COPY --from=dependencies /app/node_modules /app/node_modules
COPY . .
RUN npm run build



FROM base AS production
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY ./.env.development /app/



USER node
CMD [ "node", "dist/main.js" ]
