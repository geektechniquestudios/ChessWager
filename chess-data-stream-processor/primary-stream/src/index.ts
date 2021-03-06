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

const defaultTime = 10
let secondsUntilRestartCheck = defaultTime
const currentTimeFile = "/data/currentTime.txt"
let currentTime = Math.floor(Date.now() / 1000)

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
        payWinnersByGameId(lastGameId)
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
