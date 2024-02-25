FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 19000
EXPOSE 19001

CMD ["npm", "start"] 