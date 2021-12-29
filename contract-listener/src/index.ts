import fs from "fs"
import firebase from "firebase/compat/app"
const ChessWager = require("../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
const ethers = require("ethers")
const admin = require("firebase-admin")

require("dotenv").config({ path: "../.env" })
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

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contractABI = ChessWager.abi
const metamaskAddress = process.env.METAMASK_ACCOUNT_ADDRESS
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY

let rpcUrl
if (process.env.BRANCH_ENV === "develop") {
  rpcUrl = process.env.AVALANCHE_TESTNET_RPC_URL
} else if (process.env.BRANCH_ENV === "test") {
  rpcUrl = process.env.AVALANCHE_TESTNET_RPC_URL
} else if (process.env.BRANCH_ENV === "main") {
  rpcUrl = process.env.AVALANCHE_MAINNET_RPC_URL
}
console.log(metamaskAddress)

const Wallet = ethers.Wallet
const Contract = ethers.Contract
const providers = ethers.providers

const provider = new providers.JsonRpcProvider(rpcUrl)
const wallet = new Wallet(metamaskKey, provider)
const contract = new Contract(contractAddress, contractABI, wallet)

const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

const gameIdHistoryRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("games")

contract.on(
  "BetPlacedStatus",
  (message: string, betId: string, gameId: string) => {
    console.log("BetPlacedStatus: ", message, betId)

    const gameDoc = gameIdHistoryRef.doc(gameId)
    gameDoc.collection("contracts").doc(contractAddress).set(
      {
        needToPay: true,
        hasBeenPaid: false,
      },
      { merge: true },
    )

    const betDoc = lobbyRef.doc(betId)

    if (message === "user1 has paid") {
      betDoc.set(
        {
          hasUser1Paid: true,
        },
        { merge: true },
      )
      gameDoc.set(
        {
          hasUser1Paid: true,
        },
        { merge: true },
      )
    } else if (message === "user2 has paid") {
      betDoc.set(
        {
          hasUser2Paid: true,
        },
        { merge: true },
      )
      gameDoc.set(
        {
          hasUser2Paid: true,
        },
        { merge: true },
      )
    } else {
      console.log("unknown message: ", message)
    }

    betDoc.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data()!
        if (data.hasUser1Paid && data.hasUser2Paid) {
          betDoc.set({
            status: "funded",
          })
        }
      }
    })
  },
)

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

    db.runTransaction(async (transaction: any) => {
      transaction
        .get(lobbyRef.doc(betId))
        .then((doc: any) => {
          if (!doc.data().hasFollowThroughBeenCounted) {
            transaction.update(lobbyRef.doc(betId), {
              hasFollowThroughBeenCounted: true,
            })
          } else {
            return
          }
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
    })
  },
)

const currentTimeFile = "/data/currentTime.txt"

setInterval(() => {
  let currentTime
  try {
    currentTime = fs.readFileSync(currentTimeFile, "utf8")
  } catch (err) {
    console.error(err)
  }
  console.log("currentTime: ", currentTime)
}, 5000)
