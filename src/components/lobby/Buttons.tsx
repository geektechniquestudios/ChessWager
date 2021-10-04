import firebase from "firebase/compat"

const firestore = firebase.firestore()

// see '~/functions/src/index.tsx' for corresponding functions

interface Props {
  user: firebase.User | null | undefined
  id: string
  status: string
  user1Id: string
  user2Id: string
  auth: firebase.auth.Auth
}

const Buttons: React.FC<Props> = ({
  user,
  id,
  status,
  user1Id,
  user2Id,
  auth,
}) => {
  const accept = () => {
    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: auth.currentUser?.photoURL,
      hostUid: user1Id,
    }).then(res => {
      if (res.data !== "") {
        alert(res.data)
      }
    })
  }

  const cancel = () => {
    const cancelBet = firebase.functions().httpsCallable("cancelBet")
    cancelBet({
      betId: id,
    })
  }

  const approve = () => {
    const approveBet = firebase.functions().httpsCallable("approveBet")
    approveBet({
      betId: id,
    })
  }

  const complete = () => {
    const completeBet = firebase.functions().httpsCallable("completeBet")
    completeBet({
      betId: id,
    })
  }

  const kick = () => {
    const kickUser = firebase.functions().httpsCallable("kickUser")
    kickUser({
      betId: id,
    })
  }

  const block = () => {
    const userCollectionRef = firestore.collection("users")
    const userDocRef = userCollectionRef.doc(auth.currentUser?.uid)

    userDocRef.get().then(doc => {
      if (doc.data()) {
        if (!doc.data()?.blocked.includes(user2Id)) {
          userDocRef.update({
            blocked: [...doc.data()?.blocked, user2Id],
          })
        }
      } else {
        userDocRef.set({
          blocked: [user2Id],
        })
      }
    })
    kick()
  }

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id !== auth.currentUser.uid &&
        status === "ready" && (
          <button
            // disabled={
            //   status === "pending" || status === "in-progress" || !user
            // }
            onClick={accept}
          >
            {" "}
            Accept Bet{" "}
          </button>
        )}
      {/* cancel button for user2, different cancel button for user1 */}
      {user &&
        auth.currentUser &&
        user2Id === auth.currentUser.uid &&
        status === "pending" && <button onClick={cancel}> Leave Bet </button>}
      {/* delete bet visible only to user1*/}
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status !== "approved" && (
          <>
            <button onClick={complete}> Delete Bet</button>{" "}
          </>
        )}

      {/* approve button only visible to user1 after user2 joins*/}
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && <button onClick={approve}>Approve</button>}

      {/* kick only visible to user1 */}
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && <button onClick={kick}> Kick </button>}
      {/* block only visible to user1, maybe should go in profile?*/}
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && <button onClick={block}> block </button>}
    </>
  )
}

export default Buttons
