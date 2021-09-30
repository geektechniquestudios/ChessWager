import { https } from "firebase-functions"

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

import { initializeApp, firestore } from "firebase-admin"
initializeApp()
const db = firestore()

export const acceptBet = https.onCall(
  async ({ betId, uid, photoURL }, _response) => {
    //if user2id doesn't exist in bet,
    const lobbyRef = db.collection("lobby")
    const doc = lobbyRef.doc(betId)
    if (!(await (await doc.get()).get("user2Id")).exists) {
      //&& doc.get("user1Id") !== uid) {
      //@todo why isn't this working????
      await lobbyRef.doc(betId).update({
        status: "Pending",
        user2Id: uid,
        // user2Metamask: userMetamask, @todo
        user2PhotoURL: photoURL,
      })
    } else {
      return "someone else joined first!"
    }
    // return sorry, someone else joined first
  }
)

// exports.cancelBet = functions.https.onCall() //@todo

// exports.clearAllActiveBets = functions.https.onCall() // call at the end of each game
