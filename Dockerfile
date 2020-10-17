
FROM node:alpine 

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

CMD ["yarn", "start"]

EXPOSE 3000
