FROM node:18

WORKDIR /user/app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install
RUN npm run build


CMD ["npm", "start"]

