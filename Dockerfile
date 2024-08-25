FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run build
RUN npm start

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]