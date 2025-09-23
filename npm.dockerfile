# Development stage
FROM node:20 AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

ENV NODE_ENV=development

USER node



# Build stage
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npm ci

ENV NODE_ENV=production

USER node



# Production stage
FROM node:20 AS production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]