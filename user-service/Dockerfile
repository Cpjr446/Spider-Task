FROM node:18

# Create app directory
WORKDIR /Spider-Task/user-service

COPY package*.json ./
RUN npm install

COPY . .

# Expose the port
EXPOSE 3000

CMD ["node", "index.js"]
