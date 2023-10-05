FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 1000

CMD ["npm", "start"]