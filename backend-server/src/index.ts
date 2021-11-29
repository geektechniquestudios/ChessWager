import firebase from "firebase/compat/app"
import ndjson from "ndjson"
const ChessWager = require("../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
require("dotenv").config({ path: "../.env" })
const fetch = require("node-fetch")
const ethers = require("ethers")

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

const isLocal = process.env.BRANCH_ENV === "develop"
const adminSdk = process.env.FIREBASE_ADMIN_SDK

let cred
if (isLocal) {
  const serviceAccount = require(`../../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()

const gameIdHistoryRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("games")

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

console.log(metamaskAddress, metamaskKey, rpcUrl)

const Wallet = ethers.Wallet
const Contract = ethers.Contract
const providers = ethers.providers

const provider = new providers.JsonRpcProvider(rpcUrl)
const wallet = new Wallet(metamaskKey, provider)
const contract = new Contract(contractAddress, contractABI, wallet)

const payWinnersContractCall = async (gameId: string, winningSide: string) => {
  gameIdHistoryRef
    .doc(gameId)
    .get()
    .then((doc: any) => {
      if (doc.exits && !doc.data().haveWinnersBeenPaid) {
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
}

const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

contract.on("BetPlacedStatus", (message: string, betId: string) => {
  console.log("BetPlacedStatus: ", message, betId)

  if (message === "user1 has paid") {
    lobbyRef.doc(betId).update({
      hasUser1Paid: true,
    })
    gameIdHistoryRef.doc(betId).set({
      hasUser1Paid: true,
    })
  } else if (message === "user2 has paid") {
    lobbyRef.doc(betId).update({
      hasUser2Paid: true,
    })
    gameIdHistoryRef.doc(betId).set({
      hasUser2Paid: true,
    })
  } else {
    console.log("unknown message: ", message)
  }
})

const userCollectionRef = db.collection("users")

contract.on(
  "PayoutStatus",
  (
    betId: string,
    gameId: string,
    didUser1Pay: boolean,
    didUser2Pay: boolean,
  ) => {
    console.log(`PayoutStatus: \n\tgameId: ${gameId} \n\t betId: ${betId} 
    user1 payment: ${didUser1Pay} 
    user2 payment: ${didUser2Pay}`)

    lobbyRef
      .doc(betId)
      .get()
      .then((doc: any) => {
        if (doc.data().status === "approved") {
          // if both users paid
          if (didUser1Pay && didUser2Pay) {
            userCollectionRef.doc(doc.data().user1Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
              betFundedCount: admin.firestore.FieldValue.increment(1),
            })
            userCollectionRef.doc(doc.data().user2Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
              betFundedCount: admin.firestore.FieldValue.increment(1),
            })
          } else if (didUser1Pay) {
            // if only user1 paid
            userCollectionRef.doc(doc.data().user1Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
              betFundedCount: admin.firestore.FieldValue.increment(1),
            })
            userCollectionRef.doc(doc.data().user2Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
            })
          } else if (didUser2Pay) {
            // if only user2 paid
            userCollectionRef.doc(doc.data().user1Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
            })
            userCollectionRef.doc(doc.data().user2Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
              betFundedCount: admin.firestore.FieldValue.increment(1),
            })
          }
        }
      })
      .catch(console.error)
  },
)

callLichessLiveTv()
