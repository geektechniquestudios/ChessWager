import firebase from "firebase/compat/app"
const ChessWager = require("../../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
require("dotenv").config({ path: "../../.env" })
const fetch = require("node-fetch")
const ethers = require("ethers")

const admin = require("firebase-admin")

const isLocal = process.env.VITE_BRANCH_ENV === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

const credential = isLocal
  ? admin.credential.cert(require(`../../../${adminSdk}`))
  : admin.credential.applicationDefault()

admin.initializeApp({ credential })
const db = admin.firestore()

interface Player {
  userId: string
  rating: number
  ratingDiff: number
}

interface GameResult {
  winner?: "white" | "black"
  status:
    | "draw"
    | "stalemate"
    | "resign"
    | "timeout"
    | "outoftime"
    | "mate"
    | "aborted"
    | "canceled"
    | "started"
  players?: {
    white: Player
    black: Player
  }
}

type Outcome = "white" | "black" | "draw" | "incomplete"

const gameIdHistoryRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("games")

export const payWinnersByGameId = async (gameId: string): Promise<void> => {
  const getOutcomeFromLichess = async (gameId: string): Promise<Outcome> => {
    const response: Response = await fetch(
      `https://lichess.org/api/game/${gameId}`,
    )
    if (!response.ok) {
      console.error("Error in lichess response:", response.statusText)
      return "incomplete"
    }
    const gameResult: GameResult = await response.json()

    if (!gameResult) {
      console.log("No game data in response")
      return "incomplete"
    }
    if (gameResult.status === "started") {
      console.log("Game is not finished")
      return "incomplete"
    }

    return gameResult?.winner ?? "draw"
  }

  const writeOutcome = (gameId: string, outcome: Outcome) => {
    console.log("Writing outcome to db: ", outcome)
    gameIdHistoryRef.doc(gameId).set({
      outcome,
    })
  }

  if (!gameId) return
  const outcome = await getOutcomeFromLichess(gameId)
  if (outcome === "incomplete") return
  console.log("Outcome: ", outcome)
  writeOutcome(gameId, outcome)
  payWinnersContractCall(gameId, outcome)
}

const contractAddress = process.env.VITE_CONTRACT_ADDRESS!
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

const overrides = {
  gasLimit: 1000000,
}

export const payWinnersContractCall = async (
  gameId: string,
  winningSide: Outcome,
) => {
  const contractDoc = gameIdHistoryRef
    .doc(gameId)
    .collection("contracts")
    .doc(contractAddress)

  const betsCollection = db.collection("lobby")

  if (
    await db
      .collection("games")
      .doc(gameId)
      .get()
      .then((doc: any) => doc.data()?.isBeingPaid)
  )
    return

  await db
    .collection("games")
    .doc(gameId)
    .set({ isBeingPaid: true }, { merge: true })

  contractDoc
    .get()
    .then(async (cDoc: any) => {
      if (!cDoc.exists) {
        console.log("No document found for gameId: ", gameId)
        return
      }
      if (!cDoc.data().needToPay) {
        console.log("No bets placed on this game, skipping contract call")
      } else if (cDoc.data().hasBeenPaid) {
        console.log("Contract has already been paid, skipping contract call")
      } else if (cDoc.data().isBeingPaid) {
        console.log("Contract is being been paid, skipping contract call")
      } else {
        console.log("paying winners for gameId: ", gameId)
        await contractDoc.set({ isBeingPaid: true })
        contract
          .payWinners(gameId, winningSide, overrides)
          .then((tx: any) => {
            console.log("tx: ", tx)
            return tx.wait()
          })
          .then((receipt: any) => {
            console.log("Transaction was mined, receipt: ", receipt)
            contractDoc.set({ hasBeenPaid: true }, { merge: true })

            const batch = db.batch()
            betsCollection
              .where("gameId", "==", gameId)
              .where("status", "in", ["approved", "funded"])
              .get()
              .then((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                  batch.update(doc.ref, {
                    payoutTransactionHash: receipt.transactionHash,
                  })
                })
                return batch.commit()
              })
              .then(() => {
                console.log("Batch operations completed.")
              })
              .catch((err: any) => {
                console.log("Batch operations failed:", err)
              })
          })
          .catch((err: any) => {
            console.log("Transaction was rejected or failed, error: ", err)
          })
          .finally(async () => {
            await contractDoc.set({ isBeingPaid: false })
          })
      }
    })
    .catch(console.error)
}
