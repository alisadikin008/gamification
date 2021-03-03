# pull the Node.js Docker image
FROM node:14-alpine

WORKDIR /gamification

COPY package*.json ./

RUN npm install

#RUN npm install -g nodemon

COPY . .

CMD ["node", "app.js"]

EXPOSE 3000