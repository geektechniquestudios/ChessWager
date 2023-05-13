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

const defaultTime = 15

let secondsUntilRestart = defaultTime
let mostRecentGameIdSinceLastRestart = ""

if (!isRedisConnected) attemptRedisConnection()
redisClient
  .get("mostRecentGameId")
  .then((gameId) => {
    mostRecentGameIdSinceLastRestart = gameId ?? ""
  })
  .catch((err) => {
    console.error(err)
    isRedisConnected = false
  })

const payWinnersWithDelay = async (gameId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 30000))
  payWinnersByGameId(gameId)
}

const callLichessLiveTv = () => {
  let gameId = ""
  let lastGameId = ""
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: Res) => {
      secondsUntilRestart = defaultTime
      const currentTime = Math.floor(Date.now() / 1000)

      if (!isRedisConnected) attemptRedisConnection()
      redisClient.set("currentTime", currentTime).catch((err) => {
        console.error(err)
        isRedisConnected = false
      })

      // new game
      if (obj.t === "featured") {
        const featured = obj.d as Featured
        console.log("new game: ", featured.id)
        lastGameId = gameId === "" ? featured.id : gameId // if gameId is empty, set it to the new game id
        gameId = featured.id
        if (!isRedisConnected) attemptRedisConnection()
        redisClient.set("mostRecentGameId", gameId).catch((err) => {
          console.error(err)
          isRedisConnected = false
        })
        payWinnersWithDelay(lastGameId)
      } else console.log("players moving ", obj.d.fen)
    })
    .on("end", () => {
      console.log("ended stream gracefully")
    })
    .on("error", console.error)
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
