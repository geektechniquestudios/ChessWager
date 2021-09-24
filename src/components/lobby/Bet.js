import React from "react"

import Card from "react-bootstrap/Card"
import "../../config"
import firebase from "firebase/compat/app"
import "../../style/lobby.css"
import "firebase/compat/functions"
import Modal from "react-modal"

const Bet = ({
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

  const acceptBet = () => {
    //@todo popup modal with stats about bet,
    // when both people hit ready, popup metamask, timer 10s?
    //
    // lobbyRef.doc(id).update({ status: "complete" })

    // call cloud function  with betid and user2id
    var acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
    }) //.then(res => {if (res != null) {alert(res.data)}}) // @todo

    // return <> {alert("Bet accepted")}</>
  }

  const isPending =
    auth.currentUser &&
    (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) &&
    status === "pending"

  return (
    <div>
      <Card>
        <Card.Body className={`${className} bet`}>
          <img src={user1PhotoURL} alt="" />
          <span>{status}</span>
          {user && user1Id !== auth.currentUser.uid && (
            <button
              disabled={status === "pending" || !user}
              onClick={acceptBet}
            >
              {" "}
              Accept Bet{" "}
            </button>
          )}
          <span>{`${amount} eth`}</span>
          <span>{`${betSide}`}</span>
          <span>{`x${multiplier}`}</span>
          <span>{`pot size ${potSize}`}</span>
          {user2PhotoURL && <img src={user2PhotoURL} alt="" />}
        </Card.Body>
      </Card>
      <Modal isOpen={isPending} ariaHideApp={false}>
        {/* leftoff@todo show conditions of bet and prompt metamask 
          accept and cancel buttons
          cancel would make bet go back to ready
        */}

        <div>content for the Modal</div>
      </Modal>
    </div>
  )
}

export default Bet
