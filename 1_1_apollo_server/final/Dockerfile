FROM node:18

WORKDIR /usr/src/app

COPY src ./src
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm run compile

CMD ["./dist/index.js"]
