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

const defaultTime = 10
let secondsUntilRestartCheck = defaultTime
const currentTimeFile = "/data/currentTime.txt"
let currentTime = Math.floor(Date.now() / 1000)

// const shouldPayoutFile = "/data/payout.txt"

const callLichessLiveTv = () => {
  let lastGameId = ""
  let gameId = ""
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: any) => {
      currentTime = Math.floor(Date.now() / 1000)
      secondsUntilRestartCheck = defaultTime
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
                gameIdHistoryRef.doc(lastGameId).set({
                  outcome: "white wins",
                })
                payWinnersContractCall(lastGameId, "white")
              } else if (blackWins) {
                console.log("black wins, updating contract")
                gameIdHistoryRef.doc(lastGameId).set({
                  outcome: "black wins",
                })
                payWinnersContractCall(lastGameId, "black")
              }
            } else if (
              gameData.status === "draw" ||
              gameData.status === "stalemate"
            ) {
              console.log("game is a draw")
              gameIdHistoryRef.doc(lastGameId).set({
                outcome: gameData.status,
              })
              payWinnersContractCall(lastGameId, "draw")
            } else {
              console.log("game is not over : ", gameData)
            }
          })
          .catch(console.error)
      } else {
        console.log("players moving ", obj)
        // read from currentTime.txt
      }
    })
    .on("end", () => {
      console.log("ended stream gracefully")
    })
    .on("error", console.error)
}

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contractABI = ChessWager.abi
const metamaskAddress = process.env.METAMASK_ACCOUNT_ADDRESS
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY
const rpcUrl = process.env.BSC_TESTNET_RPC_URL

console.log(metamaskAddress)

const Wallet = ethers.Wallet
const Contract = ethers.Contract
const providers = ethers.providers

const provider = new providers.JsonRpcProvider(rpcUrl)
const wallet = new Wallet(metamaskKey, provider)
const contract = new Contract(contractAddress, contractABI, wallet)

const payWinnersContractCall = async (gameId: string, winningSide: string) => {
  // let shouldPayout = "true"
  // try {
  //   shouldPayout = fs.readFileSync(shouldPayoutFile, "utf8")
  // } catch (err) {
  //   console.error(err)
  //   shouldPayout = "true"
  // }
  // if (shouldPayout === "false") {
  //   console.log("No bets to payout, skipping payout method")
  //   return
  // }

  // try {
  //   fs.writeFileSync(shouldPayoutFile, "false")
  // } catch (err) {
  //   console.error(err)
  // }


  gameIdHistoryRef
    .doc(gameId)
    .get()
    .then((doc: any) => {
      if (doc.exits && !doc.data().haveWinnersBeenPaid && doc.data().shouldPayout === true) {
        console.log("gameId has already been paid out")
      } else {
        console.log("gameId is new, writing to db and paying winners")
        gameIdHistoryRef.doc(gameId).set({
          haveWinnersBeenPaid: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
        contract.payWinners(gameId, winningSide)
      }
    })
    .catch(console.error)
}

callLichessLiveTv()

setInterval(() => {
  if (secondsUntilRestartCheck > 0) {
    console.log(secondsUntilRestartCheck)
    secondsUntilRestartCheck--
  } else {
    console.log("\ntimeout detected, checking latest entry")
    let lastStoredTime = 0
    try {
      lastStoredTime = Number(fs.readFileSync(currentTimeFile, "utf8"))
    } catch (err) {
      console.error(err)
    }

    if (currentTime < Number(lastStoredTime) - 20) {
      console.log("Primary steam is behind, restarting")
      process.exit(0)
    } else {
      console.log(
        "Primary steam is up to date, player is taking a while to move",
      )
    }
    secondsUntilRestartCheck = defaultTime
  }
}, 1000)
