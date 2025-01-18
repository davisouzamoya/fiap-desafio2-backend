FROM node:alpine

WORKDIR /usr/src

COPY packag*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]