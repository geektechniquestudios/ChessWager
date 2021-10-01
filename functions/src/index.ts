const functions = require("firebase-functions")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

//

interface args {
    betId: string
    uid: string
    photoURL: string
}

exports.acceptBet = functions.https.onCall(
  async ({ betId, uid, photoURL }: args, response: string) => {
    //if user2id doesn't exist in bet,
    const lobbyRef = db.collection("lobby")
    const doc = lobbyRef.doc(betId)
    // if (!(await (await doc.get()).get("user2Id")).exists) {
    // if (! doc.get()){

    // }
    //&& doc.get("user1Id") !== uid) {
    //@todo why isn't this working????
    await doc.update({
      status: "pending",
      user2Id: uid,
      // user2Metamask: userMetamask, @todo
      user2PhotoURL: photoURL,
    })
    // } else {
    //   return "someone else joined first!"
    // }
    // return sorry, someone else joined first
  }
)

// exports.cancelBet = functions.https.onCall() //@todo

// exports.clearAllActiveBets = functions.https.onCall() // call at the end of each game
