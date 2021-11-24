// import firebase from "firebase/compat/app"
const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()
const db = admin.firestore()
const lobbyCollectionRef = db.collection("lobby") //: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> = db.collection("lobby")

const authCheck = (context: any) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    )
  }
}

interface CreateArgs {
  amount: number
  betSide: string,
  gameId: string,
  multiplier: number,
  status: string,
  user1Id: string,
  user1Metamask: string,
  user1PhotoURL: string,
  contractAddress: string,
}

exports.createBet = functions.https.onCall(async ({amount, betSide, gameId, multiplier, status, user1Id, user1Metamask, user1PhotoURL, contractAddress}: CreateArgs, context: any): Promise<string> => {
  authCheck(context)
  
  // if user is not banned
  const bannedCollectionRef = db.collection("banned")
  const bannedUserDocRef = bannedCollectionRef.doc(context.auth.uid)
  if (bannedUserDocRef.get().exists) {
    return "user is banned"
  }

  lobbyCollectionRef.add({
    amount: amount,
    betSide: betSide,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    gameId: gameId,
    multiplier: multiplier,
    status: status,
    user1Id: user1Id,
    user1Metamask: user1Metamask,
    user1PhotoURL: user1PhotoURL,
    contractAddress: contractAddress,
  })

  return "success"
})

interface AcceptArgs {
  betId: string
  photoURL: string
  hostUid: string
  user2Metamask: string
}

exports.acceptBet = functions.https.onCall(
  async (
    { betId, photoURL, hostUid, user2Metamask }: AcceptArgs,
    context: any
  ): Promise<string> => {
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)

    const userDocRef = db.collection("users").doc(hostUid) 
    let isPlayerBlocked = false
    await userDocRef.get().then((doc: any) => {
      const blocked: string[] = doc.data().blocked
      isPlayerBlocked = blocked.includes(context.auth.uid)
    })
    if (isPlayerBlocked) {
      return "You are blocked from joining this lobby"
    }

    return await betDocRef.get().then((doc: any) => {
      if (
        doc.data().user2Id === null ||
        doc.data().user2Id === "" ||
        doc.data().user2Id === undefined
      ) {
        // if someone else hasn't already joined
        betDocRef.update({
          status: "pending",
          user2Id: context.auth.uid,
          user2Metamask: user2Metamask,
          user2PhotoURL: photoURL,
        })
        return "bet written"
      } else {
        return "bet already full"
      }
    })
  }
)

interface CancelArgs {
  betId: string
}

exports.cancelBet = functions.https.onCall(
  async ({ betId }: CancelArgs, context: any): Promise<void> => {
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
  async ({ betId }: ApproveArgs, context: any): Promise<void> => {
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)
    const userCollectionRef = db.collection("users")

    await betDocRef.get().then((doc: any) => {
      if (context.auth.uid === doc.data().user1Id) {
        betDocRef.update({
          status: "approved",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })

        const user1DocRef = userCollectionRef.doc(context.auth.uid)
        const user2DocRef = userCollectionRef.doc(doc.data().user2Id)
        user1DocRef.update({
          bets: admin.firestore.FieldValue.arrayUnion(doc.id),
        })
        user2DocRef.update({
          bets: admin.firestore.FieldValue.arrayUnion(doc.id),
        })
      }
    })

    return
  }
)

interface CompleteArgs {
  betId: string
}

exports.deleteBet = functions.https.onCall(
  async ({ betId }: CompleteArgs, context: any): Promise<void> => {
    authCheck(context)
    const betDocRef = lobbyCollectionRef.doc(betId)

    await betDocRef.get().then((doc: any) => {
      if (
        context.auth.uid === doc.data().user1Id &&
        doc.data().status !== "approved"
      ) {
        betDocRef.update({
          status: "deleted",
          gameId: "",
        })
      }
    })
    return
  }
)

exports.kickUser = functions.https.onCall(
  async ({ betId }: CompleteArgs, context: any): Promise<void> => {
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
