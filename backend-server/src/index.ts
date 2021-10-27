import firebase from "firebase/compat"
import ndjson from "ndjson"

const hyperquest = require("hyperquest")
const admin = require("firebase-admin")

// const serviceAccount = require("../../../chesswager-bd3a6-firebase-adminsdk-tyh7t-4a018b8183.json")

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const lobbyCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

// const clearActiveBets = () => {
//   console.log("new game, clearing bets")
//   const query = lobbyCollectionRef.where("status", "!=", "complete")
//   query
//     .get()
//     .then(lobbySnapshot => {
//       lobbySnapshot.forEach(doc => {
//         doc.ref.update({ status: "complete" })
//       }) 
//     })
//     .then(() => {
//       console.log("bet clearing complete")
//     })
//     .catch(console.error)
// }

const callLichessLiveTv = () => {
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: any) => {
      if (obj.t === "featured") {
        // store current game id and move 

      } else {
        console.log("players moving")
      }
    })
    // .on("finish", callLichessLiveTv) // figure out a different way to do this. infinite recursion
}

console.log("lobby clearing program starting")
callLichessLiveTv()
