import firebase from "firebase/compat/app"
const functions = require("firebase-functions")

const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()
const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  db.collection("lobby")
// const userRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
//   db.collection("users")

interface AcceptArgs {
  betId: string
  photoURL: string
  hostUid: string
}

const authCheck = (context: any) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    )
  }
}

exports.acceptBet = functions.https.onCall(
  async ({ betId, photoURL, hostUid }: AcceptArgs, context: any) => {
    authCheck(context)
    //: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    const betDocRef = lobbyRef.doc(betId)

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

// exports.acceptBet = functions.https.onCall(
//   async ({ betId, photoURL, hostUid }: AcceptArgs, { context }: any) => {
//     // authCheck(context)
//     // const userCollectionRef = db.collection("users")
//     // const userDocRef: firebase.firestore.DocumentReference =
//     //   userCollectionRef.doc(hostUid)

//     // let toReturn = false
//     // await userDocRef.get().then((doc: any) => {
//     //   if(doc.data().blocked.contains(context.auth.uid)){
//     //     toReturn = true
//     //   }
//     // })
//     // if (toReturn) {return "user is blocked"}
//     //: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =

//     const betDocRef = lobbyRef.doc(betId)

//     // betDocRef.get().then((doc: any) => {
//     //   // userRef.where(doc.user1Id, "", "")
//     //   if (doc.data()?.user2Id == null || doc.data()?.user2Id === "") {
//     //     // and user2 isn't on user1's block list
//     betDocRef.update({
//       status: "pending",
//       user2Id: context.auth.uid,
//       // user2Metamask: userMetamask, @todo
//       user2PhotoURL: photoURL,
//     })
//     // }
//     //})

//     //return "bet accepted"
//     return
//   }
// )

interface CancelArgs {
  betId: string
}

exports.cancelBet = functions.https.onCall(
  async ({ betId }: CancelArgs, context: any) => {
    authCheck(context)
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
    authCheck(context)
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
    authCheck(context)
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
    authCheck(context)

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
