import firebase from "firebase/compat/app"
const functions = require("firebase-functions")

const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()
const lobbyCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")

const authCheck = (context: any) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    )
  }
}

interface AcceptArgs {
  betId: string
  photoURL: string
  hostUid: string
}

exports.acceptBet = functions.https.onCall(
  async ({ betId, photoURL, hostUid }: AcceptArgs, context: any) => {
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)

    const userDocRef: firebase.firestore.DocumentReference = db
      .collection("users")
      .doc(hostUid)

    let toReturn = false
    await userDocRef.get().then((doc: any) => {
      const blocked: string[] = doc.data().blocked
      toReturn = blocked.includes(context.auth.uid)
    })
    if (toReturn) {
      return "You are blocked from joining this lobby"
    }

    await betDocRef.get().then((doc: any) => {
      if (doc.data().user2Id == null || doc.data().user2Id === "") {
        betDocRef.update({
          status: "pending",
          user2Id: context.auth.uid,
          // user2Metamask: userMetamask, @todo
          user2PhotoURL: photoURL,
        })
      }
    })

    return ""
  }
)

interface CancelArgs {
  betId: string
}

exports.cancelBet = functions.https.onCall(
  async ({ betId }: CancelArgs, context: any) => {
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)

    await betDocRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user2Id) {
        betDocRef.update({
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
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)

    await betDocRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        betDocRef.update({
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
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)

    await betDocRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        betDocRef.update({
          status: "complete",
        })
      }
    })
    return
  }
)

exports.kickUser = functions.https.onCall(
  async ({ betId }: CompleteArgs, context: any) => {
    authCheck(context)

    const betDocRef = lobbyCollectionRef.doc(betId)

    await betDocRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        betDocRef.update({
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

exports.clearAllActiveBets = functions.https.onCall(
  async (_: any, context: any) => {
    authCheck(context)
    const query = lobbyCollectionRef.where("status", "!=", "complete")
    query
      .get()
      .then(lobbySnapshot =>
        lobbySnapshot.forEach(doc => doc.ref.update({ status: "complete" }))
      )
  }
) // call at the end of each game
