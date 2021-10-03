import React from "react"

import Card from "react-bootstrap/Card"
import "../../config"
import firebase from "firebase/compat/app"
import "../../style/lobby.css"
import "firebase/compat/functions"
import Modal from "react-modal"
import { useDocument } from "react-firebase-hooks/firestore"

interface Props {
  user: firebase.User | null | undefined
  className: string
  lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  createdAt: Date
  gameId: string
  auth: firebase.auth.Auth
}

const Bet: React.FC<Props> = ({
  user,
  className,
  lobbyRef,
  id,
  amount,
  betSide,
  multiplier,
  status,
  user1Id,
  user1Metamask,
  user1PhotoURL,
  user2Id,
  user2Metamask,
  user2PhotoURL,
  createdAt,
  gameId,
  auth,
}) => {
  const potSize = amount + amount * multiplier

  const accept = () => {
    //@todo popup modal with stats about bet,
    // when both people hit ready, popup metamask, timer 10s?
    //
    if (auth.currentUser) {
      //lobbyRef.doc(id).update({ status: "in-progress" })

      // call cloud function  with betid and user2id
      const acceptBet = firebase.functions().httpsCallable("acceptBet")
      acceptBet({
        betId: id,
        photoURL: auth.currentUser.photoURL,
      })
      // .then(res => {
      //   alert(res.data)
      // })

      //.then(res => {
      //   alert(res.data)
      // }).catch(alert) //.then(res => {if (res != null) {alert(res.data)}}) // @todo

      // return <> {alert("Bet accepted")}</>
    }
  }

  const cancel = () => {
    if (auth.currentUser) {
      // @todo are these current user checks really neccessary??
      const cancelBet = firebase.functions().httpsCallable("cancelBet")
      cancelBet({
        betId: id,
      })
    }
  }

  const approve = () => {
    if (auth.currentUser) {
      const approveBet = firebase.functions().httpsCallable("approveBet")
      approveBet({
        betId: id,
      })
    }
  }

  const complete = () => {
    if (auth.currentUser) {
      const completeBet = firebase.functions().httpsCallable("completeBet")
      completeBet({
        betId: id,
      })
    }
  }

  const kick = () => {
    if (auth.currentUser) {
      const kickUser = firebase.functions().httpsCallable("kickUser")
      kickUser({
        betId: id,
      })
    }
  }

  const block = () => {
    if (auth.currentUser) {
      const blockUser = firebase.functions().httpsCallable("completeBet")
      blockUser({
        betId: id,
      })
    }
  }

  const isPending =
    auth.currentUser &&
    // (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) && // what was I thinking?
    status === "pending"

  return (
    <div>
      <Card>
        <Card.Body className={`${className} bet`}>
          <> {} </>
          <img src={user1PhotoURL} alt="" />
          <span>{status}</span>
          {/* accept button, only for user1 */}
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
            status === "pending" && (
              <button onClick={cancel}> Leave Bet </button>
            )}
          {/* delete bet visible only to user1*/}
          {user && auth.currentUser && user1Id === auth.currentUser.uid && status !== "approved" && (
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
            status === "pending" && <button> block </button>}
          {/* delete bet only visible to user 1 the entire time */}
          <span>{`${amount} eth`}</span>
          <span>{`${betSide}`}</span>
          <span>{`x${multiplier}`}</span>
          <span>{`pot size ${potSize}`}</span>
          {user2PhotoURL && <img src={user2PhotoURL} alt="" />}
        </Card.Body>
      </Card>
      <>
        {/* isOpen={isPending} ariaHideApp={false}> */}
        {/* leftoff@todo show conditions of bet and prompt metamask 
          accept and cancel buttons
          cancel would make bet go back to ready
        */}

        {/* <div>content for the Modal</div> */}
      </>
    </div>
  )
}

export default Bet
