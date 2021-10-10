// import "../src/config"
import firebase from "firebase/compat"
import ndjson from "ndjson"

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()

const lobbyCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

const clearActiveBets = () => {
  console.log("new game, clearing bets")
  const query = lobbyCollectionRef.where("status", "!=", "complete")
  query.get().then(lobbySnapshot => {
    lobbySnapshot.forEach(doc => {
      doc.ref.update({ status: "complete" })
    })
  })
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
}

console.log("lobby clearing program starting")
callLichessLiveTv() //@todo wrap in while(true) || make way to restart on stall
