import React from "react"

import Card from "react-bootstrap/Card"

import "../../style/lobby.css"

const Bet = ({
  id,
  amount,
  betSide,
  multiplier,
  status,
  user1Id,
  user1Metamask,
  user2Id,
  user2Metamask,
  createdAt,
  gameId,
  auth,
}) => {
  const { uid, photoURL } = auth.currentUser

  const acceptBet = () => {
    //@todo popup modal with stats about bet,
    // when both people hit ready, popup metamask, timer 10s?
    //
    return <> {alert("This isn't built yet!")}</>
  }

  return (
    <div>
      <Card>
        <Card.Body className="bet">
          <button onClick={acceptBet}> Accept Bet </button>
          <span>{`${amount} eth`}</span>
          <span>{`${betSide}`}</span>
          <span>{`x${multiplier}`}</span>
          <span>{`pot size ${amount * multiplier}`}</span>
          <img src={photoURL} alt="" />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Bet
