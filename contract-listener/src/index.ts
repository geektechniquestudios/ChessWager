import { Timestamp } from "firebase/firestore"
import { createClient } from "redis"
import firebase from "firebase/compat/app"
const ChessWager = require("../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
const ethers = require("ethers")
const admin = require("firebase-admin")

const redisClient = createClient({ url: "redis://redis:6379" })

let isRedisConnected = false
const attemptRedisConnection = () => {
  console.log("attempting redis connection")
  redisClient
    .connect()
    .then(() => {
      isRedisConnected = true
    })
    .catch((err) => {
      console.error(err)
      isRedisConnected = false
    })
}

require("dotenv").config({ path: "../.env" })
const isLocal = process.env.VITE_BRANCH_ENV === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

let cred
if (isLocal) {
  const serviceAccount = require(`../../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

type Bet = {
  id: string
  amount: number
  betSide: "black" | "white"
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user1DisplayName: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  user2DisplayName: string
  hasUser2Paid: boolean
  createdAt: Timestamp
  gameId: string
  timestamp: Timestamp
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
  winner?: "user1" | "user2" | "draw"
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()

const contractAddress = process.env.VITE_CONTRACT_ADDRESS
console.log(`Listening to contract address: ${contractAddress}`)
const contractABI = ChessWager.abi
const metamaskKey = process.env.VITE_METAMASK_ACCOUNT_KEY

let rpcUrl
if (process.env.VITE_BRANCH_ENV === "develop") {
  rpcUrl = process.env.VITE_AVALANCHE_TESTNET_RPC_URL
} else if (process.env.VITE_BRANCH_ENV === "test") {
  rpcUrl = process.env.VITE_AVALANCHE_TESTNET_RPC_URL
} else if (process.env.VITE_BRANCH_ENV === "main") {
  rpcUrl = process.env.VITE_AVALANCHE_MAINNET_RPC_URL
}

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
  async (message: string, betId: string, gameId: string) => {
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
      await betDoc.set(
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
      await betDoc.set(
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
      const data = doc.data() ?? {}
      if (data.hasUser1Paid && data.hasUser2Paid) {
        betDoc.set(
          {
            status: "funded",
          },
          { merge: true },
        )
      }
    })
  },
)

const usersCollectionRef = db.collection("users")

contract.on(
  "PayoutStatus",
  (
    betId: string,
    gameId: string,
    didUser1Pay: boolean,
    didUser2Pay: boolean,
    winningSide: "white" | "black" | "draw" | "none" | any,
  ) => {
    console.log(`PayoutStatus: \n\tgameId: ${gameId} \n\t betId: ${betId} 
    user1 payment: ${didUser1Pay} 
    user2 payment: ${didUser2Pay}`)

    lobbyRef
      .doc(betId)
      .get()
      .then((doc: any) => {
        if (!doc.data().hasFollowThroughBeenCounted) {
          lobbyRef.doc(betId).set(
            {
              hasFollowThroughBeenCounted: true,
              hasUser1SeenUpdate: false,
              hasUser2SeenUpdate: false,
            },
            { merge: true },
          )
        } else {
          console.log("hasFollowThroughBeenCounted already set")
          return
        }

        const bet: Bet = doc.data()
        const user1NotificationsRef = usersCollectionRef
          .doc(bet.user1Id)
          .collection("notifications")
        const user2NotificationsRef = usersCollectionRef
          .doc(bet.user2Id)
          .collection("notifications")
        const winner =
          winningSide !== "white" && winningSide !== "black"
            ? "draw"
            : winningSide === bet.betSide
            ? "user1"
            : "user2"

        if (bet.status === "funded") {
          usersCollectionRef.doc(bet.user1Id).update({
            betAcceptedCount: admin.firestore.FieldValue.increment(1),
            betFundedCount: admin.firestore.FieldValue.increment(1),
            amountBet: admin.firestore.FieldValue.increment(bet.amount),
            hasNewNotifications: true,
          })
          usersCollectionRef.doc(bet.user2Id).update({
            betAcceptedCount: admin.firestore.FieldValue.increment(1),
            betFundedCount: admin.firestore.FieldValue.increment(1),
            amountBet: admin.firestore.FieldValue.increment(
              bet.amount * bet.multiplier,
            ),
            hasNewNotifications: true,
          })

          // update player stats
          if (winner === "user1") {
            usersCollectionRef.doc(bet.user1Id).update({
              amountWon: admin.firestore.FieldValue.increment(
                bet.amount * bet.multiplier + bet.amount,
              ),
              betWinCount: admin.firestore.FieldValue.increment(1),
            })
            user1NotificationsRef.doc(bet.user1Id + Timestamp.now()).set({
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `You won ${(
                bet.amount * bet.multiplier +
                bet.amount
              ).toFixed(6)} AVAX`,
              openToMenu: "bets",
              isRead: false,
            })
            user2NotificationsRef.doc(bet.user2Id + Timestamp.now()).set({
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: "You didn't win on your recent bet",
              openToMenu: "bets",
              isRead: false,
            })
          } else if (winner === "user2") {
            usersCollectionRef.doc(bet.user2Id).update({
              amountWon: admin.firestore.FieldValue.increment(
                bet.amount * bet.multiplier + bet.amount,
              ),
              betWinCount: admin.firestore.FieldValue.increment(1),
            })
            user2NotificationsRef.doc(bet.user2Id + Timestamp.now()).set({
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `You won ${(
                bet.amount * bet.multiplier +
                bet.amount
              ).toFixed(6)} AVAX`,
              openToMenu: "bets",
              isRead: false,
            })
            user1NotificationsRef.doc(bet.user1Id + Timestamp.now()).set({
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: "You didn't win on your recent bet",
              openToMenu: "bets",
              isRead: false,
            })
          } else {
            user2NotificationsRef.doc(bet.user2Id + Timestamp.now()).set({
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `Your recent bet ended in a draw`,
              openToMenu: "bets",
              isRead: false,
            })
            user1NotificationsRef.doc(bet.user1Id + Timestamp.now()).set({
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: "Your recent bet ended in a draw",
              openToMenu: "bets",
              isRead: false,
            })
          }
        } else if (doc.data().status === "approved") {
          if (didUser1Pay) {
            // if only user1 paid
            usersCollectionRef.doc(doc.data().user1Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
              betFundedCount: admin.firestore.FieldValue.increment(1),
            })
            usersCollectionRef.doc(doc.data().user2Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
            })
          } else if (didUser2Pay) {
            // if only user2 paid
            usersCollectionRef.doc(doc.data().user1Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
            })
            usersCollectionRef.doc(doc.data().user2Id).update({
              betAcceptedCount: admin.firestore.FieldValue.increment(1),
              betFundedCount: admin.firestore.FieldValue.increment(1),
            })
          }
        }
      })
      .catch(console.error)
  },
)

setInterval(() => {
  if (!isRedisConnected) attemptRedisConnection()
  if (isRedisConnected)
    redisClient
      .get("currentTime")
      .then((time) => console.log(`Current Time: ${time}`))
      .catch((err) => {
        console.error(err)
        isRedisConnected = false
      })
}, 5000)
