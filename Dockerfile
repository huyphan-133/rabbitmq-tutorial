FROM node:alpine
WORKDIR /home/node/
RUN npm i amqplib
COPY . .