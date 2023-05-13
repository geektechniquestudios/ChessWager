import { payWinnersByGameId } from "./../../payment-processor/src/index"
// @ts-ignore
import ndjson from "ndjson"
import { createClient } from "redis"
import { Featured, Res } from "./ChessGameStream"
require("dotenv").config({ path: "../../.env" })

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

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

const isLocal = process.env.VITE_BRANCH_ENV === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

const cred = isLocal
  ? admin.credential.cert(require(`../../../${adminSdk}`))
  : admin.credential.applicationDefault()

admin.initializeApp({ credential: cred })

const defaultTime = 10
let secondsUntilRestartCheck = defaultTime

let currentTime = Math.floor(Date.now() / 1000)

const payWinnersWithDelay = async (gameId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 60000))
  payWinnersByGameId(gameId)
}

const callLichessLiveTv = () => {
  let lastGameId = ""
  let gameId = ""
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: Res) => {
      currentTime = Math.floor(Date.now() / 1000)
      secondsUntilRestartCheck = defaultTime

      // new game
      if (obj.t === "featured") {
        const featured = obj.d as Featured
        console.log("new game: ", featured.id)
        lastGameId = gameId === "" ? featured.id : gameId // if gameId is empty, set it to the new game id
        gameId = featured.id
        payWinnersWithDelay(lastGameId)
      } else {
        console.log("players moving ", obj.d.fen)
      }
    })
    .on("end", () => {
      console.log("ended stream gracefully")
    })
    .on("error", console.error)
}

callLichessLiveTv()

setInterval(async () => {
  if (secondsUntilRestartCheck > 0) {
    console.log(secondsUntilRestartCheck)
    secondsUntilRestartCheck--
  } else {
    console.log("\ntimeout detected, checking latest entry")

    let lastStoredTime = 0
    if (!isRedisConnected) attemptRedisConnection()
    await redisClient
      .get("currentTime")
      .then((currentTime) => (lastStoredTime = Number(currentTime) ?? 0))
      .catch((err) => {
        console.error(err)
        isRedisConnected = false
      })

    if (currentTime < lastStoredTime - 20) {
      console.log("Primary stream is behind, restarting")
      process.exit(0)
    } else {
      console.log(
        "Primary stream is up to date, player is taking a while to move",
      )
    }
    secondsUntilRestartCheck = defaultTime
  }
}, 1000)
