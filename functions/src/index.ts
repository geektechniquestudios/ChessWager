import firebase from "firebase/compat/app"
const functions = require("firebase-functions")

const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()
const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")
const userRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("users")

interface AcceptArgs {
  betId: string
  uid: string
  photoURL: string
}

exports.acceptBet = functions.https.onCall(
  async ({ betId, photoURL }: AcceptArgs, context: any) => {
    //context.auth etc
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      )
    }

    //: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    const docRef = lobbyRef.doc(betId)

    await docRef.get().then((doc: any) => {
      // userRef.where(doc.user1Id, "", "")
      if (doc.data().user2Id == null || doc.data().user2Id === "") {
        // and user2 isn't on user1's block list
        docRef.update({
          status: "pending",
          user2Id: context.auth.uid,
          // user2Metamask: userMetamask, @todo
          user2PhotoURL: photoURL,
        })
      }
    })

    return
  }
)

interface CancelArgs {
  betId: string
}

exports.cancelBet = functions.https.onCall(
  async ({ betId }: CancelArgs, context: any) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      )
    }
    const docRef = lobbyRef.doc(betId)

    await docRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user2Id) {
        docRef.update({
          status: "ready",
          user2Id: "",
          user2Metamask: "",
          user2PhotoURL: "",
        })
      }
    })
    return
  }
)

interface ApproveArgs {
  betId: string
}

exports.approveBet = functions.https.onCall(
  async ({ betId }: ApproveArgs, context: any) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      )
    }
    const docRef = lobbyRef.doc(betId)

    await docRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        docRef.update({
          status: "approved",
        })
      }
    })
    return
  }
)

interface CompleteArgs {
  betId: string
}

exports.completeBet = functions.https.onCall(
  async ({ betId }: CompleteArgs, context: any) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      )
    }
    const docRef = lobbyRef.doc(betId)

    await docRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        docRef.update({
          status: "complete",
        })
      }
    })
    return
  }
)

exports.kickUser = functions.https.onCall(
  async ({ betId }: CompleteArgs, context: any) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      )
    }

    const docRef = lobbyRef.doc(betId)

    await docRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        docRef.update({
          status: "ready",
          user2Id: "",
          user2Metamask: "",
          user2PhotoURL: "",
        })
      }
    })
    return
  }
)

//@todo block user

exports.clearAllActiveBets = functions.https.onCall(async () => {
  const query = lobbyRef.where("status", "!=", "complete")
  query
    .get()
    .then(snapshot =>
      snapshot.forEach(doc => doc.ref.update({ status: "complete" }))
    )
}) // call at the end of each game
