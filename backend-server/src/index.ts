import firebase from "firebase/compat/app"
// @ts-ignore
import ndjson from "ndjson"
const ChessWager = require("../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
require("dotenv").config({ path: "../.env" })
const fetch = require("node-fetch")
const ethers = require("ethers")

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

const credValue = process.env.CRED_VALUE

let cred
if (credValue === "local") {
  const serviceAccount = require("../../chesswager-bd3a6-firebase-adminsdk-tyh7t-4a018b8183.json")
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()

const callLichessLiveTv = () => {
  let lastGameId = ""
  let gameId = ""
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: any) => {
      if (obj.t === "featured") {
        // new game
        console.log("new game: ", obj.d.id)
        lastGameId = gameId === "" ? obj.d.id : gameId // if gameId is empty, set it to the new game id
        gameId = obj.d.id
        // call lichess for game data from gameId
        fetch(`https://lichess.org/api/game/${lastGameId}`)
          .then((res: any) => res.json())
          .then((gameData: any) => {
            console.log(gameData)
            // check if game has been completed
            if (gameData.hasOwnProperty("winner")) {
              console.log("game is over, checking for winners")
              const whiteWins = gameData.winner === "white"
              const blackWins = gameData.winner === "black"
              if (whiteWins) {
                console.log("white wins, updating contract")
                payWinnersContractCall(lastGameId, "white")
              } else if (blackWins) {
                console.log("black wins, updating contract")
                payWinnersContractCall(lastGameId, "black")
              }
            } else if (
              gameData.status === "draw" ||
              gameData.status === "stalemate"
            ) {
              console.log("game is a draw")
              payWinnersContractCall(lastGameId, "draw")
            } else {
              // something is wrong, game is not over is the only situation I can imagine that would end here
              console.log("game is not over : ", gameData)
            }
          })
          .catch(console.error)
      } else {
        console.log("players moving ", obj)
      }
    })
}

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contractABI = ChessWager.abi
const metamaskAddress = process.env.METAMASK_ACCOUNT_ADDRESS
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY
const rpcUrl = process.env.BSC_TESTNET_RPC_URL

console.log(metamaskAddress, metamaskKey, rpcUrl)

const Wallet = ethers.Wallet
const Contract = ethers.Contract
const utils = ethers.utils
const providers = ethers.providers

const provider = new providers.JsonRpcProvider(rpcUrl)
const wallet = new Wallet(metamaskKey, provider)
const contract = new Contract(contractAddress, contractABI, wallet)

const gameIdHistoryRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("gameIdHistory")

const payWinnersContractCall = async (gameId: string, winningSide: string) => {
  gameIdHistoryRef
    .doc(gameId)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        console.log("gameId already exists")
      } else {
        console.log("gameId is new, writing to db and paying winners")
        gameIdHistoryRef.doc(gameId).set({
          createdAt: db.FieldValue.serverTimestamp(),
        })
        contract.payWinners(gameId, winningSide)
      }
    })
}

const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

contract.on("StatusUpdate", (message: string, betId: string) => {
  console.log("StatusUpdate: ", message, betId)
  if (message === "user1 has paid") {
    lobbyRef.doc(betId).update({
      hasUser1Paid: true,
    })
  } else if (message === "user2 has paid") {
    lobbyRef.doc(betId).update({
      hasUser2Paid: true,
    })
  }
})

callLichessLiveTv()
