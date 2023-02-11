FROM node:16

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . .
# RUN nest build
CMD [ "nest", "start" ]