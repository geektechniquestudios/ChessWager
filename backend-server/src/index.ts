// import "../src/config"
// @ts-ignore
import ndjsonStream from "can-ndjson-stream"
import firebase from "firebase/compat/app"
import { IncomingMessage } from "http"
// @ts-ignore
import fetch from "node-fetch"
const axios = require("axios").default
const ndjson = require("ndjson")
const hyperquest = require("hyperquest")

const admin = require("firebase-admin")

admin.initializeApp({
  apiKey: "AIzaSyBMMVmxsODGQh_bV7SuKu_m0sJ6ErGe8w0",
  authDomain: "chesswager-bd3a6.firebaseapp.com",
  projectId: "chesswager-bd3a6",
  storageBucket: "chesswager-bd3a6.appspot.com",
  messagingSenderId: "257666737049",
  appId: "1:257666737049:web:944d66c9bbee7d7f38a908",
  measurementId: "G-DWKJ3KBJP3",
})
const db = admin.firestore()
const lobbyCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

const clearActiveBets = () => {
  console.log("@todo clearing bets")
}

const callLichessLiveTv = () => {
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: any) => {
      if (obj.t === "featured") {
        clearActiveBets()
      } else {
        console.log("players moving")
      }
    })

  // axios({ method: 'get', url: 'https://lichess.org/api/tv/feed', responseType: 'stream' })
  // // fetch("https://lichess.org/api/tv/feed")
  //   .then((resStream: IncomingMessage) => {
  //     resStream.readabl
  //   })
  //   .then((stream: any) => {
  //     const streamReader = stream.getReader()
  //     streamReader.read().then(async (res: any) => {
  //       while (!res || !res.done) {
  //         res = await streamReader.read()
  //         console.log(res.value)
  //       }
  //     })
  // .then((stream: any) => {
  //   const streamReader = stream.getReader()
  //   streamReader.read().then(async (res: any) => {
  //     console.log(res.d.fen)
  //   })
  // })
  // .catch((console.error)
  // .then((data: { body: any }) => ndjsonStream(data.body))
  // .then((stream: any) => {
  //   console.log("Getting stream reader")
  //   const streamReader = stream.getReader()
  //   console.log("Reading...")
  //   streamReader
  //     .read()
  //     .then(async (res: any) => {
  //       console.log("Running stream")
  //       while (!res || !res.done) {
  //         res = await streamReader.read()
  //         console.log("result: ")
  //         if (res.value.t !== "fen") {
  //           // game reset
  //           const query = lobbyCollectionRef.where("status", "!=", "complete")
  //           // ref.orderBy().startAt(call to db, new Date() when ).endAt(never)
  //           query
  //             .get()
  //             .then(lobbySnapshot =>
  //               lobbySnapshot.forEach(doc =>
  //                 doc.ref.update({ status: "complete" })
  //               )
  //             )
  //         }
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.error(err)
  //     })
  // })
}

console.log("lobby clearing program starting")
callLichessLiveTv()
