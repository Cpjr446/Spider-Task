# Dockerfile for Ride Service
FROM node:18

# Working directory
WORKDIR /Spider-Task/ride-service

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "index.js"]
