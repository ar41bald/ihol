FROM node:13-alpine
WORKDIR /usr/app

COPY /src ./src
COPY package.json .
COPY production.env .
COPY tsconfig.json .
COPY webpack.config.js .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
