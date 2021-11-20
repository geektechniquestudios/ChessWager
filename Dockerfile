# specifically for backend, but need .env
FROM node:14

WORKDIR /app

COPY ./backend-server ./backend-server
COPY ./src/artifacts/contracts/ChessWager.sol/ChessWager.json ./src/artifacts/contracts/ChessWager.sol/ChessWager.json

# only in local
# COPY ./chess-wager-test-firebase-adminsdk-hl438-a310055ae5.json ./
# COPY .env .env

WORKDIR /app/backend-server

RUN npm install

CMD [ "npm", "start"]
