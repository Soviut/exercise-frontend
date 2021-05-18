FROM node:12.18.3-alpine

WORKDIR /src

COPY ./package* ./
RUN yarn install

COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]
