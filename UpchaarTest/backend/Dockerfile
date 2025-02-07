# Stage 1: Build
FROM node:16-slim  AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production
FROM node:16-slim 

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

CMD ["npm", "start"]