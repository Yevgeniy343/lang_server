FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1000

ENV DB_USER=lang
ENV DB_PASSWORD=8IZ7kuOU9WANHBQl
ENV APP=fjbgswbugzieiaho

CMD ["npm", "start"]
