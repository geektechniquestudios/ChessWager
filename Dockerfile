# specifically for backend, but need .env
FROM node:14

WORKDIR /app

COPY ./backend-server ./backend-server
COPY ./src/artifacts/contracts/ChessWager.sol/ChessWager.json ./src/artifacts/contracts/ChessWager.sol/ChessWager.json

# only in local
# COPY ./chesswager-bd3a6-firebase-adminsdk-tyh7t-4a018b8183.json ./
# COPY .env .env

WORKDIR /app/backend-server

RUN npm install

CMD [ "npm", "start"]
