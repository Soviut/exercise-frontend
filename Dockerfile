FROM node:12.14.1-alpine

WORKDIR /src

COPY ./package* ./
RUN yarn install

COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]
