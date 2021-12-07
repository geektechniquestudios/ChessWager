import firebase from "firebase/compat/app"
import ndjson from "ndjson"
import fs from "fs"
const ChessWager = require("../../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
require("dotenv").config({ path: "../../.env" })
const fetch = require("node-fetch")
const ethers = require("ethers")

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

const isLocal = process.env.BRANCH_ENV === "develop"
const adminSdk = process.env.FIREBASE_ADMIN_SDK

let cred
if (isLocal) {
  const serviceAccount = require(`../../../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })
const db = admin.firestore()

const gameIdHistoryRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("games")

const defaultTime = 15
let secondsUntilRestart = defaultTime
const currentTimeFile = "/data/currentTime.txt"
const mostRecentGameIdFile = "/data/mostRecentGameId.txt"
let mostRecentGameIdSinceLastRestart = ""
try {
  mostRecentGameIdSinceLastRestart = fs.readFileSync(
    mostRecentGameIdFile,
    "utf8",
  )
} catch (err) {
  console.error(err)
}

const callLichessLiveTv = () => {
  let gameId = ""
  let lastGameId = ""
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: any) => {
      secondsUntilRestart = defaultTime
      const currentTime = Math.floor(Date.now() / 1000)
      try {
        fs.writeFileSync(currentTimeFile, String(currentTime))
      } catch (err) {
        console.error(err)
      }

      // new game
      if (obj.t === "featured") {
        console.log("new game: ", obj.d.id)
        lastGameId = gameId === "" ? obj.d.id : gameId // if gameId is empty, set it to the new game id
        gameId = obj.d.id
        try {
          fs.writeFileSync(mostRecentGameIdFile, gameId)
        } catch (err) {
          console.error(err)
        }
        payWinnersByGameId(lastGameId)
      } else {
        console.log("players moving ", obj)
      }
    })
    .on("end", () => {
      console.log("ended stream gracefully")
    })
    .on("error", console.error)
}

const payWinnersByGameId = async (gameId: string) => {
  fetch(`https://lichess.org/api/game/${gameId}`)
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
          gameIdHistoryRef.doc(gameId).set({
            outcome: "white wins",
          })
          payWinnersContractCall(gameId, "white")
        } else if (blackWins) {
          console.log("black wins, updating contract")
          gameIdHistoryRef.doc(gameId).set({
            outcome: "black wins",
          })
          payWinnersContractCall(gameId, "black")
        }
      } else if (
        gameData.status === "draw" ||
        gameData.status === "stalemate"
      ) {
        console.log("game is a draw")
        gameIdHistoryRef.doc(gameId).set({
          outcome: gameData.status,
        })
        payWinnersContractCall(gameId, "draw")
      } else {
        console.log("game is not over : ", gameData)
      }
    })
    .catch(console.error)
}

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contractABI = ChessWager.abi
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY
const rpcUrl = process.env.BSC_TESTNET_RPC_URL

const Wallet = ethers.Wallet
const Contract = ethers.Contract
const providers = ethers.providers

const provider = new providers.JsonRpcProvider(rpcUrl)
const wallet = new Wallet(metamaskKey, provider)
const contract = new Contract(contractAddress, contractABI, wallet)

const payWinnersContractCall = async (gameId: string, winningSide: string) => {
  await new Promise((resolve) => setTimeout(resolve, 8000))
  gameIdHistoryRef
    .doc(gameId)
    .get()
    .then((doc: any) => {
      if (
        doc.exits &&
        !doc.data().haveWinnersBeenPaid &&
        doc.data().shouldPayout
      ) {
        console.log("gameId is new, writing to db and paying winners")
        contract.payWinners(gameId, winningSide)
        gameIdHistoryRef.doc(gameId).set({
          haveWinnersBeenPaid: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
      } else {
        console.log("gameId has already been paid out")
      }
    })
    .catch(console.error)
}

payWinnersByGameId(mostRecentGameIdSinceLastRestart)
callLichessLiveTv()

setInterval(() => {
  console.log(secondsUntilRestart)
  secondsUntilRestart--

  if (secondsUntilRestart <= 0) {
    console.log("\ntimeout detected, restarting")
    process.exit(0)
  }
}, 1000)
