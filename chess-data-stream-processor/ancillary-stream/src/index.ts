// @ts-ignore
import ndjson from "ndjson"
import fs from "fs"
import { payWinnersByGameId } from "../../payment-processor/src/index"
require("dotenv").config({ path: "../../.env" })

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

const isLocal = process.env.VITE_BRANCH_ENV === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

let cred
if (isLocal) {
  const serviceAccount = require(`../../../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

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

const payWinners = async (gameId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 8000))
  payWinnersByGameId(gameId)
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
        payWinners(lastGameId)
      } else {
        console.log("players moving ", obj)
      }
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
