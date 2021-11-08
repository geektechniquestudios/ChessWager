import firebase from "firebase/compat"
import { useMoralis } from "react-moralis"
import { Auth } from "../containers/Auth"
import { GameId } from "../containers/GameId"

const firestore = firebase.firestore()

// see '~/functions/src/index.tsx' for corresponding functions

interface Props {
  id: string
  status: string
  user1Id: string
  user2Id: string
}

const Buttons: React.FC<Props> = ({ id, status, user1Id, user2Id }) => {
  const { user, isAuthenticated } = useMoralis()

  const authContainer = Auth.useContainer()
  const { gameId } = GameId.useContainer()

  const accept = () => {
    const user2Metamask = user?.get("ethAddress")
    //add checks for authentication and metamask
    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: authContainer.auth.currentUser?.photoURL,
      hostUid: user1Id,
      user2Metamask: user2Metamask,
    }).catch(console.error) //@todo do this catch to all or none of the firebase methods
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

  const deleteCurrentBet = () => {
    const deleteBet = firebase.functions().httpsCallable("deleteBet")
    deleteBet({
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
    const userDocRef = userCollectionRef.doc(
      authContainer.auth.currentUser?.uid
    )

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
      {gameId}
      {/* accept button for user 2, */}
      {authContainer.user &&
        isAuthenticated &&
        authContainer.auth.currentUser &&
        user1Id !== authContainer.auth.currentUser.uid &&
        status === "ready" && (
          <button
            // disabled={
            //   status === "pending" || status === "in-progress" || !user
            // }
            onClick={accept}
            className="bet-button"
          >
            Accept Bet
          </button>
        )}

      {/* cancel button for user2, different cancel button for user1 */}
      {authContainer.user &&
        authContainer.auth.currentUser &&
        user2Id === authContainer.auth.currentUser.uid &&
        status === "pending" && (
          <button onClick={cancel} className="bet-button">
            Leave Bet
          </button>
        )}

      {/* delete bet visible only to user1*/}
      {authContainer.user &&
        authContainer.auth.currentUser &&
        user1Id === authContainer.auth.currentUser.uid &&
        status !== "approved" && (
          <button onClick={deleteCurrentBet} className="bet-button">
            Delete Bet
          </button>
        )}

      {/* approve button only visible to user1 after user2 joins*/}
      {authContainer.user &&
        authContainer.auth.currentUser &&
        user1Id === authContainer.auth.currentUser.uid &&
        status === "pending" && (
          <button onClick={approve} className="bet-button">
            Approve
          </button>
        )}

      {/* kick only visible to user1 */}
      {authContainer.user &&
        authContainer.auth.currentUser &&
        user1Id === authContainer.auth.currentUser.uid &&
        status === "pending" && (
          <button onClick={kick} className="bet-button">
            Kick
          </button>
        )}

      {/* block only visible to user1, maybe should go in profile?*/}
      {authContainer.user &&
        authContainer.auth.currentUser &&
        user1Id === authContainer.auth.currentUser.uid &&
        status === "pending" && (
          <button onClick={block} className="bet-button">
            block
          </button>
        )}
    </>
  )
}

export default Buttons
