FROM node:lts as build1
WORKDIR /app
COPY client/package.json .
RUN yarn --frozen-lockfile && yarn cache clean
COPY client .
RUN yarn build

FROM node:lts as build2 
WORKDIR /app
COPY server/package.json .
RUN yarn --frozen-lockfile && yarn cache clean
COPY server .
RUN yarn build

FROM node:lts
WORKDIR /app
COPY --from=build1 /app ./client
COPY --from=build2 /app ./server
RUN npm i concurrently -g
EXPOSE 3000
CMD  concurrently "cd client && yarn start" "cd server && yarn start"