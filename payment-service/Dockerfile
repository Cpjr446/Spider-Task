# Dockerfile for Payment Service
FROM node:18

# Create app directory
WORKDIR /Spider-Task/payment-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
