import { Timestamp } from "firebase/firestore"
import { createClient } from "redis"
import firebase from "firebase/compat/app"
const ChessWager = require("../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
const ethers = require("ethers")
const admin = require("firebase-admin")

const redisClient = createClient({ url: "redis://redis:6379" })

let isRedisConnected = false
let isLocked = false
const attemptRedisConnection = () => {
  console.log("Attempting Redis connection...")
  if (isLocked) return
  isLocked = true
  redisClient
    .connect()
    .then(() => {
      isRedisConnected = true
      console.log("Redis connection established.")
    })
    .catch((err) => {
      console.error(err)
      isRedisConnected = false
    })
    .finally(() => {
      isLocked = false
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
  status: "ready" | "pending" | "approved" | "funded"
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
  createdAt?: Timestamp
  gameId: string
  timestamp: Timestamp
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
  winner?: "user1" | "user2" | "draw"
  hasUser1SeenUpdate?: boolean
  hasUser2SeenUpdate?: boolean
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
    const betDoc = lobbyRef.doc(betId)
    const batch = db.batch()

    batch.set(
      gameDoc.collection("contracts").doc(contractAddress),
      {
        needToPay: true,
        hasBeenPaid: false,
      },
      { merge: true },
    )

    if (message === "user1 has paid") {
      batch.set(
        betDoc,
        {
          hasUser1Paid: true,
        },
        { merge: true },
      )
      batch.set(
        gameDoc,
        {
          hasUser1Paid: true,
        },
        { merge: true },
      )
    } else if (message === "user2 has paid") {
      batch.set(
        betDoc,
        {
          hasUser2Paid: true,
        },
        { merge: true },
      )
      batch.set(
        gameDoc,
        {
          hasUser2Paid: true,
        },
        { merge: true },
      )
    } else {
      console.log("unknown message: ", message)
    }

    await batch.commit().catch(console.error)
    betDoc
      .get()
      .then((doc) => {
        const data = doc.data() ?? {}
        if (data.hasUser1Paid && data.hasUser2Paid) {
          betDoc
            .set(
              {
                status: "funded",
              },
              { merge: true },
            )
            .catch(console.error)
        }
      })
      .catch(console.error)
  },
)

const usersCollectionRef = db.collection("users")

contract.on(
  "PayoutStatus",
  async (
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

        const batch = db.batch()
        if (
          didUser1Pay &&
          bet.hasUser1Paid &&
          didUser2Pay &&
          bet.hasUser2Paid
        ) {
          // Update player stats
          batch.update(usersCollectionRef.doc(bet.user1Id), {
            betAcceptedCount: admin.firestore.FieldValue.increment(1),
            betFundedCount: admin.firestore.FieldValue.increment(1),
            amountBet: admin.firestore.FieldValue.increment(bet.amount),
            hasNewNotifications: true,
          })
          batch.update(usersCollectionRef.doc(bet.user2Id), {
            betAcceptedCount: admin.firestore.FieldValue.increment(1),
            betFundedCount: admin.firestore.FieldValue.increment(1),
            amountBet: admin.firestore.FieldValue.increment(
              bet.amount * bet.multiplier,
            ),
            hasNewNotifications: true,
          })

          const winnerAmount = bet.amount * bet.multiplier + bet.amount
          if (winner === "user1") {
            const timestamp = Timestamp.now()
            batch.update(usersCollectionRef.doc(bet.user1Id), {
              amountWon: admin.firestore.FieldValue.increment(
                bet.amount * bet.multiplier + bet.amount,
              ),
              betWinCount: admin.firestore.FieldValue.increment(1),
            })
            batch.set(user1NotificationsRef.doc(bet.user2Id + timestamp), {
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `You won ${winnerAmount.toFixed(
                6,
              )} AVAX from your bet against ${bet.user2DisplayName}`,
              openToMenu: "bet",
              isRead: false,
              betId,
            })
            batch.set(user2NotificationsRef.doc(bet.user2Id + timestamp), {
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `You didn't win on your bet with ${bet.user1DisplayName}`,
              openToMenu: "bet",
              isRead: false,
              betId,
            })
          } else if (winner === "user2") {
            batch.update(usersCollectionRef.doc(bet.user2Id), {
              amountWon: admin.firestore.FieldValue.increment(winnerAmount),
              betWinCount: admin.firestore.FieldValue.increment(1),
            })

            const timestamp = Timestamp.now()
            batch.set(user1NotificationsRef.doc(bet.user1Id + timestamp), {
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `You didn't win on your bet with ${bet.user2DisplayName}`,
              openToMenu: "bet",
              isRead: false,
              betId,
            })

            batch.set(user2NotificationsRef.doc(bet.user2Id + timestamp), {
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `You won ${winnerAmount.toFixed(
                6,
              )} AVAX from your bet against ${bet.user1DisplayName}`,
              openToMenu: "bet",
              isRead: false,
              betId,
            })
          } else {
            const timestamp = Timestamp.now()
            batch.set(user1NotificationsRef.doc(bet.user1Id + timestamp), {
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `Your bet with ${bet.user2DisplayName} ended in a draw and was refunded`,
              openToMenu: "bet",
              isRead: false,
              betId,
            })

            batch.set(user2NotificationsRef.doc(bet.user2Id + timestamp), {
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              text: `Your bet with ${bet.user1DisplayName} ended in a draw and was refunded`,
              openToMenu: "bet",
              isRead: false,
              betId,
            })
          }
        } else if (didUser1Pay && bet.hasUser1Paid) {
          batch.update(usersCollectionRef.doc(bet.user1Id), {
            hasNewNotifications: true,
          })
          batch.update(usersCollectionRef.doc(bet.user2Id), {
            betAcceptedCount: admin.firestore.FieldValue.increment(1),
            hasNewNotifications: true,
          })
          batch.set(user1NotificationsRef.doc(bet.user1Id + Timestamp.now()), {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            text: `Your bet with ${bet.user2DisplayName} was refunded because they failed to pay`,
            openToMenu: "bet",
            isRead: false,
            betId,
          })
          batch.set(user2NotificationsRef.doc(bet.user2Id + Timestamp.now()), {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            text: `Your payment wasn't received on your recent bet with ${bet.user1DisplayName}`,
            openToMenu: "bet",
            isRead: false,
            betId,
          })
        } else if (didUser2Pay && bet.hasUser2Paid) {
          batch.update(usersCollectionRef.doc(bet.user1Id), {
            betAcceptedCount: admin.firestore.FieldValue.increment(1),
            hasNewNotifications: true,
          })
          batch.update(usersCollectionRef.doc(bet.user2Id), {
            hasNewNotifications: true,
          })
          batch.set(user2NotificationsRef.doc(bet.user2Id + Timestamp.now()), {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            text: `Your bet with ${bet.user1DisplayName} was refunded because they failed to pay`,
            openToMenu: "bet",
            isRead: false,
            betId,
          })
          batch.set(user1NotificationsRef.doc(bet.user1Id + Timestamp.now()), {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            text: `Your payment wasn't received on your recent bet with ${bet.user2DisplayName}`,
            openToMenu: "bet",
            isRead: false,
            betId,
          })
        }

        batch.commit()
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
