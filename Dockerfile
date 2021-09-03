FROM node:16-alpine

RUN mkdir /app
COPY ../../Downloads/xtracker /app

WORKDIR /app

RUN npm install

CMD [ "npm", "start" ]
