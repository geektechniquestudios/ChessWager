# specifically for backend, but need .env, so run ../.
FROM node:14

WORKDIR /app

# COPY package*.json ./

# RUN npm install

COPY . .

WORKDIR /app/backend-server

RUN npm install

CMD [ "npm", "start"]
