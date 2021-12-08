import firebase from "firebase/compat/app"
const ChessWager = require("../../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
require("dotenv").config({ path: "../../.env" })
const fetch = require("node-fetch")
const ethers = require("ethers")

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



export const payWinnersByGameId = async (gameId: string) => {
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

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!
const contractABI = ChessWager.abi
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY
const rpcUrl = process.env.BSC_TESTNET_RPC_URL

const Wallet = ethers.Wallet
const Contract = ethers.Contract
const providers = ethers.providers

const provider = new providers.JsonRpcProvider(rpcUrl)
const wallet = new Wallet(metamaskKey, provider)
const contract = new Contract(contractAddress, contractABI, wallet)

const overrides = {
  gasLimit: 1000000,
}

export const payWinnersContractCall = async (gameId: string, winningSide: string) => {
  await new Promise((resolve) => setTimeout(resolve, 8000))
  gameIdHistoryRef
    .doc(gameId)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        const contractMap = doc.data().contractMap ?? {}
        if (contractMap[contractAddress]) {
          console.log(
            "contract has already been paid, or is not in the contract map",
          )
        } else if (!contractMap[contractAddress]) {
          console.log("paying winners for gameId: ", gameId)
          const contractMap = doc.data().contractMap ?? {}
          contractMap[contractAddress] = true
          gameIdHistoryRef.doc(gameId).update({
            contractMap,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          })
          contract
            .payWinners(gameId, winningSide, overrides)
            .then((tx: any) => {
              console.log("tx: ", tx)
            })
            .catch((err: any) => {
              console.log("err: ", err)
            })
        }
      } else {
        console.error("no such game document")
      }
    })
    .catch(console.error)
}
